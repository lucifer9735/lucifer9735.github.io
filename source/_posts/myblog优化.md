---
title: myblog优化
date: 2021-04-17 10:22:34
tags: Hexo
categories:
description:
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

<img src="https://i.loli.net/2021/04/17/5dwzk3AVJHpTlhK.png" alt="创建ghpages分支" style="zoom:50%;" />

本地修改`myblog/_config.yml`文件中的部署分支：

```vim
deploy:
  type: git
  repo: git@github.com:lucifer9735/lucifer9735.github.io.git
  branch: ghpages
```

执行`hexo clean && hexo g && hexo d`即可把博客内容部署到`ghpages`分支。

## 修改GitHub Pages源分支

![修改到ghpages分支](https://i.loli.net/2021/04/17/SmlgOn7A2zYiQP8.png)

到这儿就完成了本地博客源文件的备份（不包含Hexo环境）。

⚠️注意 不要合并这两个分支！