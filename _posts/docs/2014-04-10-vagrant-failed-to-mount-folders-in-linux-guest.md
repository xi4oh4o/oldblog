---
layout: post
category: docs
tags: [vagrant]
title: 解决Vagrant failed to mount folders in guest
description: "vagrant failed to mount folders in linux guest"
disqus: y
---

在执行 ```vagrant up``` 时出现下面的错误

{% highlight bash %}
Failed to mount folders in Linux guest. This is usually beacuse
the "vboxsf" file system is not available. Please verify that
the guest additions are properly installed in the guest and
can work properly. The command attempted was:

mount -t vboxsf -o uid=`id -u vagrant`,gid=`getent group apache | cut -d: -f3`,dmode=777,fmode=777 /vagrant /vagrant
mount -t vboxsf -o uid=`id -u vagrant`,gid=`id -g apache`,dmode=777,fmode=777 /vagrant /vagrant
{% endhighlight %}

解决方法：

{% highlight bash %}
sudo /etc/init.d/vboxadd setup
# 中略 结果应全部ok
vagrant halt
vagrant up
{% endhighlight %}

中间如果有问题会提示你查看日志，可能会出现的问题有：没有安装kernel-devel，或者是没有安装编译环境等。
