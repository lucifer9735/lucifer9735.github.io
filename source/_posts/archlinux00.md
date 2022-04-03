---
title: 记录在Parallels Desktop安装Arch Linux
tags: ArchLinux
description: archlinux00
abbrlink: 97494af9
date: 2021-12-17 10:37:27
categories:
cover:
katex:
---

~~又折腾？~~

### 获取ISO镜像

[USTC Open Source Software Mirror](https://mirrors.ustc.edu.cn/)

<img src="https://img.foopi.top/postpic/image-20211215221921611.webp" alt="image-20211215221921611" style="zoom:50%;" />

### 安装前设定

- 选择`其他 Linux`
- 勾选`安装前设定`

- 设置`EFI-64`（硬件--启动顺序--高级）

<img src="https://img.foopi.top/postpic/image-20211216173753627.webp" alt="image-20211216173753627" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20211216173818265.webp" alt="image-20211216173818265" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20211216173844562.webp" alt="image-20211216173844562" style="zoom:50%;" />

### 命令行安装

<img src="https://img.foopi.top/postpic/image-20211216174858430.webp" alt="image-20211216174858430" style="zoom:50%;" />

#### 验证是否已开启`EFI-64`

```shell
# ls /sys/firmware/efi/efivars
```

<img src="https://img.foopi.top/postpic/image-20211216175135416.webp" alt="image-20211216175135416" style="zoom:50%;" />

#### 创建及格式化分区

<img src="https://img.foopi.top/postpic/image-20211216175455817.webp" alt="image-20211216175455817" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20211216175737881.webp" alt="image-20211216175737881" style="zoom:50%;" />

#### 挂载分区

<img src="https://img.foopi.top/postpic/image-20211216175922764.webp" alt="image-20211216175922764" style="zoom:50%;" />

#### 配置国内软件源

```shell
# vim /etc/pacman.d/mirrorlist
```

<img src="https://img.foopi.top/postpic/image-20211216180039425.webp" alt="image-20211216180039425" style="zoom:50%;" />

#### pacstrap

```shell
# pacstrap -i /mnt base base-devel linux linux-firmware
```

<img src="https://img.foopi.top/postpic/image-20211216180450575.webp" alt="image-20211216180450575" style="zoom:50%;" />

#### 生成分区表

```shell
# genfstab -U /mnt > /mnt/etc/fstab
```

<img src="https://img.foopi.top/postpic/image-20211216180701816.webp" alt="image-20211216180701816" style="zoom:50%;" />

#### arch-chroot

<img src="https://img.foopi.top/postpic/image-20211216181056697.webp" alt="image-20211216181056697" style="zoom:50%;" />

#### 本地化配置

```shell
# vim /etc/locale.gen
# locale-gen
```

<img src="https://img.foopi.top/postpic/image-20211216181343512.webp" alt="image-20211216181343512" style="zoom:50%;" />

```shell
# echo LANG=en_US.UTF-8 > /etc/locale.conf
```

#### 设置root密码

<img src="https://img.foopi.top/postpic/image-20211216181627521.webp" alt="image-20211216181627521" style="zoom:50%;" />

#### grub引导

```shell
# pacman -S grub efibootmgr dosfstools
# grub-install --target=x86_64-efi --efi-directory=/boot --recheck
# grub-mkconfig -o /boot/grub/grub.cfg
```

<img src="https://img.foopi.top/postpic/image-20211216181737479.webp" alt="image-20211216181737479" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20211216182227811.webp" alt="image-20211216182227811" style="zoom:50%;" />

#### 添加用户

```
# pacman -S zsh
# useradd -m -g users -G wheel -s /bin/zsh foo
# passwd foo
# pacman -S sudo
# visudo
```

<img src="https://img.foopi.top/postpic/image-20211216182631365.webp" alt="image-20211216182631365" style="zoom:50%;" />

#### 安装网络组件

<img src="https://img.foopi.top/postpic/image-20211216183113626.webp" alt="image-20211216183113626" style="zoom:50%;" />

#### 解除挂载

<img src="https://img.foopi.top/postpic/image-20211216183410435.webp" alt="image-20211216183410435" style="zoom:50%;" />

#### 安装结束

`poweroff`关机后，弹出`ISO镜像`，重新启动虚拟机：

<img src="https://img.foopi.top/postpic/image-20211216183508326.webp" alt="image-20211216183508326" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20211216183608283.webp" alt="image-20211216183608283" style="zoom:50%;" />

### 创建快照

<img src="https://img.foopi.top/postpic/image-20211216183748684.webp" alt="image-20211216183748684" style="zoom:50%;" />

