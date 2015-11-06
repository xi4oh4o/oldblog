---

layout: post
category: docs
tags: [linux]
title: "How to Backup Your DB &amp; Site into Dropbox"
description:  "linux dropbox backup site"
disqus: y

---

#### Step.1 Install Dropbox via command line

The Dropbox daemon works fine on all 32-bit and 64-bit Linux servers. To install, run the following command in your Linux terminal.

32-bit:

{% highlight ruby %}
cd ~ && wget -O - "https://www.dropbox.com/download?plat=lnx.x86" | tar xzf -
{% endhighlight ruby %}

64-bit:
{% highlight ruby %}
cd ~ && wget -O - "https://www.dropbox.com/download?plat=lnx.x86_64" | tar xzf -
{% endhighlight ruby %}

Next, run the Dropbox daemon from the newly created .dropbox-dist folder.

{% highlight ruby %}
~/.dropbox-dist/dropboxd
{% endhighlight ruby %}
If you're running Dropbox on your server for the first time, you'll be asked to copy and paste a link in a working browser to create a new account or add your server to an existing account. Once you do, your Dropbox folder will be created in your home directory. Download this [CLI script](https://www.dropbox.com/download?dl=packages/dropbox.py) to control Dropbox from the command line. For easy access, put a symlink to the script anywhere in your PATH.

#### Step.2 Install Dropbox CLI Script

{% highlight ruby %}
wget https://www.dropbox.com/download?dl=packages/dropbox.py
chmod +x dropbox.py && mv dropbox.py /usr/local/bin/dp
dp help
{% endhighlight ruby %}

#### Step.3 Using Backup script

{% highlight ruby %}
#!/bin/bash
# rm backup & backup database
cd /root/Dropbox/db/
rm -rf your_database.gz
rm -rf hash.txt
sleep 1
mysqldump --database YourDBName -uYourUsername -pYourPassword | gzip > your_database.gz
sleep 1
md5sum your_database.gz > hash.txt
date >> hash.txt
sleep 3
# rm backup & backup site
cd /root/Dropbox/web/
rm -rf your_site.gz
rm -rf hash.txt
sleep 1
tar czf your_site.gz /home/your/your_site/
sleep 1
md5sum your_site.gz > hash.txt
date >> hash.txt
dp start
{% endhighlight ruby %}

#### Step.4 Set Cron

{% highlight ruby %}
crontab -e
{% endhighlight ruby %}

Add the following content in
> 0 22 * * 0 root /data/task/backup.sh

> 0 23 * * 0 root dp stop

Backup every Sunday 22:00-23:00
