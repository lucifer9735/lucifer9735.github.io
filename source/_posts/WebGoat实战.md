---
title: WebGoat实战
tags: WebGoat
categories:
  - 想要毕业
  - 网络对抗原理
description: 网络对抗原理实验（一）
abbrlink: 4cfedd8d
date: 2021-05-25 18:48:34
cover:
katex:
---

> WebGoat is a deliberately insecure web application maintained by [OWASP](http://www.owasp.org/) designed to teach web application security lessons.

## 环境搭建

尹老师力推Fedora，本实验使用的是`Parallels Desktop`中安装的`Fedora32`虚拟机。

### 安装 docker

```shell
sudo dnf install docker
```

<img src="https://img.foopi.top/postpic/dnf install docker.webp" alt="dnf install docker" style="zoom:67%;" />

### 更换 docker 源

我使用的是[阿里云的docker源](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)，需要阿里云用户的身份：

```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://你的加速地址.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 测试 hello-world

```shell
sudo docker run hello-world
```

<img src="https://img.foopi.top/postpic/docker run hello-world.webp" alt="docker run hello-world" style="zoom:67%;" />

### 可能需要的设置

距离搭建环境已经过去了六周时间，翻看`.zsh_history`注意到当初输入了这些命令，记录下来以备不时之需。

```shell
sudo grubby --update-kernel=ALL --args="systemd.unified_cgroup_hierarchy=0"
sudo dnf install docker-compose
sudo firewall-cmd --permanent --zone=trusted --add-interface=docker0
sudo groupadd docker
sudo usermod -aG docker $USER
reboot
```

### WebGoat 相关命令

第一次运行：

```shell
docker run -p 8080:8080 -p 9090:9090 -e TZ=Asia/Shanghai webgoat/goatandwolf
```

<img src="https://img.foopi.top/postpic/run webgoat.webp" alt="run webgoat" style="zoom:67%;" />

停止容器：

```shell
docker ps
docker stop 26cb91349941
```

为了方便使用：

```shell
docker run -itd --name webgoat -p 8080:8080 -p 9090:9090 -e TZ=Asia/Shanghai webgoat/goatandwolf
docker stop webgoat
docker start webgoat
```

## 实战

