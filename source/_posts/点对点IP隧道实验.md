---
title: 点对点IP隧道实验
categories:
  - 想要毕业
  - 网络与协议安全
description: 计算机与网络安全综合实验（四）
abbrlink: 1831324f
date: 2021-05-24 14:25:03
tags:
cover:
katex:
---

## 实验四 点对点IP隧道实验

### 实验内容

完成点对点IP隧道网络搭建，利用IP隧道技术完成一对用户通过公共网络进行安全通信的过程。

<img src="https://img.foopi.top/postpic/image-20210520150008317.webp" alt="image-20210520150008317" style="zoom:50%;" />

VPN 物理结构如图(a)所示。路由器 R4、R5 和 R6 构成公共网络，边缘路由器 R1、R2 和 R3 一端连接内部子网，另一端连接公共网络。由于公共网络无法传输以私有IP地址为源和目的IP地址的IP分组，因此，由公共网络互连的多个分配私有IP地址的内部子网之间无法直接进行通信。为了实现被公共网络分隔的多个内部子网之间的通信过程，需要建立以边缘路由器连接公共网络的接口为两端的点对点IP隧道，并为点对点IP隧道的两端分配私有IP地址。因此将(a)所示的物理结构转变为(b)所示的逻辑结构:

<img src="https://img.foopi.top/postpic/image-20210520150836542.webp" alt="image-20210520150836542" style="zoom:50%;" />

点对点IP隧道成为互连边缘路由器的虚拟点对点链路，边缘路由器之间能够通过点对点IP隧道直接传输以私有IP地址为源和目的IP地址的IP分组。点对点IP隧道经过公共网络，因此需要通过隧道技术完成以私有IP地址为源和目的IP地址的IP分组经过公共网络传输的过程。

### 实验目的

1. 掌握VPN设计过程
2. 掌握点对点IP隧道配置过程
3. 掌握公共网络路由建立过程
4. 掌握内部网络路由建立过程
5. 验证公共网络隧道两端的传输路径的建立过程
6. 验证基于隧道实现的内部子网之间的IP分组传输过程

### 实验原理

以下操作是通过隧道技术完成以私有IP地址为源和目的的IP地址的IP分组经过公共网络传输的过程的前提。

#### 建立公共网络端到端传输路径

建立路由器 R1、R2 和 R3 连接公共网络端接口之间的IP传输路径是建立路由器 R1、R2 和 R3 连接公共网络的接口之间的点对点IP隧道的前提，如图(a)所示。

图(a)中的公共网络包含路由器 R4、R5 和 R6 连接的所有网络，以及边缘路由器 R1、R2 和 R3 连接公共网络的接口，可以将上述范围的公共网络定义为单个 OSPF 区域，通过 OSPF 在各台路由器中建立用于指明边缘路由器 R1、R2 和 R3 连接公共网络的接口之间的IP传输路径的路由项。

#### 建立点对点IP隧道

实现分配私有IP地址的内部子网之间互连的 VPN 逻辑结构如(b)所示，关键是创建实现边缘路由器 R1、R2 和 R3 之间两两互连的点对点IP隧道。由于每一条点对点IP隧道的两端是边缘路由器连接公共网络的接口，因此，边缘路由器连接公共网络的接口分配的全球IP地址也成为每一条点对点IP隧道两端的全球IP地址。

点对点IP隧道完成以私有IP地址为源和目的IP地址的IP分组两台边缘路由器之间传输的过程如下：点对点IP隧道一端的边缘路由器将以私有IP地址为源和目的IP地址的IP分组作为净荷，重新封装成以点对点IP隧道两端的全球IP地址为源和目的IP地址的分组。以点对点IP隧道两端的全球IP地址为源和目的IP地址的IP分组沿着通过 OSPF 建立的路由器R1、R2 和 R3 连接公共网络的接口之间的IP传输路径从点对点IP隧道的一端传输到点对点IP隧道的另一端。点对点IP隧道另一端的边缘路由器从以点对点IP隧道两端的全球IP地址为源和目的IP地址的IP分组中分离出以私有IP地址为源和目的IP地址的IP分组，以此完成以私有IP地址为源和目的IP地址的IP分组经过点对点IP隧道传输的过程。（绕口令hhh）

