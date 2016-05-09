---
layout: post
category: docs
tags: [express4, coffeescript, flash messages, middleware, express, node, npm]
title: CoffeeScript Express4 Flash Messages
description: "coffeescript express4 flash messages middleware"
disqus: y
---
安装依赖中间件
{% highlight shell %}
  npm install express-session --save
  npm install connect-flash --save
  npm install express-messages --save
{% endhighlight %}

Setting Options
{% highlight coffeescript %}
# Omit...
session = require 'express-session'
flash = require 'connect-flash'

app = express()

app.use cookieParser('keyboard cat')
app.use session({
  cookie: maxAge: 60000
  resave: true
  saveUninitialized: true
  secret: 'your secret'
})
app.use flash()

app.use (req, res, next) ->
  res.locals.messages = require('express-messages')(req, res);
  next();
{% endhighlight %}

Usage
{% highlight coffeescript %}
# 在路由中使用
req.flash("success", "Email queued");
req.flash("error", "Email queued fail");
req.flash("warning", "Warning..");
# etc...
res.redirect('back')

# 在模板中呈现消息
!= messages()
{% endhighlight %}
Which will output the HTML:
{% highlight html %}
<div id="messages">
  <ul class="info">
    <li>Email queued</li>
    <li>Email sent</li>
  </ul>
  <ul class="error">
    <li>Email delivery failed</li>
  </ul>
</div>
{% endhighlight %}

> 自定义模板参考 [Using a custom template](https://github.com/expressjs/express-messages#using-a-custom-template)
