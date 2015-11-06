---
layout: post
category: docs
tags: [ruby, long2ip, ip2long]
title: Ruby 实现 long2ip & ip2long 函数
description: "ruby语言版long2ip & ip2long"
disqus: y
---

{% highlight ruby %}
require 'ipaddr'
  
def ip2long(ip)
  net = IPAddr.new ip
  return net.to_i
end
  
def long2ip(long)
  net = IPAddr.new long, Socket::AF_INET
  return net.to_s
end
{% endhighlight %}
