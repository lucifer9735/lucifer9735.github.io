---
title: myblog个性化
tags: [myblog,Hexo]
categories: [指北,myblog]
description: Butterfly很好看 但配置之前一般
abbrlink: 9f1c407f
date: 2021-04-14 19:57:27
---

# 配置文件

为了减少Butterfly主题升级带来的不便：

```shell
cp myblog/themes/butterfly/_config.yml myblog/_config.butterfly.yml
```

以后只需要在`_config.butterfly.yml`中进行主题配置即可。

而博客的基础配置文件还是根目录下的`_config.yml`。

# blog基础配置

在原有配置基础上按需修改`myblog/_config.yml`：

```vim
# Site
title: Time of Pi
subtitle: ''
description: ''
keywords:
author: Foo
language: zh-CN
timezone: Asia/Shanghai

# URL
url: https://lucifer9735.github.io
```

# Front-matter

Front-matter 是文档最上方以 --- 分隔的区域，用于设置文档相关参数。

我们可以通过修改`myblog/scaffolds`内`post.md`、`page.md`等模版，提升我们`new`新文档编辑时的体验。

比如我的`post.md`文件：

```markdown
---
title: {{ title }}
date: {{ date }}
tags:
categories:
description:
cover:
katex:
---
```

具体请参考官方文档[Front-matter](https://butterfly.js.org/posts/dc584b87/#Front-matter)，有相关参数的解释。

# 标签页

```shell
hexo new page tags
```

修改`myblog/source/tags/index.md`：

```markdown
---
title: 标签
date: 2021-04-14 20:41:22
type: "tags"
---
```

`date`为文件创建时间，不用修改。

后续为文档添加`tags`时，标签页会自动生成相应标签进行关联，分类页同理。

# 分类页

```shell
hexo new page categories
```

修改`myblog/source/categories/index.md`：

```markdown
---
title: 分类
date: 2021-04-14 20:47:06
type: "categories"
---
```

# 友情链接页

```shell
hexo new page link
```

修改`myblog/source/link/index.md`：

```markdown
---
title: 友情链接
date: 2021-04-15 09:23:04
type: "link"
---
```

将`_config.butterfly.yml`中菜单`menu`部分注释取消：

```vim
menu:
  Home: / || fas fa-home
  Archives: /archives/ || fas fa-archive
  Tags: /tags/ || fas fa-tags
  Categories: /categories/ || fas fa-folder-open
  List||fas fa-list:
    Music: /music/ || fas fa-music
    Movie: /movies/ || fas fa-video
  links: /link/ || fas fa-link
  About: /about/ || fas fa-heart
```

这样就能在博客菜单栏看到`links`及其他菜单了，但是点开`links`会发现一片空白？

创建`myblog/source/_data/link.yml`，举例：

```vim
- class_name: 非正常人类致富研究中心
  class_desc:
  link_list:
    - name: Tr0y's Blog
      link: https://www.tr0y.wang/
      avatar: https://www.tr0y.wang/img/avatar.jpg
      descr: 王大佬
    - name: Xieldy
      link: http://blog.xieldy.cn/
      avatar: http://blog.xieldy.cn/img/avatar.png
      descr: 谢大佬
    - name: barriery's World
      link: https://barriery.cn/
      avatar: https://barriery.cn/img/avatar.jpg
      descr: 叶大佬
```

看到这儿的朋友，希望我能够进入你的友链 ^w^

话虽这么说，但是这篇文章写到这儿的时候，我的博客还有几个问题亟待解决：

- 访问速度慢，甚至访问失败
- 需要合适的图床存储图片资源

# Cloudflare加速

最开始访问`lucifer9735.github.io`时并没有什么问题，但当我企图通过github仓库加载图片的时候，我错了。

早有耳闻[Cloudflare](https://www.cloudflare.com/zh-cn/)很强，可免费使用许多功能，而我恰好有一个国外域名不用备案。

鉴于有效性考量，这部分内容我只作相关提示，具体请自行查阅资料。邮件不保证回复及时。

## 购买域名

国内域名提供网络服务须备案。但相应的，域名备案后可以使用国内服务商提供的CDN服务。

国外域名提供商有很多，我是在[NameSilo](https://www.namesilo.com/)购买的。

## 解析域名

在[Cloudflare](https://dash.cloudflare.com/)的`DNS`服务中用`CNAME`类型解析域名，如图：

![CNAME域名解析](https://img.foopi.top/postpic/CNAME%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90.webp)

## 添加CNAME文件

为了防止每次`hexo d`删除仓库根目录的`CNAME`文件导致访问`404`，我们可以在目录`myblog/source`下创建文件`CNAME`，内容为你的域名：

```vim
foopi.top
```

这个方法同样可用于解决`README.md`的问题，但是`.md`文件在上传时会被渲染为`.html`文件。

通过修改`_config.yml`中`skip_render`参数跳过渲染`README.md`文件：

```vim
skip_render: README.md
```

再次部署后，就可以尝试访问你自己的域名了。

## SSL认证

你的浏览器可能会提示你此时连接不安全，如图所示：

<img src="https://img.foopi.top/postpic/http访问不安全.webp" alt="http访问不安全" style="zoom: 67%;" />

我们可以直接使用`Cloudflare`提供的`SSL/TLS加密模式`功能：

<img src="https://img.foopi.top/postpic/SSL:TLS加密模式.webp" alt="SSL/TLS加密模式" style="zoom: 50%;" />

# Typora+Picgo

采用`Typora+Picgo`的文本编辑方式。

- [Typora](https://www.typora.io/)

- [Picgo](https://github.com/Molunerfinn/PicGo)

目前默认图床[sm.ms](https://sm.ms/)，有能力尽量建私有图床。

2021-4-18 改用腾讯云对象存储COS

2021-4-21 [B2+CF](https://blog.meow.page/archives/free-personal-image-hosting-with-backblaze-b2-and-cloudflare-workers/)（请留意参考文档标签栏，有必要避免误会）

# What's more

按需配置`_config.butterfly.yml`。

- menu 导航菜单 **About**

- code blocks 代码块 **代码高亮**

- copy settings 复制设置 ✅

- social settings 社交设置 RSS

- search **本地搜索**

- Math **KaTeX**

- image 图片设置

- post_meta 文档元 

- wordcount **字数统计** ✅

- toc 目录 ✅

- post_copyright 文章版权 ✅

- sponsor/reward 打赏

- related articles 相关文章 ✅

- anchor 文章锚点 ✅

- outdated 文章过期提醒 测试失败

- share 分享

- comments 评论

- chat 聊天

- footer settings 页脚设置

- analysis 分析

- advertisement 广告

- verification 站长验证

- beautify/effect 美化效果

  - footer透明化  ✅

    `myblog/themes/butterfly/source/css/_layout/footer.styl`注释掉` background: $light-blue`

  - 页面美化 ✅

- font settings 字体设置

- subtitle 主页副语

- loading animation 加载动画 ✅

- aside 侧边栏

- 网站资讯

- lightbox 图片查看模式 ✅

- Pjax

- Inject

- pangu 中英文间加空格

- snackbar 弹窗 ✅

- instantpage 预加载

- lazyload 图片懒加载 ✅

- **PWA**

- **CDN**

- **[SEO](https://butterfly.js.org/posts/4073eda/)**