#### 建立内部子网之间的传输路径

对于内部子网，公共网络是不可见的，实现边缘路由器之间互连的是两端分配私有IP地址的虚拟点对点链路（点对点IP隧道）。实现内部子网互连的VPN逻辑结构如图(b)所示。每一台边缘路由器的路由表中建立用于指明通往所有内部子网的传输路径的路由项。每一台边缘路由器通过 RIP 创建用于指明通往没有与该边缘路由器直接连接的内部子网的传输路径的路由项。

#### 建立边缘路由器完整路由表

边缘路由器需要配置两种类型的路由进程，一种是 OSPF 路由进程，用于创建边缘路由器连接公共网络接口之间的传输路径，这些传输路径是建立点对点IP隧道的基础；另一种是 RIP 路由进程，该路由进程基于边缘路由器之间的点对点IP隧道创建内部子网之间的传输路径。

边缘路由器的路由表中存在多种类型的路由项，第一种是直连路由项，包括物理接口直接连接的网络（如路由器 R1 两个物理接口直接连接的网络 192.168.1.0/24 和 192.1.1.0/24）和隧道接口直接连接的网络（如路由器 R1 隧道 1 连接的网络 192.168.4.0/24 和隧道 2 连接的网络 192.168.5.0/24）；第二种是 OSPF 创建的动态路由项，用于指明通往公共网络中各个子网的传输路径；第三种是 RIP 创建的动态路由项，用于指明通往各个内部子网的传输路径。

### 实验步骤

1. 根据图(a)所示网络结构放置和连接设备。

   <img src="https://img.foopi.top/postpic/image-20210524151208102.webp" alt="image-20210524151208102" style="zoom:50%;" />

   需要注意的是路由器默认只有两个以太口，需要自行添加模块：

   <img src="https://img.foopi.top/postpic/image-20210524151709666.webp" alt="image-20210524151709666" style="zoom:50%;" />

2. 为每一台路由器的各个接口配置IP地址和子网掩码。

3. 在 CLI 配置方式下，完成将路由器 Router4、Router5 和 Router6 的各个接口以及路由器 Router1、Router2 和 Router3 连接公共网络的接口分配到同一个 OSPCF 区域的配置过程。

4. 在 CLI 配置方式下，完成以下功能的配置过程：定义路由器 Router1、Router2 和 Router3 连接公共网络的接口之间的IP隧道；为隧道接口配置私有IP地址。

