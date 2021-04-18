---
title: myblog优化
tags: Hexo
categories: 指北
description: 优化记录 仅供参考 避免踩坑 随缘更新
abbrlink: 61bd27c9
date: 2021-04-17 10:22:34
cover:
katex:
---

# Github分支管理

曾经练习过git的相关命令，而今忘的差不多了。

简单粗暴：把之前的`lucifer9735.github.io`仓库删除重建。

## master

```shell
cd myblog
git init
git remote add origin git@github.com:lucifer9735/lucifer9735.github.io.git
echo 'myblog' > README.md
git add .
git commit -m 'myblog source'
git push -u origin master
```

## ghpages

通过github页面在当前仓库创建`ghpages`分支：

<img src="https://foopic-1251833308.cos.ap-shanghai.myqcloud.com/5dwzk3AVJHpTlhK-20210418171446369.png" alt="创建ghpages分支" style="zoom:50%;" />

本地修改`myblog/_config.yml`文件中的部署分支：

```yml
deploy:
  type: git
  repo: git@github.com:lucifer9735/lucifer9735.github.io.git
  branch: ghpages
```

执行`hexo clean && hexo g && hexo d`即可把博客内容部署到`ghpages`分支。

## 修改GitHub Pages源分支

![修改到ghpages分支](https://foopic-1251833308.cos.ap-shanghai.myqcloud.com/SmlgOn7A2zYiQP8-20210418171453041.png)

到这儿就完成了本地博客源文件的备份（不包含Hexo环境）。

⚠️注意 不要合并这两个分支！

## 日常更新文章

```shell
cd myblog
hexo clean && hexo g && hexo d
git add .
git commit -m 'new post'
git push
```

# Github Actions

之前的博客使用`travis-CI`更新，而今Github推出了`Actions`功能，尝试一下。

## 生成公私钥

```shell
ssh-keygen -t ed25519 -f hexoci -C "lucifer9735@gmail.com" -N ""
```

仅供该仓库使用，配置成功后甚至在本地删除。

## 上传公私钥

公钥：

![公钥上传](https://foopic-1251833308.cos.ap-shanghai.myqcloud.com/r4PQC8XfAFj7ESN-20210418171501888.png)

私钥：

![私钥上传](https://foopic-1251833308.cos.ap-shanghai.myqcloud.com/tR6OEcIqwX4HSCh-20210418171507272.png)

## 创建Actions配置文件

`myblog/.github/workflows/HexoCI.yml`:

```yml
name: HexoCI

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '14'
    - uses: actions/cache@v2
      with:
        path: node_modules
        key: ${{ runner.OS }}-npm-cache
        restore-keys: |
          ${{ runner.OS }}-npm-cache

    - name: Setup Hexo
      env:
        HEXO_DEPLOY_PRIVATE_KEY: ${{ secrets.HEXOCI }}
      run: |
        mkdir -p ~/.ssh/
        echo "$HEXO_DEPLOY_PRIVATE_KEY" > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        ssh-keyscan github.com >> ~/.ssh/known_hosts
        git config --global user.name "lucifer9735"
        git config --global user.email "lucifer9735@gmail.com"
        npm install hexo-cli -g
        npm install

    - name: Hexo deploy
      run: |
        hexo clean
        hexo generate
        hexo deploy
```

## What's more

```vim
alias hh="git add . && git commit -m 'update' && git push"
```

```shell
source ~/.zshrc
hh
```

# 永久链接

使用插件[hexo-abbrlink](https://github.com/rozbo/hexo-abbrlink)生成永久链接。

在`Hexo`根目录安装该插件：

```
npm install hexo-abbrlink --save
```

修改`myblog/_config.yml`配置：

```vim
# URL
## Set your site url here. For example, if you use GitHub Page, set url as 'https://username.github.io/project'
url: https://foopi.top
permalink: posts/:abbrlink/
permalink_defaults:
pretty_urls:
  trailing_index: true # Set to false to remove trailing 'index.html' from permalinks
  trailing_html: true # Set to false to remove trailing '.html' from permalinks

# abbrlink config
abbrlink:
  alg: crc32      #support crc16(default) and crc32
  rep: hex        #support dec(default) and hex
  drafts: false   #(true)Process draft,(false)Do not process draft. false(default)
  # Generate categories from directory-tree
  # depth: the max_depth of directory-tree you want to generate, should > 0
  auto_category:
     enable: true  #true(default)
     depth:        #3(default)
     over_write: false
  auto_title: false #enable auto title, it can auto fill the title by path
  auto_date: false #enable auto date, it can auto fill the date by time today
  force: false #enable force mode,in this mode, the plugin will ignore the cache, and calc the abbrlink for every post even it already had abbrlink.
```

# Gulp压缩

[参考Butterfly主题的文档](https://butterfly.js.org/posts/4073eda/#Gulp%E5%A3%93%E7%B8%AE)。

# SEO

> SEO（Search Engine Optimization）：汉译为搜索引擎优化。是一种方式：利用搜索引擎的规则提高网站在有关搜索引擎内的**自然排名**。目的是让其在行业内占据领先地位，获得品牌收益。很大程度上是网站经营者的一种商业行为，将自己或自己公司的排名前移。

## nofollow

使用插件[hexo-filter-nofollow](https://github.com/hexojs/hexo-filter-nofollow)优化外链，有效加强网站SEO，防止权重流失。

```shell
npm install hexo-filter-nofollow --save
```

```vim
nofollow:
  enable: true
  field: site
  exclude:
    - 'exclude1.com'
    - 'exclude2.com'
```



