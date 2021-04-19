---
title: GitPages+Hexo+Butterfly
tags: Hexo
categories: [指北,myblog]
description: 搭建个人博客 用于积累知识
abbrlink: 8b8f742
date: 2021-04-14 10:42:09
---

# Why

通过博客记录并巩固所学知识

# What

## [GitPages](https://pages.github.com/)

Websites for you and your projects.

Hosted directly from your [GitHub repository](https://github.com/). Just edit, push, and your changes are live.

## [Hexo](https://hexo.io/zh-cn/docs/)

Hexo 是一个快速、简洁且高效的博客框架，使用 [Markdown](http://daringfireball.net/projects/markdown/)解析文章，在几秒内即可利用靓丽的主题生成静态网页。

## [Butterfly](https://github.com/jerryc127/hexo-theme-butterfly)

hexo-theme-butterfly

# How

## 安装Hexo

安装 Hexo 相当简单，只需要先安装下列应用程序即可：

- [Git](http://git-scm.com/)
- [Node.js](http://nodejs.org/) 

具体请参考[Hexo安装前提](https://hexo.io/zh-cn/docs/)，对于不同的操作系统都有介绍。

需要注意的是，我们可以使用npm淘宝源来加速安装：

```shell
npm config set registry https://registry.npm.taobao.org
```

## 本地尝试Hexo

```shell
hexo init myblog
cd myblog
npm install
hexo generate
hexo server
```

浏览器访问[localhost:4000](http://localhost:4000)，可以发现本地博客基本框架已经搭建好了。

在命令行窗口使用`Ctrl+C`可以结束服务。

## 准备Github

首先，我们需要拥有一个[github](https://github.com/)账号，没有的话快去申请吧。当然国内也有类似的代码托管网站，后续可以自行尝试，本文不做相关介绍。

注册完成后登录，创建一个和你用户名相同的仓库，后面加.github.io，也就是xxx.github.io，其中xxx就是你的用户名。

为了方便后续更新博客内容，我们需要通过`ssh`连接github仓库，具体请参考[Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)。

我们可以通过以下命令来测试是否能正常连接：

```shell
ssh -T git@github.com
```

成功则会显示：（lucifer9735为我的用户名）

```
Hi lucifer9735! You've successfully authenticated, but GitHub does not provide shell access.
```

## 部署GitPages

我们需要先安装`hexo-deployer-git`便于我们后续部署：

```shell
npm install hexo-deployer-git --save
```

编辑`myblog/_config.yml`文件末尾，添加部署配置：

```vim
deploy:
  type: git
  repo: git@github.com:xxx/xxx.github.io.git
  branch: master
```

其中xxx是你的用户名。

使用以下命令即可部署：

```shell
hexo clean
hexo generate
hexo deploy
```

可简写为：

```shell
hexo clean && hexo g && hexo d
```

甚至可以利用`alias`:

```vim
# hexo
alias hh="hexo clean && hexo g && hexo d"
alias hs="hexo clean && hexo g && hexo s"
```

部署完成后，访问`xxx.github.io`即可查看属于你的blog。

## 更换主题Butterfly

[Butterfly 安裝文檔(一) 快速開始](https://butterfly.js.org/posts/21cfbf15/)

Butterfly的官方文档系列，非常完备，看就完事了，按需配置。

# What's more

```shell
hexo new myblog个性化
```

