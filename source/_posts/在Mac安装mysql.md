---
title: 在Mac安装mysql(mariadb)
tags: [mysql,mariadb]
categories:
  - 想要毕业
  - 数据库原理
description: 记录 安装、启动、初始化 mariadb
abbrlink: 6c6c7de0
date: 2021-04-22 12:20:42
cover:
katex:
---

## 安装

```shell
➜  ~ brew info mariadb
➜  ~ brew install mariadb
```

## 启动

### 跟随系统启动

```shell
➜  ~ mysql
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)
➜  ~ brew services start mariadb
==> Successfully started `mariadb` (label: homebrew.mxcl.mariadb)
➜  ~ mysql
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 3
Server version: 10.5.9-MariaDB Homebrew

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> exit
Bye
```

### 不跟随系统启动

```shell
➜  ~ mysql.server start
➜  ~ mysql.server stop
```

## 初始化

### 初始化数据库

```shell
➜  ~ mysql_install_db
mysql.user table already exists!
Run mysql_upgrade, not mysql_install_db
➜  ~ mysql_upgrade
Version check failed. Got the following error when calling the 'mysql' command line client
ERROR 1698 (28000): Access denied for user 'root'@'localhost'
FATAL ERROR: Upgrade failed
➜  ~ sudo mysql_upgrade
Password:
```

### 初始化root账号及相关设置

```shell
➜  ~ sudo mysql_secure_installation

NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MariaDB
      SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!

In order to log into MariaDB to secure it, we'll need the current
password for the root user. If you've just installed MariaDB, and
haven't set the root password yet, you should just press enter here.

Enter current password for root (enter for none):
OK, successfully used password, moving on...

Setting the root password or using the unix_socket ensures that nobody
can log into the MariaDB root user without the proper authorisation.

You already have your root account protected, so you can safely answer 'n'.

Switch to unix_socket authentication [Y/n] n
 ... skipping.

You already have your root account protected, so you can safely answer 'n'.

Change the root password? [Y/n] y
New password:
Re-enter new password:
Password updated successfully!
Reloading privilege tables..
 ... Success!


By default, a MariaDB installation has an anonymous user, allowing anyone
to log into MariaDB without having to have a user account created for
them.  This is intended only for testing, and to make the installation
go a bit smoother.  You should remove them before moving into a
production environment.

Remove anonymous users? [Y/n] y
 ... Success!

Normally, root should only be allowed to connect from 'localhost'.  This
ensures that someone cannot guess at the root password from the network.

Disallow root login remotely? [Y/n] y
 ... Success!

By default, MariaDB comes with a database named 'test' that anyone can
access.  This is also intended only for testing, and should be removed
before moving into a production environment.

Remove test database and access to it? [Y/n] y
 - Dropping test database...
 ... Success!
 - Removing privileges on test database...
 ... Success!

Reloading the privilege tables will ensure that all changes made so far
will take effect immediately.

Reload privilege tables now? [Y/n] y
 ... Success!

Cleaning up...

All done!  If you've completed all of the above steps, your MariaDB
installation should now be secure.

Thanks for using MariaDB!
```

### root密码登陆

```shell
➜  ~ mysql -u root -p
Enter password:
```

## 卸载

```shell
➜  ~ brew services stop mariadb
➜  ~ brew uninstall mariadb
```

