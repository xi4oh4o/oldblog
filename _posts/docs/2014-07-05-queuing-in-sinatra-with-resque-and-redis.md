---
layout: post
category: docs
tags: [ruby, sinatra, resque, 队列, redis]
title: Queuing in Sinatra with Resque and Redis
description: "Sinatra with resque and redis - sinatra使用resque与redis队列"
disqus: y
---

> System requirements:    
> Ruby 1.9.3 or newer.    
> Redis

#### Step 1. 添加gem到Gemfile

{% highlight ruby %}
# A sample Gemfile
source "https://rubygems.org"

gem "sinatra"
gem "rake"
gem "redis"
gem "resque", "~> 2.0.0.pre.1", github: "resque/resque"
{% endhighlight %}

#### Step 2. 添加job.rb模块

{% highlight ruby %}
require 'resque'

sef Spider.runSpider(source, vid)
  # do something
end
 
module Job
  @queue = :default
  
  def self.perform(source, id)
    # 执行需要队列的方法
    Spider.runSpider(source, id)
    puts "Processed a #{id} from #{source}"
  end
end
{% endhighlight %}

#### Step 3. 添加执行sinatra应用parse.rb

{% highlight ruby %}
require 'rubygems'
require 'sinatra'
require 'resque'
require 'redis'
require './job'

# 为resque设置redis
Resque.redis = Redis.new

get '/' do
  @info = Resque.info
  erb :index
end

post '/' do
  # 赋值POST请求中的参数
  source = params[:source]
  vid = params[:vid]
  
  #将参数推入队列
  Resque.enqueue(Job, source, id)
  redirect '/done'
end
{% endhighlight %}

#### Step 5. 运行sinatra与执行resque队列

{% highlight bash %}
# 安装Gem并执行resque队列
bundle install
bundle exec resque work - q default -r ./job.rb

ruby parse.rb -o 0.0.0.0 -p 4567
{% endhighlight %}
