---

layout: post
category: docs
tags: [git, linux]
title: Using Git Hook Auto Update Site
description: "git hook update site"
disqus: y

---

#### Step.1 Initialized empty Git repository
{% highlight ruby %}
git clone --bare my_project my_project.git
{% endhighlight ruby %}

#### Step.2 edit the hooks post-update
{% highlight ruby %}
cd my_project.git/hooks/
mv post-update.sample post-update
vim post-update
{% endhighlight ruby %}

Add the following content to your post-update
{% highlight ruby %}
#!/bin/sh
# @author Howe Isamu <xi4oh4o@gmail.com>
# using git hook update website

# You Project Dev Branch
cd /home/www/htdocs/dev/you_project || exit
unset GIT_DIR
git reset --hard HEAD
git pull origin dev
git checkout dev

# You Project Master Branch
cd /home/www/htdocs/master/you_project || exit
unset GIT_DIR
git reset --hard HEAD
git pull origin master
git checkout master
{% endhighlight ruby %}

If you push code to the repositories, then the post-update will automatically update site directory.
> [Git on the Server - Getting Git on a Server](http://git-scm.com/book/en/Git-on-the-Server-Getting-Git-on-a-Server)

> [Customizing Git - Git Hooks](http://git-scm.com/book/en/Customizing-Git-Git-Hooks)
