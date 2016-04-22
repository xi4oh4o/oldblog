---
layout: post
category: docs
tags: [filebeat, multiline, logstash, logs, prospectors]
title: Filebeat & Logstash 多行日志匹配采集
description: "filebeat multiline logstash logs prospectors 多行日志"
disqus: y
---

Filebeat 包括日志采集，简单处理，并输出到：File、Logstash、 Elasticsearch 等功能。

> 安装请参考 [Step 1: Installing Filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html)

Filebeat Match Yii2 Runtime/logs/app.log (filebeat.yml)

{% highlight yml %}
filebeat:
  prospectors:
    -
      paths:
        - /logs/app.log

      input_type: log

      multiline:
        pattern: "^[[:digit:]]{4}-[[:digit:]]{2}-[[:digit:]]{2}"
        negate: true
        match: after

  registry_file: /var/lib/filebeat/registry

output:

  elasticsearch:
    hosts: ["es-host:9200"]

    template:
      path: "filebeat.template.json"

  logstash:
    hosts: ["ls-host:5001"]
    worker: 1

shipper:

logging:
  files:
    rotateeverybytes: 10485760 # = 10MB
{% endhighlight %}

Logstash input filter output (yii_runtime_log.conf)

{% highlight conf %}
input {
  beats{
    port => 5001 # 从 filebeat 输入
    tags => ["yii_runtime_log"] # 分配一个tags
  }
}

filter {
 if "yii_runtime_log" in [tags] { # 根据标签适配不同匹配规则
    grok {
      match => {
        'message' => "^%{TIMESTAMP_ISO8601:datetime}\s+\[%{IP:client_ip}\]\[%{NOTSPACE:session_id}\]\[%{NOTSPACE:user_id}\]\[%{LOGLEVEL:log_level}\]\[%{WORD:category}\]?"
      }
    }
  }
  if "ngx_log" in [tags] {
     grok {
       match => {
         'message' => "NGINX Patterns"
       }
     }
   }
}

output {
  if "yii_runtime_log" in [tags] { # 根据 tags 输出值
    elasticsearch {
      hosts=>["es-host:9200"]
      index=>"l1web_runtime_log-%{+YYYY.MM.dd}"
      document_type => "%{[@metadata][type]}"
    }
  }
}
{% endhighlight %}