5. 路由器 Router1、Router2 和 Router3 在直接连接的网络中，选择内部网络和隧道接口连接的网络作为参与 RIP 创建动态路由项过程的网络。

   1. Router1 命令行接口配置过程：

      ```shell
      enable
      configure terminal
      hostname Router1
      interface FastEthernet0/0
      no shutdown
      ip address 192.168.1.254 255.255.255.0
      exit
      interface FastEthernet0/1
      no shutdown
      ip address 192.1.1.1 255.255.255.0
      exit
      router ospf 01
      network 192.1.1.0 0.0.0.255 area 1
      exit
      interface tunnel 1
      ip address 192.168.4.1 255.255.255.0
      tunnel source FastEthernet0/1
      tunnel destination 192.1.2.1
      exit
      interface tunnel 2
      ip address 192.168.5.1 255.255.255.0
      tunnel source FastEthernet0/1
      tunnel destination 192.1.3.1
      exit
      router rip
      network 192.168.1.0
      network 192.168.4.0
      network 192.168.5.0
      exit
      ```

      <img src="https://img.foopi.top/postpic/image-20210525090757759.webp" alt="image-20210525090757759" style="zoom:50%;" />

   2. Router2 命令行接口配置过程：

      ```shell
      enable
      configure terminal
      hostname Router2
      interface FastEthernet0/0
      no shutdown
      ip address 192.168.2.254 255.255.255.0
      exit
      interface FastEthernet0/1
      no shutdown
      ip address 192.1.2.1 255.255.255.0
      exit
      router ospf 02
      network 192.1.2.0 0.0.0.255 area 1
      exit
      interface tunnel 1
      ip address 192.168.4.2 255.255.255.0
      tunnel source FastEthernet0/1
      tunnel destination 192.1.1.1
      exit
      interface tunnel 3
      ip address 192.168.6.1 255.255.255.0
      tunnel source FastEthernet0/1
      tunnel destination 192.1.3.1
      exit
      router rip
      network 192.168.2.0
      network 192.168.4.0
      network 192.168.6.0
      exit
      ```

   3. Router3 命令行接口配置过程：

      ```shell
      enable
      configure terminal
      hostname Router3
      interface FastEthernet0/0
      no shutdown
      ip address 192.168.3.254 255.255.255.0
      exit
      interface FastEthernet0/1
      no shutdown
      ip address 192.1.3.1 255.255.255.0
      exit
      router ospf 03
      network 192.1.3.0 0.0.0.255 area 1
      exit
      interface tunnel 2
      ip address 192.168.5.2 255.255.255.0
      tunnel source FastEthernet0/1
      tunnel destination 192.1.1.1
      exit
      interface tunnel 3
      ip address 192.168.6.2 255.255.255.0
      tunnel source FastEthernet0/1
      tunnel destination 192.1.2.1
      exit
      router rip
      network 192.168.3.0
      network 192.168.5.0
      network 192.168.6.0
      exit
      ```

   4. Router4 命令行接口配置过程：

      ```shell
      enable
      configure terminal
      hostname Router4
      interface FastEthernet0/0
      no shutdown
      ip address 192.1.1.2 255.255.255.0
      exit
      interface FastEthernet0/1
      no shutdown
      ip address 192.1.4.1 255.255.255.0
      exit
      interface FastEthernet1/0
      no shutdown
      ip address 192.1.5.1 255.255.255.0
      exit
      router ospf 04
      network 192.1.1.0 0.0.0.255 area 1
      network 192.1.4.0 0.0.0.255 area 1
      network 192.1.5.0 0.0.0.255 area 1
      exit
      ```

      <img src="https://img.foopi.top/postpic/image-20210525093608156.webp" alt="image-20210525093608156" style="zoom:50%;" />

   5. Router5 命令行接口配置过程：

      ```shell
      enable
      configure terminal
      hostname Router5
      interface FastEthernet0/0
      no shutdown
      ip address 192.1.2.2 255.255.255.0
      exit
      interface FastEthernet0/1
      no shutdown
      ip address 192.1.4.2 255.255.255.0
      exit
      interface FastEthernet1/0
      no shutdown
      ip address 192.1.6.1 255.255.255.0
      exit
      router ospf 05
      network 192.1.2.0 0.0.0.255 area 1
      network 192.1.4.0 0.0.0.255 area 1
      network 192.1.6.0 0.0.0.255 area 1
      exit
      ```

   6. Router6 命令行接口配置过程：

      ```shell
      enable
      configure terminal
      hostname Router6
      interface FastEthernet0/0
      no shutdown
      ip address 192.1.3.2 255.255.255.0
      exit
      interface FastEthernet0/1
      no shutdown
      ip address 192.1.5.2 255.255.255.0
      exit
      interface FastEthernet1/0
      no shutdown
      ip address 192.1.6.2 255.255.255.0
      exit
      router ospf 06
      network 192.1.3.0 0.0.0.255 area 1
      network 192.1.5.0 0.0.0.255 area 1
      network 192.1.6.0 0.0.0.255 area 1
      exit
      ```

