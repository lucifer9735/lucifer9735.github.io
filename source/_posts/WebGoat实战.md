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

距离搭建环境已经过去了六周时间，翻看`.zsh_history`注意到当初输入了这些命令，记录下来以备不时之需。[参考](http://www.zzvips.com/article/87292.html)

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

## Introduction

### WebGoat

> WebGoat is a deliberately insecure application that allows interested developers just like you to *test vulnerabilities* commonly found in **Java-based** applications that use common and popular open source components.
>
> Now, while we in no way condone causing intentional harm to any animal, goat or otherwise, we think learning everything you can about security vulnerabilities is essential to understanding just what happens when even a small bit of unintended code gets into your applications.
>
> What better way to do that than with your very own **scapegoat**?
>
> Feel free to do what you will with him. Hack, poke, prod and if it makes you feel better, scare him until your heart’s content. Go ahead, and hack the goat. We promise he likes it.
>
> Thanks for your interest!

### WebWolf

> Some challenges requires to have a local web server running. WebWolf is for you the attacker it  helps you while solving some of the assignments and challenges within WebGoat. An assignment might for example require you to serve a file or connect back to your own environment or to receive an e-mail. In order to not let you run WebGoat open and connected to the internet we provided these tools in this application, called WebWolf.  

介绍`WebWolf`及其相关功能，有两个小任务用于熟悉。

## General

### HTTP Basics

All HTTP transactions follow the same general format. Each client request and server response has three parts: the request or response line, a header section and the entity body.

The client initiates a transaction as follows:

- The client contacts the server and sends a document request. A GET request can have url parameters and those parameters will be available in the web access logs.
  - GET /index.html?param=value HTTP/1.0
- Next, the client sends optional header information to inform the server of its configuration and the document formats it will accept.
  - User-Agent: Mozilla/4.06 Accept: image/gif,image/jpeg, /
- In a POST request, the user supplied data will follow the optional headers and is not part of the contained within the POST URL.

<img src="https://img.foopi.top/postpic/image-20210530100846519.webp" alt="image-20210530100846519" style="zoom:50%;" />

发送“abc"，返回“cba“，大概是倒序输出字符串的功能。

通过Firefox浏览器自带的开发者工具可以看到，点击按钮”Go!“发出的是`POST`请求。

<img src="https://img.foopi.top/postpic/image-20210530105847952.webp" alt="image-20210530105847952" style="zoom:50%;" />

### HTTP Proxies

A proxy is some forwarder application that connects your http client to backend resources. HTTP clients can be browsers, or applications like curl, SOAP UI, Postman, etc. Usually these proxies are used for routing and getting access to internet when there is no direct connection to internet from the client itself. HTTP proxies are therefore also ideal when you are testing your application. You can always use the proxy log records to see what was actually sent from client to server. So you can check the request and response headers and the XML, JSON or other payload.

HTTP Proxies receive requests from a client and relay them. They also typically record them. They act as a man-in-the-middle. It even works fine with or without HTTPS as long as your client or browser trusts the certificate of the HTTP Proxy.

按步骤配置完`Zap`之后有个小任务——拦截并修改请求：

<img src="https://img.foopi.top/postpic/image-20210530112507755.webp" alt="image-20210530112507755" style="zoom:50%;" />

修改前：

<img src="https://img.foopi.top/postpic/image-20210530123736308.webp" alt="image-20210530123736308" style="zoom:50%;" />

修改后：

<img src="https://img.foopi.top/postpic/image-20210530123503225.webp" alt="image-20210530123503225" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20210530123845533.webp" alt="image-20210530123845533" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20210530123527626.webp" alt="image-20210530123527626" style="zoom:50%;" />

### Developer Tools

<img src="https://img.foopi.top/postpic/image-20210530130827716.webp" alt="image-20210530130827716" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20210530131016177.webp" alt="image-20210530131016177" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20210530131727324.webp" alt="image-20210530131727324" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20210530131832760.webp" alt="image-20210530131832760" style="zoom:50%;" />

### CIA Triad

The CIA Triad (confidentiality, integrity, availability) is a model for information security. The three elements of the triad are considered the most crucial information security components and should be guaranteed in any secure system.

If only one of those three elements can be breached it can have serious consequences for the parties concerned.

The CIA Triad was created to provide a baseline standard for evaluating and implementing security regardless of the underlying system or/and organization.

#### Confidentiality 机密性

Confidentiality is "the property, that information is not made available or disclosed to unauthorized individuals, entities, or processes." In other words, confidentiality means to prevent sensitive information from reaching the wrong people, that should not get access to it, while at the same time making sure, that people that are allowed to access it, can get it.

While being similar to "privacy", these two words are not interchangeable. Rather, confidentiality is a component of privacy that implements to protect our data from unauthorized viewers.

#### Integrity 完整性

Integrity is "the property of accuracy and completeness." In other words, integrity means to maintain the consistency, accuracy and trustworthiness of data over its entire life cycle. Data must not be changed during transit and it must be ensured, that data can not be altered by unauthorized people (per example in a breach of confidentiality).

#### Availability 可用性

Availability is "the property of being accessible and usable on demand by an authorized entity." In other words all the information should be available and accessible for authorized persons whenever it is needed.

<img src="https://img.foopi.top/postpic/image-20210530134218501.webp" alt="image-20210530134218501" style="zoom:50%;" />

### Crypto Basics

#### Encoding 编码

Encoding is not realy cryptography, but it is used a lot in all kinds of standards around cryptographic functions. 

##### Base64 Encoding

Base64 encoding is a technique used to transform all kinds of bytes to a specific range of bytes. This specific range is the ASCII readable bytes. This way you can transfer binary data such as secret or private keys more easily. You could even print these out or write them down. Encoding is also reversible. So if you have the encoded version, you can create the original version.

On wikipedia you can find more details. Basically it goes through all the bytes and transforms each set of 6 bits into a readable byte (8 bits). The result is that the size of the encoded bytes is increased with about 33%.

```
Hello ==> SGVsbG8=
0x4d 0x61 ==> TWE=
```

##### Basic Authentication

Basic authentication is sometimes used by web applications. This uses base64 encoding. Therefore, it is important to at least use Transport Layer Security (TLS or more commonly known as https) to protect others from reading the username password that is sent to the server.

```shell
➜ ~ echo -n "myuser:mypassword" | base64
bXl1c2VyOm15cGFzc3dvcmQ=
```

The HTTP header will look like:

```
Authorization: Basic bXl1c2VyOm15cGFzc3dvcmQ=
```

<img src="https://img.foopi.top/postpic/image-20210530141104763.webp" alt="image-20210530141104763" style="zoom:50%;" />

```shell
➜ ~ python3
Python 3.9.5 (default, May 4 2021, 03:36:27)
[Clang 12.0.0 (clang-1200.0.32.29)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import base64
>>> str = 'Zm9vd2ViZ29hdDphZG1pbg=='
>>> base64.decodebytes(str.encode('utf8'))
b'foowebgoat:admin'
```

##### HTML encoding

HTML encoding is used a lot when sending form data and request parameters to the server. Since spaces are not allowed in a URL, this is then replaced by %20.

##### UUEncode

The Unix-2-Unix encoding has been used to send email attachments.

##### XOR encoding

Sometimes encoding is used as a first and simple obfuscation technique for storing passwords. IBM **WebSphere** Application Server e.g. uses a specific implementation of XOR encoding to store passwords in configuration files. IBM recommends to protect access to these files and to replace the default XOR encoding by your own custom encryption. However when these recommendations are not followed, these defaults can become a vulnerability.

<img src="https://img.foopi.top/postpic/image-20210530141519598.webp" alt="image-20210530141519598" style="zoom:50%;" />

[WebSphere Password Decoder](http://www.poweredbywebsphere.com/decoder.html)

<img src="https://img.foopi.top/postpic/image-20210530142812472.webp" alt="image-20210530142812472" style="zoom:50%;" />



#### Hashing 哈希散列

##### Plain Hashing

Hashing is a type of cryptography which is mostly used to detect if the original data has been changed. A hash is generated from the original data. It is based on irreversible cryptographic techniques. If the original data is changed by even one byte, the resulting hash is also different.

So in a way it looks like a secure technique. However, it is NOT and even NEVER a good solution when using it for passwords. The problem here is that you can generate passwords from dictionaries and calculate all kinds of variants from these passwords. For each password you can calculate a hash. This can all be stored in large databases. So whenever you find a hash that could be a password, you just look up the hash in the database and find out the password.

Some hashing algorithms should no longer be used: MD5, SHA-1 For these hashes it is possible to change the payload in such a way that it still results in the same hash. This takes a lot of computing power, but is still a feasible option.

##### Salted Hashes

Plain passwords should obviously not be stored in a database. And the same goes for plain hashes. The [OWASP Password Storage Cheat Sheet](https://owasp.org/www-project-cheat-sheets/cheatsheets/Password_Storage_Cheat_Sheet.html) explains what should be used when password related information needs to be stored securely.

<img src="https://img.foopi.top/postpic/image-20210530143635282.webp" alt="image-20210530143635282" style="zoom:50%;" />

[Free Password Hash Cracker](https://crackstation.net/)

[CMD5](https://cmd5.com/)

#### Encryption 加密

##### HTTPS uses both symmetric and asymmetric keys

Here is a short description of what happens if you open your browser and go to an https site.

- Your browser connects to the server and gets the webserver certificate.
- Your browser checks if it trusts the certificate issuer by checking if the issuer certificate is in its trust store. This trust store is managed by operating system and browser updates. And on some corporate networks it is managed by the company. From the certificate the browser obtains the public key.
- The browser now generates random bytes to be used to generate a symmetric key and encrypts this with the public key of the server. So only the server can decrypt it.
- At the end of this process both the browser and the webserver will use the exchanged symmetric key (in the asymmetric key exchange process) to encrypt and decrypt messages that are sent back and forth between the browser and the webserver.

Symmetric keys are used because they can be used more safely for **large amounts of data**.

#### Signing 签名

A signature is a hash that can be used to check the validity of some data. The signature can be supplied separately from the data that it validates, or in the case of CMS or SOAP can be included in the same file. (Where parts of that file contain the data and parts contain the signature).

Signing is used when integrity is important. It is meant to be a guarantee that data sent from A to B was not altered. So A signs the data by calculating the hash of the data and encrypting that hash using an asymmetric private key. B can then verify the data by calculating the hash of the data and decrypting the signature to compare if both hashes are the same.

##### RAW signatures

A raw signature is usually calculated as follows:

- create a hash of the data (e.g. SHA-256 hash)
- encrypt the hash using an asymmetric private key (e.g. RSA 2048 bit key)
- (optionally) encode the binary encrypted hash using base64 encoding

B will have to get the certificate with the public key as well. This might have been exchanged before. So at least 3 files are involved: the data, the signature and the certificate.

##### CMS signatures

A CMS signature is a standardized way to send data + signature + certificate with the public key all in one file from A to B. As long as the certificate is valid and not revoked, B can use the supplied public key to verify the signature.

##### SOAP signatures

A SOAP signature also contains data and the signature and optionally the certificate. All in one XML payload. There are special steps involved in calculating the hash of the data. This has to do with the fact that the SOAP XML sent from system to system might introduce extra elements or timestamps. Also, SOAP Signing offers the possibility to sign different parts of the message by different parties.

##### Email signatures

Sending emails is not very difficult. You have to fill in some data and send it to a server that forwards it, and eventually it will end up at its destination. However, it is possible to send emails with a FROM field that is not your own email address. In order to guarantee to your receiver that you really sent this email, you can sign your email. A trusted third party will check your identity and issue an email signing certificate. You install the private key in your email application and configure it to sign emails that you send out. The certificate is issued on a specific email address and all others that receive this email will see an indication that the sender is verified, because their tools will verify the signature using the public certificate that was issued by the trusted third party.

##### PDF or Word or other signatures

Adobe PDF documents and Microsoft Word documents are also examples of things that support signing. The signature is also inside the same document as the data so there is some description on what is part of the data and what is part of the metadata. Governments usually send official documents with a PDF that contains a certificate.

<img src="https://img.foopi.top/postpic/image-20210530145906704.webp" alt="image-20210530145906704" style="zoom:50%;" />

```shell
$ cat private 
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCCfrb7kcC8GTFhh+bO5UR0R8abZ3zdOG4gSiIDaAZYhg4DE5HDdJ6xAKyt5YhF4SRZrdr2H01J+XaIldViMWJM8avJnUbVCp0nSH7ituwYO+Zof9N0k/C3mG+cl5LU/BdKBgCzFZDRnyVeKZ7dwgwJWOJNdYLzORiWgoevSYVp9ojLyeZp8pbHkqQoQWda+ws75YI1RYETRqLeJGOIXpPmCB6RZpXr2nBhjjCnoxwCiXHKVu6fecapE+dKGuA128b1cgdUHDRL0+zIQXZvt9dXED48z0+uegsIk4HoOzRCdQst1phMYwoZ/OVSELgDrM8xSgPgTrnsI1WafjVVsUX1AgMBAAECggEAOgK2uZMLyRKx/xd5JZSKH98gjUkuGvHREw2hnT4LRCMj634xmGApg6o3GX8mW1pA3JUK98rmgvIhHYruNx6ZAneU1KXULTTws9vofESxI/zM6ruYdwSlSBi91TEUlxYSDFgqy3HU1TsYU4nRE+gFjcozoBeTRSimo5IXW3cllfrW/NZVPyCLDORoAPXb6259hnh7fb5uu6+bbrg3I5HCPwWpmkySktGIwFJRal9k13UHujvfb/Zud4Xp7Oyfp1FBgLwKhZKQDv0H7ZUD82uvdIQ2oeeGk1govAr1qPr31FxzvnVCabfM4M6aRVlAXONhmt2nOh4vEMPHzc7u0NXiaQKBgQD2WQxsR/Spe5+D+/e6nIcwetih1o7IOTDhuvlWWF2/NDmT8H9OK/Uem29ODbWyvMAf/Tq5goDHyxUn4BPt+MKH7/uM7/Bm1rIGoMiLsfwU6oJLAEwjucGvTTo7EY+8TpTnKSyjBWt6JO4VJ3vlOxm7dDIjebLusyATrQVgEfJlLwKBgQCHm5+HweG4GvDQzATP7ur/YyuLGV4XpRQytw5jvb86lOF/kyi30vrr7xx/VmIt+HZKKbp/xNKguUwc+HoV95Fo5nLhyEfNF6obWF9VV0xHtAfeRQRNDsIg9nPi5VsqfhMjsaK6QVdsT9l7+Enxd2cRSy9xQ9o5R7b2xHKou/aGGwKBgQCgP/0c0xIMziZOLTJRalFm8ALMBE6NYOazcHWR/Zm+L7Lk0aV+rImfh204USLJSo+QP6Jb2tD7Jth0QAe23gNtemcgn1S7ER5twVmzxew9ju+C6oadFtEvwAUJN7tQu62RUe9/fJ8VrcBScoTd8Twj/MpA2YHUVSGgqwS8IfCUcQKBgBm+p8jEPDARnUpmkTtQpniZwTiFNmHSy0Tdj/PLoDRk83Ke44oSmeSU3pomMjl8BCkMRwXevgYZZ6PQYI0vFQIPThwjQ85iAb9zRZYUHr02JpBCFhDzDlPnthSLaoVkrgmGvdgSc6BygF2Sw6b9/ilAVt9v/EwHm2q53PK/zIulAoGBAMeLnZXXJWV7XJMc/qDse/dhYEHt9W50cMSndA4WcAADTSWDNQ3ef2TQ+wcZZqeaCa30Kk7yTH8wkm5bWiaL5sXa+hwf3ilspiqkH4zeh402kKyIkHw4xdNPardtKpvAIJAwBrp/avsLcPVQNX6p1yeFknYAzUYYcD7qHrIOPtZC
-----END PRIVATE KEY-----

$ openssl rsa -in private -pubout > public
$ cat public 
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgn62+5HAvBkxYYfmzuVE
dEfGm2d83ThuIEoiA2gGWIYOAxORw3SesQCsreWIReEkWa3a9h9NSfl2iJXVYjFi
TPGryZ1G1QqdJ0h+4rbsGDvmaH/TdJPwt5hvnJeS1PwXSgYAsxWQ0Z8lXime3cIM
CVjiTXWC8zkYloKHr0mFafaIy8nmafKWx5KkKEFnWvsLO+WCNUWBE0ai3iRjiF6T
5ggekWaV69pwYY4wp6McAolxylbun3nGqRPnShrgNdvG9XIHVBw0S9PsyEF2b7fX
VxA+PM9PrnoLCJOB6Ds0QnULLdaYTGMKGfzlUhC4A6zPMUoD4E657CNVmn41VbFF
9QIDAQAB
-----END PUBLIC KEY-----

$ openssl rsa -in public -pubin -modulus -noout > modulus_pub
$ cat modulus_pub 
Modulus=827EB6FB91C0BC19316187E6CEE5447447C69B677CDD386E204A2203680658860E031391C3749EB100ACADE58845E12459ADDAF61F4D49F9768895D56231624CF1ABC99D46D50A9D27487EE2B6EC183BE6687FD37493F0B7986F9C9792D4FC174A0600B31590D19F255E299EDDC20C0958E24D7582F33918968287AF498569F688CBC9E669F296C792A42841675AFB0B3BE5823545811346A2DE2463885E93E6081E916695EBDA70618E30A7A31C028971CA56EE9F79C6A913E74A1AE035DBC6F57207541C344BD3ECC841766FB7D757103E3CCF4FAE7A0B089381E83B3442750B2DD6984C630A19FCE55210B803ACCF314A03E04EB9EC23559A7E3555B145F5

$ echo -n "827EB6FB91C0BC19316187E6CEE5447447C69B677CDD386E204A2203680658860E031391C3749EB100ACADE58845E12459ADDAF61F4D49F9768895D56231624CF1ABC99D46D50A9D27487EE2B6EC183BE6687FD37493F0B7986F9C9792D4FC174A0600B31590D19F255E299EDDC20C0958E24D7582F33918968287AF498569F688CBC9E669F296C792A42841675AFB0B3BE5823545811346A2DE2463885E93E6081E916695EBDA70618E30A7A31C028971CA56EE9F79C6A913E74A1AE035DBC6F57207541C344BD3ECC841766FB7D757103E3CCF4FAE7A0B089381E83B3442750B2DD6984C630A19FCE55210B803ACCF314A03E04EB9EC23559A7E3555B145F5" | openssl dgst -sign private -sha256 | base64 > tmp
$ cat tmp 
G4fvlou0CBkK7mg0VmMlDux/p71UDZKEhEIVU1nMgbqUH5gDXHnM+CWnG7iKfKLQYzF0Bx9s4fLv
VcDCcGc7H9LMx5LpcEkTC30dmKc3uhBN18sdWUl4BaYD4xQkZKlmkc084yccIxtE4RSBe3tDKdkK
Xz35W/FGI9xmea0IJleG7xpUiwRX1ClI8nWhS4O2MWMaXGnwwcmnli0XXpsqKurUy44Cim8RCje+
4tnWQqoeEKRKxmvk9k6gEgt5QXjon37BJykyGI+p+XEXLNVHUY8aFEOm3ogkYq1kGzk9u30NhdRk
umGHQOISafbHP+z07+WjS0cL3oM8rMdpp9QmMQ==

$ python
Python 3.8.10 (default, May 4 2021, 00:00:00) 
[GCC 10.2.1 20201125 (Red Hat 10.2.1-9)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> with open('tmp','r') as f: tmp = f.readlines()
>>> tmp
['G4fvlou0CBkK7mg0VmMlDux/p71UDZKEhEIVU1nMgbqUH5gDXHnM+CWnG7iKfKLQYzF0Bx9s4fLv\n', 'VcDCcGc7H9LMx5LpcEkTC30dmKc3uhBN18sdWUl4BaYD4xQkZKlmkc084yccIxtE4RSBe3tDKdkK\n', 'Xz35W/FGI9xmea0IJleG7xpUiwRX1ClI8nWhS4O2MWMaXGnwwcmnli0XXpsqKurUy44Cim8RCje+\n', '4tnWQqoeEKRKxmvk9k6gEgt5QXjon37BJykyGI+p+XEXLNVHUY8aFEOm3ogkYq1kGzk9u30NhdRk\n', 'umGHQOISafbHP+z07+WjS0cL3oM8rMdpp9QmMQ==\n']
>>> print(''.join(tmp).replace('\n',''))
G4fvlou0CBkK7mg0VmMlDux/p71UDZKEhEIVU1nMgbqUH5gDXHnM+CWnG7iKfKLQYzF0Bx9s4fLvVcDCcGc7H9LMx5LpcEkTC30dmKc3uhBN18sdWUl4BaYD4xQkZKlmkc084yccIxtE4RSBe3tDKdkKXz35W/FGI9xmea0IJleG7xpUiwRX1ClI8nWhS4O2MWMaXGnwwcmnli0XXpsqKurUy44Cim8RCje+4tnWQqoeEKRKxmvk9k6gEgt5QXjon37BJykyGI+p+XEXLNVHUY8aFEOm3ogkYq1kGzk9u30NhdRkumGHQOISafbHP+z07+WjS0cL3oM8rMdpp9QmMQ==
```

#### Keystores

A keystore is a place where you store keys. Besides **keystore** the term **truststore** is also used frequently. A truststore is the same thing as a keystore. Only it usually contains only the certificates (so basically only public keys and issuer information) of trusted certificates or certificate authorities.

##### File based keystores

A file based keystore is something that in the end has the keys on a file system. Storing public certificates in a file based keystore is very common.

##### Database keystores

Keys and especially public certificates can of course also be stored in a database.

##### Hardware keystore

A hardware keystore is a system that has some sort of hardware which contain the actual keys. This is typically done in high end security environments where the private key is really private. In comparison with file based or database keystores, it is impossible to make a copy of the keystore to send it to some unknown and untrusted environment.

Some certificate authorities that are used to provide you with a server certificate for your website, also create the private keys for you (as-a-service). However, it is by definition no longer considered a private key. For all keystore types, you should keep the private key private and use a certificate signing request to order your signing or server certificates.

##### Managed keystores in operating system, browser and other applications

When you visit a website and your browser says that the certificates are fine, it means that the certificate used for the website is issued by a trusted certificate authority. But this list of trusted certificate authorites is managed. Some CA’s might be revoked or removed. These updates happen in the background when browser updates are installed. Not only the browser maitains a list of trusted certificate authorities, the operation system does so as well. And the Java runtime also has its own list which is kept in the cacerts file. Updates of the OS and Java JRE keep this list up to date. In coporate environments, these are usually maintained by the company and also contain company root certificates.

##### Extra check for website certificates using DNS CAA records

Some companies inspect all or most internet traffic. Even the ones were you think you have an end-2-end secured connection. This works as follows. An employee opens a browser and googles some information. The browser will use https and go to the site of google. The link looks real and the lock is shown in the browser. However, if you would inspect the certificate, you might notice that it has been issued by one of your companies root CA’s! So you have established an end-2-end secure connection with a server of your company, and that server has the secure connection with google. In order to prevent such man in the middle connections to your server, modern browsers now will also check the DNS CAA records to see whether or not a certain issuer is allowed for a certain website. More information: [Wiki DNS CAA](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization)

##### Free certificates from Let’s encrypt

[Let’s encrypt](https://letsencrypt.org) is a free, automated and open Certificate Authority. It allows you to create valid certificates for the websites that you control. By following and implementing a certain protocol, your identity is checked and a certificate will be issued. The certificates are free of charge and this is done to stimulate the use of authorised certificates and to lower the use of self-signed certificates on the internet. Certificates are valid for 90 days, so they need to be automatically renewed. (Which makes sure that the proof of identity/ownership also takes place frequently)

#### Security defaults 安全默认配置

A big problem in all kinds of systems is the use of default configurations. E.g. default username/passwords in routers, default passwords for keystores, default unencrypted mode, etc.

##### Java cacerts

Did you ever **changeit**? Putting a password on the cacerts file has some implications. It is important when the trusted certificate authorities need to be protected and an unknown self signed certificate authority cannot be added too easily.

##### Protecting your id_rsa private key

Are you using an ssh key for GitHub and or other sites and are you leaving it unencrypted on your disk? Or even on your cloud drive? By default, the generation of an ssh key pair leaves the private key unencrypted. Which makes it easy to use and if stored in a place where only you can go, it offers sufficient protection. However, it is better to encrypt the key. When you want to use the key, you would have to provide the password again.

##### SSH username/password to your server

When you are getting a virtual server from some hosting provider, there are usually a lot of not so secure defaults. One of which is that ssh to the server runs on the default port 22 and allows username/password attempts. One of the first things you should do, is to change the configuration that you cannot ssh as user root, and you cannot ssh using username/password, but only with a valid and strong ssh key. If not, then you will notice continuous brute force attempts to login to your server.

<img src="https://img.foopi.top/postpic/image-20210530160817646.webp" alt="image-20210530160817646" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20210530161427774.webp" alt="image-20210530161427774" style="zoom:50%;" />

```shell
$ docker run --name secret webgoat/assignments:findthesecret -d
$ docker exec -it secret bash
webgoat@90f7ab090b01:/$ ls
bin boot dev docker-java-home etc home lib lib64 media mnt opt proc root run sbin srv sys tmp usr var
webgoat@90f7ab090b01:/$ cd /root
bash: cd: /root: Permission denied
webgoat@90f7ab090b01:/$ exit
```

求助万能的网络，找到的解法是在容器外修改`/etc/shadow`内`root`用户对应的密码。

图书馆四楼大厅真的热，稍有烦躁，自行尝试了偏方：无密码登陆，居然成了。

```shell
$ docker cp secret:/etc/shadow .
$ vim shadow 
root::17918:0:99999:7:::			#去掉 root:*:17918:0:99999:7::: 中密码列的星号
daemon:*:17918:0:99999:7:::			#省略
$ docker cp ./shadow secret:/etc/shadow
$ docker exec -it secret bash
webgoat@90f7ab090b01:/$ cd /root
bash: cd: /root: Permission denied
webgoat@90f7ab090b01:/$ sudo cd /root
bash: sudo: command not found
webgoat@90f7ab090b01:/$ su
root@90f7ab090b01:/# cd /root
root@90f7ab090b01:~# ls
default_secret
root@90f7ab090b01:~# cat default_secret 
ThisIsMySecretPassw0rdF0rY0u
root@90f7ab090b01:~# echo "U2FsdGVkX199jgh5oANElFdtCxIEvdEvciLi+v+5loE+VCuy6Ii0b+5byb5DXp32RPmT02Ek1pf55ctQN+DHbwCPiVRfFQamDmbHBUpD7as=" | openssl enc -aes-256-cbc -d -a -kfile default_secret 
Leaving passwords in docker images is not so secure
```

#### Post quantum crypto

Quantum computers are here and getting more power in available qubits each year. Quantum computers are and will be capable of decrypting information that was encrypted with algorithms that were thought to be safe. For some years now, a lot of encrypted communicatation using quantum vulnerable cryptoraphy is being recorded. This information will be decrypted when the quantum computers are powerful enough. Even tough the information may be old, it still could contain valuable information that can be misused. Besides the fact that some private information will be known to parties it was not intended for.

Mathematics has answers for the post quantum era. New cryptography is already available and should be used NOW in order to minimize threads. You can read more on this on Wikipedia [Post quatum on Wikipedia](https://en.wikipedia.org/wiki/Post-quantum_cryptography)

## Injection

### SQL Injection (intro)

