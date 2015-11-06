---

layout: post
category: docs
tags: [skill]
title: "Operating System skills collections"
description:  "unix linux os x common skill"
disqus: y

---

* ### Use SSH port forwarding feature is enable a socks proxy
	
	Occult display and running in the background
	
	    $ ssh -nNTf -D 1080 user@host
	
* ### Let curl to use proxy download task

	In the ~/.curlrc add a below content
	
	    $ echo "socks5 = 127.0.0.1:1080" > ~/.curlrc

* ### SSH login without password
	
	    $ ssh-keygen -t rsa -C "your_email@example.com"

	    $ scp ~/.ssh/id_rsa.pub username@host:~/.ssh/authorized_keys
	
* ### Manually run OS X regular cleanup script

	    $ sudo periodic { daily | weekly | monthly }
	
* ### If you get less than app store update try using the command line

	    $ sudo softwareupdate -i -a
	
* ### The Best OS X package manager
	
	It will help you compile the latest version update [HP](http://mxcl.github.io/homebrew/index_zh-cn.html)
	  
        $ ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

* ### OS X Clear DNS Cache

	    $ sudo dscacheutil -flushcache	
	
	
* ### OS X Stop to Sleep

	    $ pmset noidle
	
* ### Supplementary still collecting ... welcome message
