---
layout: post
category: docs
tags: [php, array_map, ruby, map, collect]
title: 集合(数组)中 collect(map) 方法使用实例
description: "array_map map ruby collect"
disqus: y
---


使用 "map" 方法将callback作用于指定数组所有单元

需求：将ips中所有long2ip格式转换为可阅读格式

Ruby Ver.

{% highlight ruby %}
require 'ipaddr'
ip_info_list = {
  'name' => 'cn2',
  'ISP' => 'chinanet',
  'ips' => [
    {'start' => 134744072, 'end' => 134743044},
    {'start' => 3741648133, 'end' => 3741713926},
  ]
}

def long2ip(long)
  net = IPAddr.new long, Socket::AF_INET
  return net.to_s
end

ip_info_list['ips'].collect do |ip_list|
  ip_list['start'] = long2ip(ip_list['start'])
  ip_list['end'] = long2ip(ip_list['end'])
end

# output:

{"name"=>"cn2", "ISP"=>"chinanet", "ips"=>[{"start"=>"8.8.8.8", "end"=>"8.8.4.4"}, {"start"=>"223.5.5.5", "end"=>"223.6.6.6"}]}
{% endhighlight %}

PHP Ver.

{% highlight php %}
array array_map ( callable $callback , array $arr1 [, array $... ] )
{% endhighlight %}

{% highlight php %}

$ip_info_list = [
    'name' => 'cn2',
    'ISP' => 'chinanet',
    'ips' = [
        ['start' => '134744072', 'end' => '134743044'],
        ['start' => '3741648133', 'end' => '3741713926'],

    ]
];

$ip_info_list['ips'] = array_map('convert_long2ip', $ip_info_list['ips']);

function convert_long2ip($ip_list) {
    $ip_list['start'] = long2ip($ip_list['start']);
    $ip_list['end'] = long2ip($ip_list['end']);
    return $ip_list;
}
{% endhighlight %}
