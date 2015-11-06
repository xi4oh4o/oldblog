---
layout: post
category: docs
tags: [elasticsearch, ik, river jdbc]
title: elasticsearch 配置 ik 分词与 jdbc 数据源
description: "elasticsearch 配置 jdbc 数据源 与 ik 分词"
disqus: y
---

### 安装

下载 binary
[http://www.elasticsearch.org/overview/elkdownloads/](http://www.elasticsearch.org/overview/elkdownloads/)

或使用 [repositories](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/setup-repositories.html) 安装

### JDBC
***请注意*** jdbc plugin 版本需要和 elasticsearch 版本一致

参考 [https://github.com/jprante/elasticsearch-river-jdbc#recent-versions](https://github.com/jprante/elasticsearch-river-jdbc#recent-versions)

目前 elasticsearch 版本为1.4.x 那么 river-jdbc 也应对应使用1.4.x

安装 MySQL JDBC driver
参考 [第4步](https://github.com/jprante/elasticsearch-river-jdbc#step-by-step-guide-to-get-a-river-running)

安装 JDBC river

{% highlight bash %}
cd $ES_HOME

./bin/plugin --install jdbc --url http://xbib.org/repository/org/xbib/elasticsearch/plugin/elasticsearch-river-jdbc/1.4.0.8/elasticsearch-river-jdbc-1.4.0.8-plugin.zip
{% endhighlight %}

创建一个 JDBC river 注意加入 id as _vid 避免重复索引问题

{% highlight shell %}
curl -XPUT 'localhost:9200/_river/my_jdbc_river/_meta' -d '{
    "type" : "jdbc",
    "jdbc" : {
        "url" : "jdbc:mysql://localhost:3306/dbs",
        "user" : "root",
        "password" : "",
        "sql" : "select *, id as _id from table_name",
        "index" : "your_index_name",
        "type" : "your_type_name"
    }
}'
{% endhighlight %}

测试一下结果

{% highlight shell %}
curl -XGET 'localhost:9200/your_index_name/_search?pretty&q=*'
{% endhighlight %}

### 安装 ik analyzer
请注意 ik 也需要与 elasticsearch 对应正确的版本，官网有参照列表
[https://github.com/medcl/elasticsearch-analysis-ik](https://github.com/medcl/elasticsearch-analysis-ik)

目前 master 分支对应 elasticsearch 1.4.x 版本

安装有两种办法 源码打包，和直接下载 elasticsearch-rtf 中已打包的版本

#### *注意* 如果你使用最新版的 elasticsearch 应 clone 源码用并用 mvn package 命令打包，下载 elasticsearch-rtf 中的版本只对应 elasticsearch 1.0.x，会导致无法工作。

{% highlight shell %}
git clone https://github.com/medcl/elasticsearch-analysis-ik.git

cd elasticsearch-analysis-ik

mvn package

cd target/releases/
# cp 其中的 zip 到 $ELASTIC_HOME/plugin/analysis-ik/ 目录解压
{% endhighlight %}

mvn 需要额外安装，centos 方法[参考](http://www.unixmen.com/install-apache-ant-maven-tomcat-centos-76-5/)

ubuntu 使用 ````sudo aptitude install maven````

编辑 elasticsearch.xml 将

{% highlight xml %}
index.analysis.analyzer.ik.type : 'ik' # 添加 ik analyzer 分词器
index.analysis.analyzer.default.type : 'ik' # 将 ik analyzer 设为默认分词器
{% endhighlight %}

添加至末尾重启 elasticsearch 即可。

#### 如何测试

请参考 Here is a quick example 部分 [https://github.com/medcl/elasticsearch-analysis-ik](https://github.com/medcl/elasticsearch-analysis-ik)
