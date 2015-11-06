---

layout: post
category: docs
tags: [linux,vagrant]
title: "Solve vagrant up need Bridged"
disqus: y

---

解决vagrant启动时需要选择bridged问题
`Available bridged network interfaces:`

{% highlight ruby %}
 vagrant up
-- 中略 --
[default] Available bridged network interfaces:
1) en1: Thunderbolt Ethernet
2) en0: Wi-Fi (AirPort)
What interface should the network bridge to? 1
[default] Preparing network interfaces based on configuration...
-- 後略 --
{% endhighlight ruby%}

编辑Vagrantfile文件，找到config.vm.network 修改如下

{% highlight ruby %}
config.vm.network :public_network, :bridge => "en1: Thunderbolt Ethernet"
{% endhighlight ruby%}

若需要分配一个静态IP则
{% highlight ruby %}
config.vm.network :public_network, ip: "10.0.3.233" , :bridge => "en1: Thunderbolt Ethernet"
{% endhighlight ruby%}
