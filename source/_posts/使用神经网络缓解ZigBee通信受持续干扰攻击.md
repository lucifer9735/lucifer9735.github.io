---
title: 使用神经网络缓解ZigBee通信受持续干扰攻击
tags: ZigBee
categories:
  - - 想要毕业
    - 无线通信网络安全
  - - 论文翻译
abbrlink: 838a4270
date: 2021-06-17 21:51:03
description:
cover:
katex: true
---

[**Securing ZigBee Communications Against Constant Jamming Attack Using Neural Network**](https://ieeexplore.ieee.org/document/9241041)

> **Abstract**—ZigBee is a wireless communication technology that has been widely used to provide low-bandwidth wireless services for Internet-of-Things applications, such as building automation, medical data collection, and industrial equipment control. As ZigBee operates in the industrial, scientific and medical radio frequency bands, it may suffer from unintentional interference from coexisting radio devices (e.g., WiFi and Bluetooth) and/or radio jamming attacks from malicious devices. Although many results have been produced to enhance ZigBee security, there is no technique that can secure ZigBee against jamming attack. In this article, we propose a new ZigBee receiver by leveraging MIMO technology, which is capable of decoding its desired signal in the presence of constant jamming attack. The enabler is a learning-based jamming mitigation method, which can mitigate the unknown interference using an optimized neural network. We have built a prototype of our proposed ZigBee receiver on a wireless testbed. Experimental results show that it is capable of decoding its packets in the face of 20-dB stronger jamming. The proposed ZigBee receiver offers an average of 26.7-dB jamming mitigation capability compared to off-the-shelf ZigBee receivers.
>
> **Index Terms**—Internet-of-Things (IoT) communications, jamming and anti-jamming attack, physical-layer security, ZigBee networks.

摘要——ZigBee是一种无线通信技术，已被广泛用于为物联网应用提供低带宽的无线服务，如楼宇自动化、医疗数据采集和工业设备控制。由于ZigBee工作在工业、科学和医疗无线电频段，它可能会受到共存的无线电设备（如WiFi和蓝牙）的无意干扰和/或恶意设备的无线电干扰攻击。尽管已经有许多成果用于增强ZigBee的安全性，但还没有一种技术可以保证ZigBee免受干扰攻击。在这篇文章中，我们利用MIMO技术提出了一种新的ZigBee接收器，它能够在持续的干扰攻击下解码它的期望信号。促成者是一种基于学习的干扰缓解方法，它可以利用优化的神经网络缓解未知的干扰。我们已经在一个无线测试平台上建立了我们提出的ZigBee接收器的原型。实验结果表明，它能够在面对20分贝的强干扰时解码其数据包。与现成的ZigBee接收器相比，提议的ZigBee接收器提供了平均26.7分贝的干扰缓解能力。

## I. INTRODUCTION

> ZIGBEE is an IEEE 802.15.4-based specification for a suite of high-level communication protocols used to create wireless local area networks for home automation, industrial equipment control, medical data collection, and other low-bandwidth needs. It is typically used for low data rate applications, with a defined data rate of 250 Kb/s. Its transmission range varies from 10 to 20 m, depending on output power and environmental characteristics. ZigBee operates in the industrial, scientific and medical (ISM) radio frequency bands. While other frequency bands are possible, most countries and regions in the world use 2.4 GHz for commercial ZigBee devices in indoor environments. With the rapid proliferation of Internet-of-Things (IoT) devices, ZigBee communications have become an important component of the telecommunication infrastructure in our society.

ZIGBEE是基于IEEE 802.15.4的规范，是一套高级通信协议，用于创建家庭自动化、工业设备控制、医疗数据收集和其他低带宽需求的无线局域网络。它通常用于低数据速率的应用，其定义的数据速率为250 Kb/s。它的传输范围从10到20米不等，取决于输出功率和环境特性。ZigBee在工业、科学和医疗（ISM）无线电频段运行。虽然可以使用其他频段，但世界上大多数国家和地区在室内环境中使用2.4GHz的商用ZigBee设备。随着物联网（IoT）设备的迅速扩散，ZigBee通信已成为我们社会中电信基础设施的重要组成部分。

> As ZigBee has been used for many crucial applications in real world, it is of great importance to secure ZigBee communications for reliable wireless connection. However, similar to other wireless technologies, ZigBee faces two challenges in practice. First, ZigBee devices share ISM radio frequency bands with other types of radio devices (e.g., WiFi and Bluetooth), and, therefore, suffer from unintentional interference from those coexisting devices. For example, a ZigBee device may suffer from interference from its co-located WiFi devices, and the interference may disrupt its communication. Second, due to the openness of wireless medium, ZigBee communications are vulnerable to radio jamming attacks. When a malicious device emits high-power jamming signal, all the ZigBee devices in its proximity will be unable to communicate.

由于ZigBee已经被用于现实世界中的许多关键应用，因此确保ZigBee通信的可靠无线连接是非常重要的。然而，与其他无线技术类似，ZigBee在实践中面临两个挑战。首先，ZigBee设备与其他类型的无线电设备（如WiFi和蓝牙）共享ISM无线电频段，因此会受到这些共存设备的无意干扰。例如，一个ZigBee设备可能会受到其共存的WiFi设备的干扰，而这种干扰可能会破坏其通信。第二，由于无线介质的开放性，ZigBee通信很容易受到无线电干扰攻击。当一个恶意设备发射高功率干扰信号时，其附近的所有ZigBee设备将无法进行通信。

<img src="https://img.foopi.top/postpic/image-20210617224715475.webp" alt="image-20210617224715475" style="zoom:50%;" />

> One may think that ZigBee communications use spectrum spreading at the physical (PHY) layer and, therefore, a ZigBee receiver is resilient to intentional or unintentional interference. This perception is not correct. In ZigBee standard [1], the length of spectrum-spreading code sequence is 32 for every 4 b. The jamming mitigation capability (JMC) that it can offer is about $10\log_{10}(32/4)\approx9dB$, which is very limited. Fig. 1(a) shows a commercial ZigBee receiver in the face of a jamming device, which constantly sends 5-MHz noise-like interference. Our tests show that the ZigBee receiver frequently fails to decode its packets when its jamming-tosignal ratio (JSR) is greater than −1.6 dB. Fig. 1(b) shows a commercial ZigBee receiver in the proximity of a commercial off-the-shelf WiFi device1 that is *constantly* sending WiFi data packets. Our tests show that, when their distance is less than 5 m, the ZigBee receiver suffers from larger than 90% packet error rate.

人们可能认为，ZigBee通信在物理（PHY）层使用规范的传播，因此，ZigBee接收器对有意或无意的干扰具有弹性。这种看法是不正确的。在ZigBee标准[1]中，每4个b的频谱传播代码序列的长度是32，它能提供的干扰缓解能力（JMC）大约是$10\log_{10}(32/4)\approx9dB$，这非常有限。图1(a)显示了一个商业ZigBee接收器在面对一个干扰设备时的情况，该设备不断地发送5-MHz的类似噪音的干扰。我们的测试表明，当ZigBee接收器的干扰-信号比（JSR）大于-1.6dB时，它经常无法解码其数据包。图1(b)显示了一个商用ZigBee接收器与一个不断发送WiFi数据包的商用现成WiFi设备1相邻。我们的测试表明，当他们的距离小于5米时，ZigBee接收器有大于90%的数据包错误率。

> Although many results have been produced to enhance ZigBee security, there is no solution that can secure ZigBee against jamming attacks. The existing results in this domain are either focused on enhancing the effectiveness of jamming attacks [4], [5], [15] or limited to the interference cancellation for cooperative devices, such as WiFi [16]–[18]. Little progress has been made so far in the design of practical solutions to secure ZigBee against jamming attacks. The lack of effective solutions underscores the critical needs and grand challenges in this task.

尽管已经有许多成果用于增强ZigBee的安全性，但还没有任何解决方案可以保证ZigBee免受干扰攻击。这个领域的现有成果要么集中在增强干扰攻击的有效性上[4], [5], [15]，要么仅限于合作设备的干扰消除，如WiFi[16]-[18]。到目前为止，在设计实用的解决方案以确保ZigBee免受干扰攻击方面几乎没有进展。缺乏有效的解决方案凸显了这项工作的关键需求和巨大挑战。

> In this article, we design a practical scheme to secure ZigBee communications against radio jamming attack (or unknown cross-network interference on ISM bands). The enabler is a new physical-layer design for a ZigBee receiver, making it capable of decoding its data packets in the presence of unknown interference. Our design relies on the assumption that a ZigBee device is equipped with two antennas. It leverages the spatial degrees of freedom (DoF) provided by its antennas to mitigate interference and decode its desired signal. One may argue that many ZigBee devices are powered by battery and, therefore, unsuited for multiple antennas. In fact, with the advancement of semiconductor and antenna technologies in the past decades, two antennas can be easily installed on a battery-powered ZigBee device. Moreover, many ZigBee-based IoT devices (e.g., electronic switches and industrial equipment) have sufficient power supply for their operations. Therefore, it is a mild assumption that a ZigBee device has two antennas in future IoT systems.

在这篇文章中，我们设计了一个实用的方案，以缓解ZigBee通信受无线电干扰攻击（或ISM波段的未知跨网络干扰）。该方案是对ZigBee接收器的一种新的物理层设计，使其能够在存在未知干扰的情况下对其数据包进行解码。我们的设计依赖于ZigBee设备配备了两根天线的假设。它利用其天线提供的空间自由度（DoF）来缓解干扰并解码其所需的信号。有人可能会说，许多ZigBee设备是由电池供电的，因此不适合多天线。事实上，随着半导体和天线技术在过去几十年的发展，两根天线可以很容易地安装在电池供电的ZigBee设备上。此外，许多基于ZigBee的物联网设备（如电子开关和工业设备）都有足够的电源供其运行。因此，在未来的物联网系统中，一个ZigBee设备有两根天线是一个温和的假设。

>To decode ZigBee signal in the presence of unknown interference (jamming signal), we propose a learning-based method for jamming mitigation using a neural network at the physical layer. This neural network works as a linear spatial filter to suppress interference while not requiring any knowledge of the interference. A challenge in this method is the way of training the neural network so that it can decode the packets in real time. To address this challenge, we adopt a small-sized neural network that does not have hidden layers and optimize it by exploiting the inherent relationship of network weights to speed up the training process. ZigBee packet preamble (4 bytes or 32 b) is then used to train the optimized neural network.

为了在存在未知干扰（干扰信号）的情况下解码ZigBee信号，我们提出了一种基于学习的方法，利用物理层的神经网络来缓解干扰。这个神经网络作为一个线性空间滤波器来抑制干扰，而不需要对干扰有任何了解。这种方法的`一个挑战是如何训练神经网络，使其能够实时解码数据包。`为了解决这一挑战，我们采用了一个没有隐藏层的小尺寸神经网络，并通过利用网络权重的固有关系来优化它，以加快训练过程。然后，ZigBee数据包头部（4字节或32bit）被用来训练优化的神经网络。

> In addition to signal detection, another challenge in the design of jamming-resilient ZigBee receiver is time and frequency synchronization, where time synchronization is to search for the first chip of a packet and frequency synchronization is to compensate the frequency offsets. In the presence of interference, conventional correlation-based synchronization approach does not work. To address this challenge, we propose a projection-based approach for the synchronization component, which first projects received signals in the spatial domain and then employs the conventional approach to compensate the time and frequency offsets.

除了信号检测，抗干扰ZigBee接收器设计的`另一个挑战是时间和频率同步，其中时间同步是搜索数据包的第一个码片，频率同步是补偿频率偏移。`在有干扰的情况下，传统的基于相关的同步方法不起作用。为了应对这一挑战，我们提出了一种基于投影的同步组件的方法，它首先在空间域投影接收到的信号，然后采用传统的方法来补偿时间和频率偏移。

> We have built a prototype of ZigBee receiver on a wireless testbed to validate our design in real-world wireless environments and evaluated its performance in the presence of a malicious device that emits different types of radio jamming signals. We placed the ZigBee transmitter, receiver, and jamming device at 20 different locations in a smart home environment. We examined three cases where a malicious radio attacker interferes with ZigBee receiver using WiFi-like, CDMA-like, or noise-like signal over full ZigBee spectrum. Experimental results show that our prototyped ZigBee receiver offers an addition of 26.7 dB (on average) JMC in comparison with an off-the-shelf ZigBee receiver. The results suggest that our designed ZigBee receiver can successfully decode ZigBee packets even if jamming signal is 20-dB stronger than ZigBee signal.

我们在一个无线测试平台上建立了一个ZigBee接收器的原型，以验证我们在真实世界的无线环境中的设计，并评估了它在有恶意设备发射不同类型的无线电干扰信号时的性能。我们将ZigBee发射器、接收器和干扰设备放置在智能家居环境中的20个不同位置。我们研究了三种情况，恶意无线电攻击者使用类似WiFi、类似CDMA或类似噪音的信号在整个ZigBee频谱上干扰ZigBee接收器。实验结果表明，与现成的ZigBee接收器相比，我们的原型ZigBee接收器提供了26.7dB（平均）的JMC。结果表明，即使干扰信号比ZigBee信号强20分贝，我们设计的ZigBee接收器也能成功解码ZigBee数据包。

> This article advances the state-of-the-art in the following aspects.
>
> 1. We have proposed a learning-based jamming mitigation method using an optimized neural network, which is capable of decoding ZigBee signal in the presence of unknown interference.
> 2. Based on the learning-based jamming mitigation, we have designed a ZigBee receiver to decode its data packets in the face of malicious jamming attack.
> 3. We have built a prototype of our proposed ZigBee receiver and demonstrated its effectiveness in real-world wireless environments.

这篇文章在以下几个方面推进了最先进的技术。

1. 我们提出了一种基于学习的干扰缓解方法，使用优化的神经网络，能够在未知干扰的情况下对ZigBee信号进行解码。
2. 基于基于学习的干扰缓解方法，我们设计了一个ZigBee接收器，能够在面对恶意干扰攻击时解码其数据包。
3. 我们已经建立了一个我们提出的ZigBee接收器的原型，并在现实世界的无线环境中证明了它的有效性。

## II. RELATED WORK

> We survey the prior research efforts in relevant to our work in the following three domains.

我们调查了与我们的工作相关的以下三个领域的前期研究工作。

<img src="https://img.foopi.top/postpic/image-20210620230516986.webp" alt="image-20210620230516986" style="zoom:50%;" />

> *Jamming and Anti-Jamming in ZigBee:* While the security problems in Wi-Fi and cellular networks have received a large amount of research efforts and produced a large volume of research results (see [19]–[24]), the security problems in ZigBee networks are highly overlooked. This stagnation is reflected by the lack of advances in the design of jamming-resistant ZigBee communications. Table I summarizes the prior work on jamming and anti-jamming attacks in ZigBee communications. Clearly, the existing antijamming schemes are limited to spectrum sharing (DSSS) technique. These schemes would not work when jamming signal is stronger than ZigBee signal at ZigBee receiver.
>
> In contrast, our anti-jamming scheme takes advantage of recent advances in MIMO technology and renders much better ability of securing ZigBee communications in the presence of jamming attack.

**ZigBee中的干扰和反干扰** 虽然Wi-Fi和蜂窝网络的安全问题已经得到了大量的研究工作，并产生了大量的研究成果（见[19]-[24]），但ZigBee网络的安全问题却被高度忽视了。这种停滞不前的现象反映在抗干扰ZigBee通信的设计上缺乏进展。表一总结了之前关于ZigBee通信中干扰和抗干扰攻击的工作。很明显，现有的抗干扰方案仅限于频谱共享（DSSS）技术。当干扰信号在ZigBee接收器处强于ZigBee信号时，这些方案将不起作用。

相比之下，我们的抗干扰方案利用了MIMO技术的最新进展，在干扰攻击的情况下能更好地保护ZigBee通信的安全。

> *Interference Cancellation in ZigBee Coexistence:* Another research line related to this work is interference cancellation in the coexistence of ZigBee. Yang *et al.* [16] and Yan *et al.* [17] proposed WizBee, a coexistence scheme of ZigBee and WiFi, where the ZigBee device has a single antenna. They assumed that Wi-Fi signal is about 5–20-dB stronger than ZigBee signal, and thus employs interference cancellation to mitigate WiFi signal for ZigBee signal detection. This method does not apply to jamming defense because the ZigBee receiver does not have knowledge about the jamming signal. Hou *et al.* [18] studied the vulnerability of ZigBee devices to interference from 802.11 devices and proposed a solution for minimizing interference from 802.11 in ZigBee medical sensors. However, the proposed solutions are limited at the MAC layer and unsuited for jamming defense.

**ZigBee共存中的干扰消除** 与这项工作相关的另一条研究路线是ZigBee共存中的干扰消除。Yang等人[16]和Yan等人[17]提出了WizBee，一种ZigBee和WiFi的共存方案，其中ZigBee设备有一个单天线。他们假设Wi-Fi信号比ZigBee信号强5-20分贝，因此采用干扰消除来减轻WiFi信号对ZigBee信号的检测。这种方法不适用于干扰防御，因为ZigBee接收器不知道干扰信号的情况。Hou等人[18]研究了ZigBee设备对802.11设备干扰的脆弱性，并提出了在ZigBee医疗传感器中尽量减少802.11干扰的解决方案。然而，所提出的解决方案仅限于MAC层，不适合于干扰防御。

> *Learning-Based Interference Management:* Recently, machine learning (ML) becomes popular for wireless networking design, and there are many research results on learning-based interference management [25]–[28]. For example, Begashaw *et al.* [25] studied blind interference alignment (BIA) in wireless networks and proposed two reinforcement learning algorithms for selecting the best antenna configuration for BIA. These works, however, are limited to analytical study. So far, we find no prior work that employs neural network for real-time interference mitigation.

**基于学习的干扰管理** 最近，机器学习（ML）在无线网络设计中变得很流行，并且有许多关于基于学习的干扰管理的研究成果[25]-[28]。例如，Begashaw等人[25]研究了无线网络中的盲目干扰排列（BIA），并提出了两种强化学习算法来选择BIA的最佳天线配置。然而，这些工作仅限于分析研究。到目前为止，我们还没有发现采用神经网络进行实时干扰缓解的前期工作。

## III. PROBLEM DESCRIPTION

### A. Jamming Attack Model

<img src="https://img.foopi.top/postpic/image-20210620232434926.webp" alt="image-20210620232434926" style="zoom:50%;" />

> We consider the ZigBee network, as shown in Fig. 2, where a ZigBee router serves one or multiple ZigBee devices. At one moment, the ZigBee router communicates with a single ZigBee user device. In this network, there is a malicious device that continuously emits jamming signal to disrupt the ZigBee communications, and we have the following assumptions on the jamming attack.
>
> 1. The ZigBee devices have no knowledge about jamming signal, including its bandwidth, waveform, and frame format.
> 2. The bandwidth of jamming signal could be larger than, equal to, or less than the bandwidth of ZigBee signal.
> 3. The waveform of jamming signal may vary over time.

我们考虑如图2所示的ZigBee网络，其中一个ZigBee路由器为一个或多个ZigBee设备服务。在某个时刻，ZigBee路由器与一个ZigBee用户设备进行通信。在这个网络中，有一个恶意设备不断发射干扰信号来破坏ZigBee通信，我们对干扰攻击有以下假设。

1. ZigBee设备对干扰信号一无所知，包括其带宽、波形和帧格式。
2. 干扰信号的带宽可能大于、等于或小于ZigBee信号的带宽。
3. 干扰信号的波形可能随时间变化。

> In real world, some ZigBee devices are not constrained by their physical size and their power consumption while playing a critical role in their applications. For example, many ZigBee-based electronic switches are connected to a main power supply and have a large size. These switches are widely used to control factory equipment and machines. In addition, ZigBee routers, which serve as the Internet gateway for ZigBee users as shown in Fig. 2, are not constrained by their physical size or power consumption. On such ZigBee devices, we can install multiple (two) antennas for radio signal transmission and reception.

在现实世界中，一些ZigBee设备不受其物理尺寸和功耗的限制，同时在其应用中发挥着关键作用。例如，许多基于ZigBee的电子开关被连接到主电源上，并且具有较大的尺寸。这些开关被广泛用于控制工厂设备和机器。此外，如图2所示，作为ZigBee用户的互联网网关的ZigBee路由器，不受其物理尺寸或功耗的限制。在这种ZigBee设备上，我们可以安装多根（两根）天线，用于无线电信号的传输和接收。

> Our objective is to secure the radio communications for the ZigBee devices, that have two or more antennas, against radio jamming attacks. Specifically, for the ZigBee devices that are equipped with two or more antennas, we design an efficient scheme to decode data packets in the presence of unknown interference while not requiring any knowledge of interference.

我们的目标是确保`拥有两根或多根天线的ZigBee设备的无线电通信免受无线电干扰攻击`。具体来说，对于配备有两根或多根天线的ZigBee设备，我们设计了一个有效的方案，在存在未知干扰的情况下对数据包进行解码，而不需要对干扰有任何了解。

### B. Background of ZigBee Communications

> Before presenting our design, we first offer a review of ZigBee PHY and MAC layers, which is essential for understanding of our new ZigBee receiver.

在介绍我们的设计之前，我们首先对ZigBee PHY层和MAC层进行回顾，这对了解我们的新ZigBee接收器至关重要。

<img src="https://img.foopi.top/postpic/image-20210620233539862.webp" alt="image-20210620233539862" style="zoom:50%;" />

> *PHY-Layer Specs:* ZigBee is based on IEEE 802.15.4 standard, which specifies operation in the unlicensed 2.4– 2.4835 GHz (worldwide), 902–928 MHz (North America and Australia), and 868 to 868.6 MHz (Europe) ISM bands. Sixteen channels are allocated in the 2.4-GHz band. These channels are spaced 5-MHz apart, though using only 2 MHz of bandwidth. The radios use direct-sequence spread spectrum (DSSS) coding, and the spectrum-spreading code sequence comprises predefined 32 chips, as specified in Table II. For ZigBee devices working in the 2.4-GHz band, offset quadrature phase-shift keying (O-QPSK) is used. In O-QPSK, two chips are modulated onto the in-phase and q-phase carriers, and the over-the-air data rate is 250-kb/s per channel. For indoor applications at 2.4 GHz, transmission distance ranges from 10 to 20 m, depending on the construction materials, the number of walls to be penetrated, and the output power permitted in that geographical location.

**PHY层** ZigBee基于IEEE 802.15.4标准，该标准规定在非授权的2.4-2.4835 GHz（全球）、902-928 MHz（北美和澳大利亚）和868至868.6 MHz（欧洲）ISM频段上运行。在2.4-GHz频段上分配了16个频道。这些频道间隔为5兆赫，但只使用2兆赫的带宽。无线电设备使用直接序列扩频（DSSS）编码，扩频编码序列由预定的32个码值组成，如表II中规定。对于工作在2.4GHz频段的ZigBee设备，使用了偏移四级相移键控（O-QPSK）。在O-QPSK中，两个码值被调制到同相和q相载波上，空中数据率为每通道250kb/s。对于2.4GHz的室内应用，传输距离为10至20米，取决于建筑材料、需要穿透的墙壁数量以及该地理位置允许的输出功率。

> *MAC Protocols:* The current IEEE 802.15.4 standards [29] support two types of networks: Beacon-enabled and nonbeacon-enabled networks.
>
>  In nonbeacon-enabled networks, CSMA/CA is used for medium access control. In this type of network, at least one ZigBee device keeps its radio receiver active, listening to possible packets from other ZigBee devices; while other ZigBee devices would remain asleep until they are commanded to transmit. The typical example of such a network is a wireless light switch controller: The ZigBee chipset inside a lamp may continuously receive signals, since it is connected to the main supply, while a battery-powered wireless remote controller would remain asleep until the switch is triggered. The remote controller then wakes up to send a command packet to the lamp and returns to sleep after receiving an acknowledgment.
>
> In beacon-enabled networks, the special network nodes called ZigBee routers transmit periodic beacons to announce their presence to the other nodes. Beacon intervals depend on data rate; they may range from 15.4 milliseconds to 251.6 s at 250 Kb/s. Nodes may sleep between beacons, thus lowering their duty cycle and prolonging their battery lifetime.

**MAC协议** 目前的IEEE 802.15.4标准[29]支持两种类型的网络。支持信标的网络和不支持信标的网络。

在非信标启用的网络中，CSMA/CA被用于介质访问控制。在这种类型的网络中，至少有一个ZigBee设备保持其无线电接收器处于活动状态，监听来自其他ZigBee设备的可能的数据包；而其他ZigBee设备将保持睡眠状态，直到它们被命令进行传输。这种网络的典型例子是一个无线灯开关控制器。灯内的ZigBee芯片组可能会持续接收信号，因为它与主电源相连，而电池供电的无线遥控器将保持睡眠状态，直到开关被触发。然后，远程控制器被唤醒，向台灯发送通信数据包，并在收到确认后恢复睡眠。

在支持信标的网络中，被称为ZigBee路由器的特殊网络节点定期发送信标，向其他节点宣布它们的存在。信标间隔取决于数据速率；在250Kb/s时，信标间隔可能从15.4毫秒到251.6秒不等。节点可以在信标之间进行睡眠，从而降低其占空比，延长其电池寿命。

<img src="https://img.foopi.top/postpic/image-20210620235502307.webp" alt="image-20210620235502307" style="zoom:50%;" />

> *ZigBee Frame Structure:* Fig. 3 shows the frame structure of a ZigBee data packet at the physical layer, which comprises three parts: Sync header, PHY header, and PHY payload. Particularly, a ZigBee frame has a preamble in its sync header, which consists of 4 predefined Octets (32 b). The preamble is used by the ZigBee receivers to obtain chip and symbol synchronization for an incoming message. In the standards, the preamble is composed of 32 binary zeros. As we shall see, this preamble plays a key role in our design of jammingresilient ZigBee receiver, which uses the preamble to train an optimized neural network for jamming mitigation

**ZigBee帧结构** 图3显示了物理层的ZigBee数据包的帧结构，它包括三个部分。同步头、PHY头和PHY有效载荷。特别是，ZigBee帧在其同步头中有一个序言，它由4个预定义的八进制（32b）组成。序言被ZigBee接收机用来获得传入信息的码片和符号同步。在标准中，序言是由32个二进制零组成。正如我们将看到的，这个前导码在我们设计的抗干扰ZigBee接收器中起着关键作用，它`使用前导码来训练一个优化的神经网络`来缓解干扰。

<img src="https://img.foopi.top/postpic/image-20210620235911056.webp" alt="image-20210620235911056" style="zoom:50%;" />

> *ZigBee Transmitter Diagram:* Fig. 4 shows the PHY-layer diagram of a conventional ZigBee transmitter and an example of generated O-QPSK signal. As shown in the figure, the bit-to-symbol module first groups every 4 b as a symbol, with its value in the range from 0 to 15. Then, each of the resulting symbols is mapped to a sequence of predefined 32 chips, as specified in Table II. Finally, the sequence chips are OQPSK modulated using half-sine pulse shaping filter, and the resulting I/Q signals are sent for radio frequency transmission.

**ZigBee发射器图** 图4显示了传统ZigBee发射器的PHY层图和一个生成的O-QPSK信号的例子。如图所示，位-符号模块首先将每4个b分组为一个符号，其值在0到15之间。然后，每个结果符号被映射到预定的32个码片的序列中，如表II中规定。最后，使用半正弦脉冲整形滤波器对序列芯片进行O-QPSK调制，并将产生的I/Q信号用于无线电频率传输。

<img src="https://img.foopi.top/postpic/image-20210620233725221.webp" alt="image-20210620233725221" style="zoom:50%;" />

> *ZigBee Receiver Diagram:* Fig. 5 shows the diagram of a conventional ZigBee receiver. The RF front-end module first converts a radio signal to the corresponding baseband signal, followed by a module for energy detection. Then, the analog signal is converted to digital samples using 12× oversampling rate. A matched filter is used to suppress noise and 3× downsample the digital signal. After that, frequency synchronization and timing recovery are performed to decode the chips, which are further used for symbol detection (preamble detection and phase ambiguity elimination). Finally, the decoded chips are despread to estimate the original chips. Similar to other wireless receivers, conventional ZigBee receivers are vulnerable to both jamming attacks and unknown interference.

**ZigBee接收器示意图** 图5显示了一个传统的ZigBee接收器的示意图。射频前端模块首先将无线电信号转换为相应的基带信号，然后是一个能量检测的模块。然后，模拟信号使用12倍的超采样率转换为数字样本。一个匹配的滤波器被用来抑制噪声，并对数字信号进行3倍的下采样。之后，进行频率同步和定时恢复，对码值进行解码，进一步用于符号检测（序言检测和相位模糊的消除）。最后，解码后的码值被解扩以估计原始码值。与其他无线接收器类似，传统的ZigBee接收器很容易受到干扰攻击和未知干扰。

## IV. NEW ZIGBEE RECEIVER DESIGN

> To enable ZigBee communication in the presence of jamming attack, we need a ZigBee receiver that is immune to unknown interference. In what follows, we first describe the basic idea of our design and then present its key components.

为了在干扰攻击的情况下实现ZigBee通信，我们需要一个对未知干扰免疫的ZigBee接收器。在下文中，我们首先描述了我们设计的基本思路，然后介绍其关键组成部分。









