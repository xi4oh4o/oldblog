---
layout: post
category: docs
tags: [android, aria2c, sshdroid yaaw]
title: 在Android上配置 aria2c 及 bt下载服务
description: "android 配置 aria2c bt下载 yaaw 离线下载"
disqus: y
---


前些日子一直想撸个 Raspberry Pi 好丢在家里利用下白天闲置的带宽，顺带满足下自己的折腾癖。结果想起家中还有个闲置的初代小米手机，于是有了下文。

> 主要通过aria2c + yaaw + tTorrent + SSHDroid 在 Android设备 部署一个简单的下载服务 需要 ROOT 权限


### 配置花生壳服务
首先去注册一个花生壳账户并申请一个免费域名 [http://www.oray.com](http://www.oray.com)

设备上下载 [peanuthull-android.apk.zip](http://pan.baidu.com/s/1eQGTbaE)

````
域名填写： ddns.oray.com/ph/update
主机名填写你申请到的域名，如 xx.gicp.net
用户名、密码
本地连接：不勾选。
````
**你需要你有一个公网IP，并且在路由器上给你的设备内网IP做DMZ映射。**

### 安装 FTPDroid

下载 [Google Play](https://play.google.com/store/apps/details?id=berserker.android.apps.ftpdroid)

配置下登陆信息即可。通过ftp方式访问

### 安装 SSDRoid
下载 [Google Play](https://play.google.com/store/apps/details?id=berserker.android.apps.sshdroid)

基本只需要设置个密码即可。 在配置好花生壳服务之后你可以通过

````ssh root@xxx.gicp.net```` 登陆你的设备。

### 配置 Aria2 for android
下载 [http://aria2.sourceforge.net](http://aria2.sourceforge.net/)

点击页面下载后找到 android build 版本并下载，解压后得到 aria2c 二进制文件。将其传入设备上 /system/bin/ 这个文件夹下。(可通过之前的ftp方式)

### 启用 aria2c 进程
使用 ssh 登陆设备后，在你想要存储下载文件的文件夹中执行

```bash
nohup aria2c --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all --rpc-secret=<yousecretcode> &
```

### 配置 Yaaw
下载 [Yaaw](http://binux.github.io/yaaw/)

之后你可以在 yaaw 中 设置 JSON-RPC PATH ````http://token:yousecretcode@xxx.gicp.net:6800/jsonrpc```` 连接你的aria2c

### tTorrent
[Google Play](https://play.google.com/store/apps/details?id=hu.tagsoft.ttorrent.pro&hl=en)

这款Android bt下载软件内置了web ui 开启后通过
````http://xxx.gicp.net:1080```` 访问即可添加种子或磁力连接

