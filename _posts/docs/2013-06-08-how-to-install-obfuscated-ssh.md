---

layout: post
category: docs
tags: [linux]
title: "How To Install Obfuscated SSH"
description:  "linux sshd obfuscated ssh"
disqus: y

---

### Solve GFW problems caused by network instability.

Setp.1 wget & Make Install
{% highlight ruby %}
wget -O ofcssh.tar.gz https://github.com/brl/obfuscated-openssh/tarball/master

tar zxvf ofcssh.tar.gz

cd brl-obfuscated-openssh-ca93a2c

./configure

make

make install
{% endhighlight %}

Setp.2 Configuration
{% highlight ruby %}
cp /usr/local/sbin/sshd /usr/sbin/sshd_ofc

cp /etc/ssh/sshd_config /etc/ssh/sshd_ofc_config
  
sed -i "s/Port /#Port /g" /etc/ssh/sshd_ofc_config

sed -i "s/UsePAM /#UsePAM /g" /etc/ssh/sshd_ofc_config

#Replace the 2222 to your want port number
echo "ObfuscatedPort 2222" >> /etc/ssh/sshd_ofc_config

#Replace the "YourKey" to your desired Obfuscate Keyword
echo "ObfuscateKeyword YourKey" >> /etc/ssh/sshd_ofc_config
{% endhighlight %}

Step.3 Run
{% highlight ruby %}
/usr/sbin/sshd_ofc -f /etc/ssh/sshd_ofc_config
{% endhighlight %}

#### Client Software

OS X ver. [Sercet Socks Extend](https://github.com/cdredfox/Secret-Socks-Extend)

Windows ver. [potty](http://www.mrhinkydink.com/potty.htm)

###### Source: [通过Obfuscated ssh避免时不时ssh连接不畅的问题 ](http://mosir.org/html/y2012/give-us-a-stable-ssh-connect-by-obfuscated-ssh.html)
