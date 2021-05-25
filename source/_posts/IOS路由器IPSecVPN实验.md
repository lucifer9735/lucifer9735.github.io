---
title: IOS路由器IPSecVPN实验
categories:
  - 想要毕业
  - 网络与协议安全
description: 计算机与网络安全综合实验（五）
abbrlink: ff4b27d9
date: 2021-05-24 14:28:15
tags:
cover:
katex:
---

## 实验五 IOS路由器IPSecVPN实验

### 实验内容

本实验在点对点IP隧道实验的基础上，验证通过IPSec实现经过点对点IP隧道传输的IP分组的保密性和完整性的过程。

点对点IP隧道只是解决了以私有IP地址为源和目的IP地址的IP分组跨公共网络传输的问题，但没有解决以私有IP地址为源和目的IP地址的IP分组经过公共网络传输时，需要保证其保密性与完整性的问题以及点对点IP隧道两端之间的双向鉴别问题。解决上述问题的方法是建立点对点IP隧道两端之间的双向安全关联。动态建立安全关联的协议是 Internet 安全关联和密钥管理协议(Internet Security Association and Key Management Protocol, ISAKMP)，ISAKMP 分两阶段建立点对点IP隧道两端之间的双向安全关联，第一阶段是建立点对点IP隧道两端之间的安全传输通道；第二阶段是建立点对点IP隧道两端之间的双向安全关联。

### 实验目的

1. 掌握 ISAKMP 策略配置过程
2. 掌握 IP Sec 参数配置过程
3. 验证 IP Sec 安全关联建立过程
4. 验证封装安全净荷(Encapsulationg Security Payload, ESP)报文的封装过程
5. 验证基于 IP Sec VPN 的数据传输过程

### 实验原理

点对点IP隧道只能解决由公共网络实现互连的内部子网之间的通信问题，但不能实现内部子网之间的安全通信。实现安全通信，一是需要对隧道两端的路由器实现双向身份鉴别，以免发生假冒内部子网与其他内部子网通信的情况；二是需要保证经过公共网络传输的数据的完整性和保密性。IP Sec 协议就是一种实现内层IP分组经过隧道安全通信的协议。通过 ISAKMP 在隧道两端之间建立 IP Sec 安全关联，将内层IP分组封装成 ESP 报文后，再经过隧道传输。ISAKMP 分两阶段完成隧道两端之间 IP Sec 安全关联建立过程，第一阶段是建立安全传输通道，在这一阶段，隧道两端需要约定加密算法、报文摘要算法、鉴别方式和 DH组号；第二阶段是建立 IP Sec 安全关联，在这一阶段，隧道两端需要约定安全协议、加密算法和散列消息鉴别码(Hashed Message Authentication Codes, HMAC) 算法。

#### 建立安全传输通道

隧道两端在建立安全传输通道时，需要完成身份鉴别协议、密钥交换算法和加密/解密算法等协商过程，因此，隧道两端必须就身份鉴别协议、密钥交换算法及加密/解密算法等安全属性达成一致。配置安全策略的目的是为需要建立安全传输通道的隧道两端配置相同的安全属性。

#### 建立安全关联

在建立安全关联时需要确定安全协议、加密算法和 HMAC 算法等。IP Sec 可以选择鉴别首部(Authentication Header, AH)或 ESP 作为安全关联的安全协议。在选择 AH 时需要选择 HMAC 算法；在选择 ESP 时需要选择加密算法和 HMAC 算法。配置 IP Sec 属性就是在隧道两端配置相同的安全协议及相关算法。

#### 配置分组过滤器

配置分组过滤器的目的是筛选出需要经过 IP Sec 安全关联传输的一组IP分组。在这里，只有与实现内部子网之间通信相关的IP分组才需要经过 IP Sec 安全关联进行传输。

### 实验步骤

1. 在点对点IP隧道实验基础上进行本实验。

2. 在 CLI 配置方式下，隧道两端完成安全策略配置过程，指定建立安全传输通道使用的加密算法3DES、报文摘要算法MD5、共享密钥鉴别机制和DH组号DH-2。隧道每一端可以配置多个安全策略，但两端必须存在匹配的安全策略，否则会终止IP Sec安全关联建立过程。

3. 由于双方采用共享密钥鉴别方式，隧道两端需要在 CLI 配置方式下完成共享密钥配置过程。 Packet Tracer 只能用单个共享密钥绑定所有采用共享密钥鉴别机制的隧道两端。

4. 在 CLI 配置方式下，隧道两端完成变换集配置过程。隧道两端通过指定变换集确定 IP Sec 安全关联使用的安全协议及各种相关算法。

5. 在 CLI 配置方式下，通过配置分组过滤器指定隧道两端需要进行安全传输的IP分组范围。

6. 在 CLI 配置方式下，隧道两端完成加密映射配置过程。加密映射中将 IP Sec 安全关联另一端的IP地址、为 IP Sec 配置的变换集及用于控制需要安全传输的IP分组范围的分组过滤器绑定在一起。如果某个端口作为多条隧道的源端口，则需要创建多个名字相同但序号不同的加密映射，每一个加密映射对应不同的隧道。

