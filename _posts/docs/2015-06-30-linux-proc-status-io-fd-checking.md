---
layout: post
category: docs
tags: [php, proc, linux, cpu]
title: 针对进程资源占用异常简单排查技巧
description: "php资源占用过高 cpu过高 检查 优化"
disqus: y
---

PHP进程CPU莫名占用过高 分享一个简单的排查过程。

首先使用`top`命令查看持续占用CPU最高的进程，并复制PID，之后去proc下查看这个进程的状态是否有异常值

{% highlight bash %}
$ cat /proc/$PID/status` # 查看状态

单位均为kB 求GB可 VmRSS / 1024 / 1024 = GB单位
VmRSS 代表实际物理内存占用
VmHWM 代表实际物理内存占用峰值
VmSwap 代表实际Swap占用
{% endhighlight %}

{% highlight bash %}
$ cat /proc/$PID/io 查看IO占用

read_bytes 代表实际读取硬盘字节总数
write_bytes 代表实际写入到磁盘字节总数
{% endhighlight %}

{% highlight bash %}
$ ll /proc/$PID/fd` 查看进程实际操作文件
{% endhighlight %}

最终发现由于log写入过多Notice level导致IO暴增CPU增高。
