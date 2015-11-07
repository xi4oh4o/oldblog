---
layout: post
category: docs
tags: [php5, imap, php5-imap]
title: PHP5 解决编译IMAP扩展问题
description: "php56 imap 编译扩展"
disqus: y
---

安装imap-2007f

{% highlight bash %}
yum insall pam-devel

# Ubuntu 继续往下看

wget ftp://ftp.cac.washington.edu/imap/imap-2007f.tar.gz
tar -zxf imap-2007f.tar.gz
cd imap-2007f

make lr5 PASSWDTYPE=std SSLTYPE=unix.nopwd EXTRACFLAGS=-fPIC IP=4

rm -rf /usr/local/imap-2007f/
mkdir /usr/local/imap-2007f/
mkdir /usr/local/imap-2007f/include/
mkdir /usr/local/imap-2007f/lib/
cp c-client/*.h /usr/local/imap-2007f/include/
cp c-client/*.c /usr/local/imap-2007f/lib/
cp c-client/c-client.a /usr/local/imap-2007f/lib/libc-client.a
{% endhighlight %}

PHP 编译加参数

{% highlight bash %}
--with-imap=/usr/local/imap-2007f
--with-imap-ssl
{% endhighlight %}
