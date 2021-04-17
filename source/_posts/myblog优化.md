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

```shell
cd myblog
git init
git remote add origin git@github.com:lucifer9735/lucifer9735.github.io.git
git branch -m main
echo 'myblog' > README.md
git add .
git commit -m 'myblog source'
git push -u origin main
```