7. 在 CLI 配置方式下，完成将创建的加密映射作用到某个接口的过程。加密映射一旦作用到某个接口上，则按照加密映射的配置，自动建立 IP Sec 安全关联，并通过 IP Sec 安全关联安全传输分组过滤器指定的IP分组集。

   1. Router1 与 IP Sec 有关的命令行接口配置过程：

      ```shell
      enable
      configure terminal
      crypto isakmp policy 1
      authentication pre-share
      encryption 3des
      hash md5
      group 2
      lifetime 3600
      exit
      crypto isakmp key 1234 address 0.0.0.0 0.0.0.0
      crypto ipsec transform-set tunnel esp-3des esp-md5-hmac
      access-list 101 permit gre host 192.1.1.1 host 192.1.2.1
      access-list 101 deny ip any any
      access-list 102 permit gre host 192.1.1.1 host 192.1.3.1
      access-list 102 deny ip any any
      crypto map tunnel 10 ipsec-isakmp
      set peer 192.1.2.1
      set pfs group2
      set security-association lifetime seconds 900
      set transform-set tunnel
      match address 101
      exit
      crypto map tunnel 20 ipsec-isakmp
      set peer 192.1.3.1
      set pfs group2
      set security-association lifetime seconds 900
      set transform-set tunnel
      match address 102
      exit
      interface FastEthernet0/1
      crypto map tunnel
      exit
      ```

      <img src="https://img.foopi.top/postpic/image-20210525152058658.webp" alt="image-20210525152058658" style="zoom:80%;" />

   2. Router2 与 IP Sec 有关的命令行接口配置过程：

      ```shell
      enable
      configure terminal
      crypto isakmp policy 1
      authentication pre-share
      encryption 3des
      hash md5
      group 2
      lifetime 3600
      exit
      crypto isakmp key 1234 address 0.0.0.0 0.0.0.0
      crypto ipsec transform-set tunnel esp-3des esp-md5-hmac
      access-list 101 permit gre host 192.1.2.1 host 192.1.1.1
      access-list 101 deny ip any any
      access-list 102 permit gre host 192.1.2.1 host 192.1.3.1
      access-list 102 deny ip any any
      crypto map tunnel 10 ipsec-isakmp
      set peer 192.1.1.1
      set pfs group2
      set security-association lifetime seconds 900
      set transform-set tunnel
      match address 101
      exit
      crypto map tunnel 20 ipsec-isakmp
      set peer 192.1.3.1
      set pfs group2
      set security-association lifetime seconds 900
      set transform-set tunnel
      match address 102
      exit
      interface FastEthernet0/1
      crypto map tunnel
      exit
      ```

   3. Router3 与 IP Sec 有关的命令行接口配置过程：

      ```shell
      enable
      configure terminal
      crypto isakmp policy 1
      authentication pre-share
      encryption 3des
      hash md5
      group 2
      lifetime 3600
      exit
      crypto isakmp key 1234 address 0.0.0.0 0.0.0.0
      crypto ipsec transform-set tunnel esp-3des esp-md5-hmac
      access-list 101 permit gre host 192.1.3.1 host 192.1.1.1
      access-list 101 deny ip any any
      access-list 102 permit gre host 192.1.3.1 host 192.1.2.1
      access-list 102 deny ip any any
      crypto map tunnel 10 ipsec-isakmp
      set peer 192.1.1.1
      set pfs group2
      set security-association lifetime seconds 900
      set transform-set tunnel
      match address 101
      exit
      crypto map tunnel 20 ipsec-isakmp
      set peer 192.1.2.1
      set pfs group2
      set security-association lifetime seconds 900
      set transform-set tunnel
      match address 102
      exit
      interface FastEthernet0/1
      crypto map tunnel
      exit
      ```

8. 在隧道两端的接口各自创建加密映射后，隧道两端通过 ISAKMP 自动创建 IP Sec 安全关联，内层IP分组经过隧道传输时，封装成外层IP分组。外层IP分组经过安全关联传输时，封装成 ESP 报文。

   Ping通后模拟发包：

   <img src="https://img.foopi.top/postpic/image-20210525152250059.webp" alt="image-20210525152250059" style="zoom:80%;" />

   <img src="https://img.foopi.top/postpic/image-20210525152454920.webp" alt="image-20210525152454920" style="zoom:80%;" />

   内层IP分组格式：

   <img src="https://img.foopi.top/postpic/image-20210525152610878.webp" alt="image-20210525152610878" style="zoom:80%;" />

   内层IP分组封装成外层IP分组过程：

   <img src="https://img.foopi.top/postpic/image-20210525153506907.webp" alt="image-20210525153506907" style="zoom:80%;" />

   外层IP分组封装成 ESP 报文过程：

   <img src="https://img.foopi.top/postpic/image-20210525153636199.webp" alt="image-20210525153636199" style="zoom:80%;" />

### 实验总结

了解了通过IPSec实现经过点对点IP隧道传输的IP分组的保密性和完整性的过程。