6. 完成上述配置过程后，每一台路由器创立了完整的路由表。路由项分为三类：第一类类型为 C ，用于指明通往直接连接的网络的传输路径的路由项，这些路由项中包含IP隧道接口连接的网络；第二类类型为 O ，用于指明通往没有与该路由器直接连接的公共子网的传输路径的路由项；第三类类型为 R ，用于指明通往没有与该路由器直接连接的内部子网的传输路径的路由项。O型路由项由 OSPF 创建，R型路由项由 RIP 创建。

   在对应路由器命令行模式利用`show ip route`查看完整路由表如下：

   1. Router1 完整路由表：

      <img src="https://img.foopi.top/postpic/image-20210525095835118.webp" alt="image-20210525095835118" style="zoom: 80%;" />

   2. Router2 完整路由表：

      <img src="https://img.foopi.top/postpic/image-20210525100612264.webp" alt="image-20210525100612264" style="zoom:80%;" />

   3. Router3 完整路由表：

      <img src="https://img.foopi.top/postpic/image-20210525100839591.webp" alt="image-20210525100839591" style="zoom:80%;" />

   4. Router4 完整路由表：

      <img src="https://img.foopi.top/postpic/image-20210525101008305.webp" alt="image-20210525101008305" style="zoom:80%;" />

   5. Router5 完整路由表：

      <img src="https://img.foopi.top/postpic/image-20210525101127518.webp" alt="image-20210525101127518" style="zoom:80%;" />

   6. Router6 完整路由表：

      <img src="https://img.foopi.top/postpic/image-20210525101204131.webp" alt="image-20210525101204131" style="zoom:80%;" />

7. 切换到模拟操作模式，启动 PC0 至 Server2 的 ICMP 报文传输过程。内部子网中 ICMP 报文封装如图所示，ICMP 报文封装成以 PC0 的私有IP地址 192.168.1.1 为源IP地址、以 Server2 的私有地址192.168.3.3 为目的IP地址的IP分组。

   <img src="https://img.foopi.top/postpic/image-20210525102607203.webp" alt="image-20210525102607203" style="zoom:80%;" />

   遇到了一些小问题，将默认网关设置好即可。

   <img src="https://img.foopi.top/postpic/image-20210525103800523.webp" alt="image-20210525103800523" style="zoom:80%;" />

   公共网络中 ICMP 报文封装过程如下图所示，以 PC0 的私有IP地址 192.168.1.1 为源IP地址、以 Server2 的私有IP地址 192.168.3.3 为目的IP地址的IP分组封装成 GRE 格式，并以 GRE 格式为净荷，封装成以 Router1 连接公共网络的接口IP地址 192.1.1.1 为源地址、以 Router3 连接公共网络的接口的IP地址 192.1.3.1 为目的IP地址的IP分组。这一步需要用到 Simulation模式，我参考了[这里](https://jingyan.baidu.com/article/f54ae2fc6d35ed1e92b849d3.html)。

   <img src="https://img.foopi.top/postpic/image-20210525104816541.webp" alt="image-20210525104816541" style="zoom:80%;" />

   为了区分，将以 PC0 的私有IP地址 192.168.1.1 为源IP地址、以 Server2 的私有IP地址 192.168.3.3 为目的IP地址的IP分组称为内层IP分组，将以 Router1 连接公共网络的接口的IP地址 192.1.1.1 为源IP地址、以 Router3 连接公共网络的接口的IP地址 192.1.3.1 为目的IP地址的IP分组称为外层IP分组。内部网络内传输内层IP分组，公共网络内传输外层IP分组。

### 实验总结

这次实验遇到了不少问题，逐个解决加深了对点对点IP隧道概念的理解。另外，我认为实验中网络物理结构与网络逻辑结构的图示有一定的冲突，故没有照搬路由器命令行配置命令，稍作修改按照网络逻辑结构图尝试实现。当验证修改成功实现时，收获了超出仅复现实验的快乐。
