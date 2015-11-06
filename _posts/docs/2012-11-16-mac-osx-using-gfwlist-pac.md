---

layout: post
title: "Mac OS X Using gfwlist pac"
description: "mac,osx,gfwlist,autopac,Mac自动代理配置,mac auto proxy"
category: "docs"
tags: [osx]
disqus : y

---

### How to configure gfwlist automatic proxy on OS X

#### Recommended GITHUB project [GenPAC](https://github.com/JinnLynn/GenPAC)
An automatically generated pac file based gfwlist Python script

> $ git clone git://github.com/JinnLynn/GenPAC.git

And configured config.txt file, and then `$ ./genpac.py`

Since OS X Lion and after system uses sandbox mechanism, automatic agent no longer supports local PAC file, so you need to set up a local http, or the pac file placed in an accessible page.


Recommended SAE, or gitcafe pages, such as `http://autopac.sinaapp.com/auto.pac` speed is very satisfactory, and then in System Preferences -> Network -> your network connection -> Advanced, click ** Agent ** tab, and find **  automatic proxy configuration ** add your pac file URL to URL: 

Tips: You still need a local socks5 proxy，using ssh -nNTf -D，or shadowsockets.

# 中文

### 如何在OS X下使用GFWLIST配置自动代理

#### 推荐Github项目 [GenPAC](https://github.com/JinnLynn/GenPAC)
一个基于gfwlist自动生成pac文件的Python脚本

> $ git clone git://github.com/JinnLynn/GenPAC.git

编辑config.txt文件，之后`./genpac.py`即可。

由于Lion与之后的OS X系统使用了沙箱机制，自动代理不再支持本地PAC文件，所以你需要在本地建立http，或者将pac文件放置在一个可访问的页面上。


推荐SAE，或者gitcafe pages，例如`http://autopac.sinaapp.com/auto.pac` 速度很理想，接着在 系统偏好设置->网络->你的网络连接->高级 中点选**代理**选项卡，并找到 **自动代理配置** 将在线pac文件的URL放置其中保存即可。

Tips: 你仍需要一个本地的socks5代理，使用ssh -nNTf -D，或者shadowsockets。
