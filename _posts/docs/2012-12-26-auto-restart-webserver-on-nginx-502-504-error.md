---

layout: post
title: "监控网站遇到页面错误自动重启相关服务"
description: "web server 502 &amp; 504 error and mysql down auto restart shell script"
category: "docs"
tags: [linux, SA]
disqus: y

---

自动监控Nginx 502 Bad Gateway and 504 Gateway Time-out Error错误，以及监控页面数据获取失败重启MySQL

    
{% highlight bash %}
#!/bin/bash
MY_URL="http://moefou.org"
RESULT_502=`curl -I $MY_URL|grep "HTTP/1.1 502"`
RESULT_504=`curl -I $MY_URL|grep "HTTP/1.1 504"`
RESULT_MYSQL=`curl $MY_URL|grep "今日更新 0"`
if [ -n "$RESULT_502" ]; then
killall php-fpm;php-fpm
date>>/data/logs/web_error.log;echo "502 Bad Gateway">>/data/logs/web_error.log
elif [ -n "$RESULT_504" ]; then
killall php-fpm;php-fpm
date>>/data/logs/web_error.log;echo "504 Gateway Time-out">>/data/logs/web_error.log
elif [ -n "$RESULT_MYSQL" ]; then
#service mysql restart
killall mysqld;killall mysqld_safe;/etc/init.d/mysql start
killall php-fpm;php-fpm
date>>/data/logs/web_error.log;echo "Null MySQL Down">>/data/logs/web_error.log
fi
{% endhighlight %}
run 
{% highlight ruby %}
crontab -e
{% endhighlight %}
add a below content

`* * * * * root /data/task/auto_restart_webserver.sh >/dev/null 2>&1`
    
Gits Links: [auto_restart_webserver.sh](https://gist.github.com/4378447)
