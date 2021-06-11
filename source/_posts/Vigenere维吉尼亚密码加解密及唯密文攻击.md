---
title: Vigenere维吉尼亚密码加解密及唯密文攻击
abbrlink: '314e2427'
date: 2021-05-14 13:51:36
tags: python
categories:
  - [想要毕业, 密码学进展]
description: 实验报告
cover:
katex:
---

代码详见 [**vigenere**](https://github.com/lucifer9735/vigenere)

>

## 实验目的

1. 掌握Python语言中的字符串，列表，字典，元组的使用; 
2. 熟练Python语言中的条件语句和循环语句;
3.  掌握Python语言中函数的定义和使用;
4. 理解维吉尼亚密码加解密过程;
5. 理解卡西斯基试验以及如何进行频率分析。

## 实验内容

1. 编程实现维吉尼亚密码加解密过程。
2. 破解输入的维吉尼亚密文。

## 实验原理和步骤

维吉尼亚密码是使用一系列凯撒密码组成密码字母表的加密算法，属于多表密码的一种简单形式。

为了生成密码，需要使用表格法。这一表格包括了26行字母表，每一行都由前一行向左偏移一位得到。 具体使用哪一行字母表进行编译是基于密钥进行的，在过程中会不断地变换。

表格中，第一行代表原文的字母，下面每一横行代表原文分别由哪些字母代替(也就是说每一行代表一 套凯撒密码加密方法)，每一竖列代表我们要用第几套字符来替换原文。一共26个字母，26套代替法， 所以这个表是一个26*26的表。

<img src="https://img.foopi.top/postpic/Vigenère_square.svg" alt="Vigenère_square" style="zoom:50%;" />

## 第一部分:维吉尼亚密码加解密

明文:"Common sense is not so common." 

密钥:"PIZZA"

密文:"Rwlloc admst qr moi an bobunm."

说明:表格中的字母都是大写，在输入输出时可以进行大小写转换，使得加解密前后明文和密文相同位置的字母大小写一致。

### 编码实现维吉尼亚密码加解密过程

```python
# 维吉尼亚密码加解密过程
import string
from itertools import cycle
# 代码写在这里
def encrypt(message, key):
    tmp_text = ''
    keylen = len(key)
    tmp_key = key.upper()
    i = 0
    for c in message:
        if not c.isalpha():
            tmp_text += c
        else:
            if c.isupper(): a = 'A'
            else: a = 'a'
            tmp_text += chr(ord(a)+((ord(c)-ord(a)) + (ord(tmp_key[i])-ord('A')))% 26)
            i += 1
            if i == keylen: i = 0
    return tmp_text

def decrypt(message, key):
    tmp_text = ''
    keylen = len(key)
    tmp_key = key.upper()
    i = 0
    for c in message:
        if not c.isalpha():
            tmp_text += c
        else:
            if c.isupper(): a = 'A'
            else: a = 'a'
            tmp_text += chr(ord(a)+((ord(c)-ord(a)) - (ord(tmp_key[i])-ord('A')))% 26)
            i += 1
            if i == keylen: i = 0
    return tmp_text

# 测试
def main():
    message = 'Common sense is not so common.'
    key = 'PIZZA'

    cipher_text = encrypt(message, key)
    decrypted_text = decrypt(cipher_text, key)

    print("加密前的文本是:", message)
    print("加密后的文本是:", cipher_text)
    print("解密后的文本是:", decrypted_text)

if __name__ == '__main__':
    main()
```

```
加密前的文本是: Common sense is not so common.
加密后的文本是: Rwlloc admst qr moi an bobunm.
解密后的文本是: Common sense is not so common.
```

## 第二部分:维吉尼亚唯密文攻击

明文中相同字符加密后可能为不同字符;真实情况下，只有密文，没有密钥，怎么破解维吉尼亚密码呢?

### 卡西斯基试验(Kasiski Examination)

Charles Babbage被认为破解了维吉尼亚密码，但是他没有公布结果。后来他的方法被20世纪初期的数学家卡西斯基公布出来，所以该方法就叫做卡西斯基试验。

在破解维吉尼亚密文时，我们不知道密钥长度。但是，我们知道其实密钥也就一个，密钥像滑窗一样进行加密。由于英文有很多重复的单词，比如the等等，这时候如果我们在一串密文中发现两段相同的字符 串，两者之间的距离很有可能就是密钥的长度。我们多发现几段相同的字符串，求它们之间间隔的**因数** 就可以大致确定密钥长度。知道密钥长度之后，维吉尼亚密码退化成为一个移位密码，可以用破解凯撒 密码的方式去破解它。

#### 从密文中找出拼写完全相同的字符串;数这些相同的字符串中间间隔的字母数

举例:

- **密文如下**:"Ppqca xqvekg ybnkmazu ybngbal jon i tszm jyim. Vrag voht vrau c tksg. Ddwuo xitlazu vavv raz c vkb qp iwpou."
- **移除非字母字符并转换为大写之后**，得到 PPQCAXQVEKGYBNKMAZUYBNGBALJONITSZMJYIMVRAGVOHTVRAUCTKSGDDWUOXITLAZUV AVVRAZCVKBQPIWPOU
- 发现**VRA**, **AZU**, and **YBN** 是重复序列 
- PPQCAXQVEKGYBNKMAZUYBNGBALJONITSZMJYIM**VRA**GVOHT**VRA**UCTKSGDDWUOXITLAZUVAV**VRA**ZCVKBQPIWPOU
- PPQCAXQVEKGYBNKM**AZU**YBNGBALJONITSZMJYIMVRAGVOHTVRAUCTKSGDDWUOXITL**AZU**VAVVRAZCVKBQPIWPOU
- PPQCAXQVEKG**YBN**KMAZU**YBN**GBALJONITSZMJYIMVRAGVOHTVRAUCTKSGDDWUOXITLAZUVAVVRAZCVKBQPIWPOU
- **找到序列之间的间距**:
  - 第一个和第二个 VRA 序列之间间隔8个字母; 
  - 第二个和第三个 VRA 序列之间间隔24个字母;
  - 第一个和第三个 VRA 序列之间间隔32个字母; 
  - 第一个和第二个 AZU 序列之间间隔48个字母; 
  - 第一个和第二个 YBN 序列之间间隔8个字母。

```python
def find_repeat_sequences_spacings(message):
    """
    参数:message，是一个字符串
    功能:遍历message，找到3到5个字母长度的重复序列
    返回值:一个字典，键是序列，值是序列间隔列表(重复序列之间间隔的字母数)
    """
    # 代码如下  
    # 预处理字符串    
    tmp_text = pre_treatment(message)
    # 生成重复序列间隔字典
    dic = dict()
    # 查找3-5位字母长度的重复序列
    for strlen in range(3,6):
        for i in range(0,len(tmp_text)-2*strlen+1):
            tmp_str = tmp_text[i:i+strlen]
            tmp_count = tmp_text.count(tmp_str)
            if tmp_count > 1:
                if tmp_str not in dic.keys():
                    last = tmp_text.find(tmp_str)
                    find_list = [last]
                    for j in range(1,tmp_count):
                        now = tmp_text.find(tmp_str,last+strlen)
                        find_list.append(now)
                        last = now
                    spacing_list = []
                    listlen = len(find_list)
                    for j in range(0,listlen-1):
                        for k in range(j+1,listlen):
                            spacing_list.append(find_list[k]-find_list[j])
                    dic[tmp_str] = spacing_list
        
    return(dic)   
```

```python
# 测试
ciphertext = "Ppqca xqvekg ybnkmazu ybngbal jon i tszm jyim. Vrag voht vrau c tksg. Ddwuo xitlazu vavv raz c vkb qp iwpou."
print(find_repeat_sequences_spacings(ciphertext))
```

```
{'YBN': [8], 'AZU': [48], 'VRA': [8, 32, 24]}
```

#### 找到间隔之间的因数

- 8的因数是2,4,8
- 24的因数是2,3,4,6,8,12,24
- 32的因数是2,4,8,16,32
- 48的因数是2,3,4,6,8,12,16,24,48

**次数出现最多的几个因数极有可能就是密钥字符串的长度**，即2,4,8,3,6,12

```python
def get_useful_factors(num):
	  """返回num的因子列表"""
    factors_list = []
    for i in range(2,math.isqrt(num)+1):
        if num % i == 0:
            factors_list.append(i)
            j = num//i
            if i != j:
                factors_list.append(j)
    factors_list.sort()
    
    return(factors_list)
```

```python
# 测试
print(get_useful_factors(24))
```

```
[2, 3, 4, 6, 8, 12]
```

编程计算每个因子出现的次数，按照出现次数从大到小排序，得到一个因子列表，这些因子就是可能的密钥长度

```python
# 编程找到可能的密钥长度
def get_possible_keylen(message):
    tmp_dic = find_repeat_sequences_spacings(message)
    dic_fac =  dict()
    for i in tmp_dic:
        for j in tmp_dic[i]:
            tmp_fac = get_useful_factors(j)
            for k in tmp_fac:
                if k not in dic_fac:
                    dic_fac[k] = 1
                else:
                    dic_fac[k] += 1
    list_fac = []
    for i in sorted(dic_fac.items(), key=lambda x:(-x[1],x[0])):
        # print(i)
        list_fac.append(i[0])
    
    return(list_fac)
```

```python
# 测试
ciphertext = 'Ppqca xqvekg ybnkmazu ybngbal jon i tszm jyim. Vrag voht vrau c tksg. Ddwuo xitlazu vavv raz c vkb qp iwpou.'
print(get_possible_keylen(ciphertext))
```

```
[2, 4, 8, 3, 6, 12, 16, 24]
```

#### 将密文字符串按照密钥长度分组，并获取每组中第N个字母

**假设密钥长度为4**，将密文按每4个字母为一组分开, 提取字母:

- 从第1个字母开始0,4,8，..,从第2个字母开始1,5,9,...,从第3个字母开始2,6,10,...,从第4个字母开始 3,7,11,...这样提取到4个字符串，对这4个字符串按照破解凯撒加密密文进行频率分析，计算分数。
-   如果我们从卡西斯基试验猜测是正确的，那么密钥的第一个字母对明文加密得到的就是第一个字符串;密钥的第二个字母对明文加密得到的就是第二个字符串;以此类推。
- 得到的字符串分别为:
  - 从第1个字母开始得到:PAEBABANZIAHAKDXAAAKIU
  - 从第2个字母开始得到:PXKNZNLIMMGTUSWIZVZBW
  - 从第3个字母开始得到:QQGKUGJTJVVVCGUTUVCQP
  - 从第4个字母开始得到:CVYMYBOSYRORTDOLVRVPO

```python
def get_nth_subkeys_letters(n,key_length,message):
  	"""将message按照key_length长度分组，每个分组中第n个字母拿出来
  	getNthSubkeysLetters(1, 3, 'ABCABCABC') returns 'AAA'
  	getNthSubkeysLetters(2, 3, 'ABCABCABC') returns 'BBB'
  	getNthSubkeysLetters(3, 3, 'ABCABCABC') returns 'CCC'
  	getNthSubkeysLetters(1, 5, 'ABCDEFGHI') returns 'AF'
  	"""
    # 预处理字符串    
    tmp_text = pre_treatment(message)
    tmp_str = ''
    i = 0
    for c in tmp_text:
        if i % key_length == n-1:
            tmp_str += c
        i += 1

    return(tmp_str)
```

```python
# 测试
ciphertext = "Ppqca xqvekg ybnkmazu ybngbal jon i tszm jyim. Vrag voht vrau ctksg. Ddwuo xitlazu vavv raz c vkb qp iwpou."
for i in range(1,5):
    print(get_nth_subkeys_letters(i,4,ciphertext))
```

```
PAEBABANZIAHAKDXAAAKIU
PXKNZNLIMMGTUSWIZVZBW
QQGKUGJTJVVVCGUTUVCQP
CVYMYBOSYRORTDOLVRVPO
```

#### 对上面得到的字符串用频率分析破解得到密钥中的每个字母

假设子密钥从26个字母中选取，然后对上面的每个字符串进行解密，并计算分数，选取分数最高的几个，就是可能的子密钥。

- 第1个字符串最可能的子密钥是:A, I, N, W
- 第2个字符串最可能的子密钥是:I, Z, A, E
- 第3个字符串最可能的子密钥是:C, G, H, I
- 第4个字符串最可能的子密钥是:K, N, R, V

然后用暴力破解，对这些子密钥进行组合，共有4*4*4*4=256种可能性。

##### 频率分析

英语字母表有26个字母，但是每个字母在英语文本中出现的频率不一样。按照出现频率从高到低排序为 **ETAOINSHRDLCUMWFGYPBVKJXQZ**。

在明文和密文中计算字母总数和它们出现的频率称为**频率分析**。 

当我们需要破解维吉尼亚密码时，我们不能再分析单词，因为密文中的单词可能是多个子密钥加密的，相应地我们要分析每个子密钥的加密文本的字母频率。 

我们设置一个频率匹配分数score，初值为0，计算过程如下:

- 计算密文中每个字母出现的频率，从高到低排序
- 计算前6个字母和后6个字母是否出现在ETAOIN的前6个字母处和后6个字母处
- 出现score就加1，这样score取值是0-12。

一段密文如下:“I rc ascwuiluhnviwuetnh,osgaa ice tipeeeee slnatsfietgi tittynecenisl. e fo f fnc isltn sn o a yrs sd onisli ,l erglei trhfmwfrogotn,l stcofiit.aea wesn,lnc ee w,l eIh eeehoer ros iol er snh nl oahsts ilasvih tvfeh rtira id thatnie.im ei-dlmf i thszonsisehroe, aiehcdsanahiec gv gyedsB affcahiecesd d lee onsdihsoc nin cethiTitx eRneahgin r e teom fbiotd n ntacscwevhtdhnhpiwru”

统计字母出现频率，从高到低排序如下:EISNTHAOCLRFDGWVMUYBPZXQJK。前6个字母出现了 E,I,N,T, 后6个字母出现了K,J,X,Q,Z, 所以分数是9。

```python
# 英语字母频率
def freq_match_score(message):
	  """
	  将message中字符按照频数从高到低排序，
	  然后查看出现频数最高的前6个字符和出现频数最低的后6个字符
	  是否与英语字母频数表(ETAOIN)中的字符相匹配。
	  若匹配，match_score加1
	  """
    ETAOIN = 'ETAOINSHRDLCUMWFGYPBVKJXQZ'
    match_score = 0
    tmp_text = pre_treatment(message)
    # 初始化计数字典并计数
#    base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
#    上面这行注释绝妙，无意间解决了ETAOIN排序问题
    dic_letter_freq = dict()
    for c in ETAOIN:
        dic_letter_freq[c] = 0
    for c in tmp_text:
        dic_letter_freq[c] += 1
    # 生成频数字母列表字典
    dic_freq_letter = dict()
    for i in dic_letter_freq.items():
        if i[1] not in dic_freq_letter.keys():
            dic_freq_letter[i[1]] = [i[0]]
        else:
            dic_freq_letter[i[1]].append(i[0])
    # 频数字典排序生成匹配串
    freq_string = ''
    for f in sorted(dic_freq_letter.items(),key=lambda x:(-x[0])):
        for c in f[1]:
            freq_string += c
    # 累计频率匹配分数
    for c in freq_string[:6]:
        if c in ETAOIN[:6]:
            match_score += 1
    for c in freq_string[-6:]:
        if c in ETAOIN[-6:]:
            match_score += 1

    return(match_score)
```

```python
# 测试示例中的密文
message = "I rc ascwuiluhnviwuetnh,osgaa ice tipeeeee slnatsfietgi tittynecenisl. e fo f fnc isltn sn o a yrs sd onisli ,l erglei trhfmwfrogotn,l stcofiit.aea wesn,lnc ee w,l eIh eeehoer ros iol er snh nl oahsts ilasvih tvfeh rtira id thatnie.im ei-dlmf i thszonsisehroe, aiehcdsanahiec gv gyedsB affcahiecesd d lee onsdihsoc nin cethiTitx eRneahgin r e teom fbiotd n ntacscwevhtdhnhpiwru"
print(freq_match_score(message))
```

```
9
```

### 程序化检测英语

对于置换密码，如果我们用暴力破解方法寻找明文，我们需要测试不同的密钥。只有一个密钥会输出正确的明文，其他密钥输出的是垃圾信息。一旦我们找到了明文，后面的key就不用再尝试了。

问题:电脑如何区分垃圾信息和英语文本(有实际意义的) ?

电脑没法区分它们，但是我们注意到英语文本是由可以从字典查找到的单词组成的，而垃圾信息的组成单词我们找不到。如果我们有一个字典文件，每一行是一个英文单词，并且某一个密钥破解后的明文的绝大多数单词都在字典文件中，那么我们可以猜测破解后的明文大概率是我们想要的(假设明文是英语)。

```python
def is_english(message, word_percentage=20, letter_percentage=85):
  	"""
  	破解得到的字符串中至少要有20%的单词在字典中，
  	85%的字符必须是字母或者空格(不是符号或者数字)
  	word_percentage 和 letter_percentage的默认值可以调整
  	"""
    # 加载字典生成字典列表
    with open('dictionary.txt', 'r') as f:
        wordlist = f.readlines()
    for i in range(0,len(wordlist)):
        wordlist[i] = wordlist[i].rstrip('\n')
    # 英文检测
    tmp_text = message.upper()
    tmp_wordlist = []
    tmp_word = ''
    sum_letter = 0
    sum_word = 0
    for c in tmp_text:
        if c.isalpha():
            tmp_word += c
            sum_letter += 1
        else:
            if c.isspace():
                sum_letter += 1
            tmp_wordlist.append(tmp_word)
            tmp_word = ''
    for w in tmp_wordlist:
        if w in wordlist:
            sum_word += 1
    freq_letter = sum_letter / len(tmp_text) * 100
    freq_word = sum_word / len(tmp_wordlist) * 100
#    print(freq_letter)
#    print(freq_word)
    if (freq_letter >= letter_percentage) and (freq_word >= word_percentage):
        return(True)
    else:
        return(False)
```

### 实现破解维吉尼亚密码的主程序

1. 获得密钥可能长度的列表;
2. 对于每个可能的密钥长度，暴力破解密文:
   - 获取每组第N个字母构成的字符串(N取值从1到密钥长度); 
   - 对于字母表中的每个字母，尝试用维吉尼亚解密过程解密; 
   - 计算解密后字符串的频率匹配分数，确定密钥每个位置可能的字母; 
   - 尝试密钥每个位置处可能字母的组合，破解密文; 
   - 判断破解后得到的字符串是否为英语，输出提示信息并查看结果，通过结果判断是否继续破解。

用文件ciphertext_vigenere.txt(从QQ群文件下载)中的密文测试破解程序，给出明文。

考虑到讲义中使用的字母频率分析可能存在的局限性，本人另实现了一种字母频率分析的方法，相比前者更加准确可靠：

```python
# 另一种字母频率分析
def freq_score(message):
    tmp_text = pre_treatment(message)
    dic_freq = dict()
    dic_freq = {'A': 8.167, 'B': 1.492, 'C': 2.782, 'D': 4.253,
                'E': 12.702, 'F': 2.228, 'G': 2.015, 'H': 6.094,
                'I': 6.966, 'J': 0.153, 'K': 0.772, 'L': 4.025,
                'M': 2.406, 'N': 6.749, 'O': 7.507, 'P': 1.929,
                'Q': 0.095, 'R': 5.987, 'S': 6.327, 'T': 9.056,
                'U': 2.758, 'V': 0.978, 'W': 2.360, 'X': 0.150,
                'Y': 1.974, 'Z': 0.074}
    count = 0
    sum = 0
    for c in tmp_text:
        count += 1
        sum += dic_freq[c]
    return(sum/count)
```

```python
# 破解密文主程序
def kasiski(message):
    flag = False
    # 尝试最有可能的5种密钥长度
    for keylen in get_possible_keylen(message)[:5]:
        print('keylen = ', keylen)
        dic_key = dict()
        for i in range(0, keylen):
            base_string = get_nth_subkeys_letters(i+1, keylen, message)
            dic_score = dict()
            top_guess = 3   # 每位密钥测试3个最有可能的字母
            for j in range(0, 26):
                tmp_string = ''
                for c in base_string:
                    tmp_string += chr(ord('A')+(ord(c)-ord('A')-j) % 26)
                    dic_score[chr(ord('A')+j)] = freq_score(tmp_string)
            dic_key[i] = ''
            tmp_count = 0
            for k in sorted(dic_score.items(),key=lambda x:-x[1]):
                tmp_count += 1
                dic_key[i] += k[0]
                print(i,tmp_count, k)
                if tmp_count == top_guess:
                    break
        print(dic_key)
        # 参考二进制思想生成可能密钥
        for i in range(0, top_guess**keylen):
            tmp_key = ''
            if i == 0:
                for j in range(0, keylen):
                    tmp_key += dic_key[j][0]
            else:
                tmp = i
                dkey = -1
                while tmp > 0:
                    dkey += 1
                    dvalue = tmp % top_guess
                    tmp_key += dic_key[dkey][dvalue]
                    tmp //= top_guess
                for j in range(dkey+1, keylen):
                    tmp_key += dic_key[j][0]
            # 尝试解密
            decrypted_text = vigenere.decrypt(message, tmp_key)
            if is_english(decrypted_text):
                print(decrypted_text)
                print('key =',tmp_key)
                flag = True
                break
        if flag:
            break

def main():
    message = '' 
    with open('ciphertext_vigenere.txt','r') as f:
        for i in f.readlines():
            message += i

    print(message)

    kasiski(message)
```

运行结果：

```
Adiz Avtzqeci Tmzubb wsa m Pmilqev halpqavtakuoi, lgouqdaf, kdmktsvmztsl, izr xoexghzr kkusitaaf. Vz wsa twbhdg ubalmmzhdad qz hce vmhsgohuqbo ox kaakulmd gxiwvos, krgdurdny i rcmmstugvtawz ca tzm ocicwxfg jf "stscmilpy" oid "uwydptsbuci" wabt hce Lcdwig eiovdnw. Bgfdny qe kddwtk qjnkqpsmev ba pz tzm roohwz at xoexghzr kkusicw izr vrlqrwxist uboedtuuznum. Pimifo Icmlv Emf DI, Lcdwig owdyzd xwd hce Ywhsmnemzh Xovm mby Cqxtsm Supacg (GUKE) oo Bdmfqclwg Bomk, Tzuhvif'a ocyetzqofifo ositjm. Rcm a lqys ce oie vzav wr Vpt 8, lpq gzclqab mekxabnittq tjr Ymdavn fihog cjgbhvnstkgds. Zm psqikmp o iuejqf jf lmoviiicqg aoj jdsvkavs Uzreiz qdpzmdg, dnutgrdny bts helpar jf lpq pjmtm, mb zlwkffjmwktoiiuix avczqzs ohsb ocplv nuby swbfwigk naf ohw Mzwbms umqcifm. Mtoej bts raj pq kjrcmp oo tzm Zooigvmz Khqauqvl Dincmalwdm, rhwzq vz cjmmhzd gvq ca tzm rwmsl lqgdgfa rcm a kbafzd-hzaumae kaakulmd, hce SKQ. Wi 1948 Tmzubb jgqzsy Msf Zsrmsv'e Qjmhcfwig Dincmalwdm vt Eizqcekbqf Pnadqfnilg, ivzrw pq onsaafsy if bts yenmxckmwvf ca tzm Yoiczmehzr uwydptwze oid tmoohe avfsmekbqr dn eifvzmsbuqvl tqazjgq. Pq kmolm m dvpwz ab ohw ktshiuix pvsaa at hojxtcbefmewn, afl bfzdakfsy okkuzgalqzu xhwuuqvl jmmqoigve gpcz ie hce Tmxcpsgd-Lvvbgbubnkq zqoxtawz, kciup isme xqdgo otaqfqev qz hce 1960k. Bgfdny'a tchokmjivlabk fzsmtfsy if i ofdmavmz krgaqqptawz wi 1952, wzmz vjmgaqlpad iohn wwzq goidt uzgeyix wi tzm Gbdtwl Wwigvwy. Vz aukqdoev bdsvtemzh rilp rshadm tcmmgvqg (xhwuuqvl uiehmalqab) vs sv mzoejvmhdvw ba dmikwz. Hpravs rdev qz 1954, xpsl whsm tow iszkk jqtjrw pug 42id tqdhcdsg, rfjm ugmbddw xawnofqzu. Vn avcizsl lqhzreqzsy tzif vds vmmhc wsa eidcalq; vds ewfvzr svp gjmw wfvzrk jqzdenmp vds vmmhc wsa mqxivmzhvl. Gv 10 Esktwunsm 2009, fgtxcrifo mb Dnlmdbzt uiydviyv, Nfdtaat Dmiem Ywiikbqf Bojlab Wrgez avdw iz cafakuog pmjxwx ahwxcby gv nscadn at ohw Jdwoikp scqejvysit xwd "hce sxboglavs kvy zm ion tjmmhzd." Sa at Haq 2012 i bfdvsbq azmtmd'g widt ion bwnafz tzm Tcpsw wr Zjrva ivdcz eaigd yzmbo Tmzubb a kbmhptgzk dvrvwz wa efiohzd.
keylen =  3
0 1 ('A', 5.125612431444254)
0 2 ('M', 5.112906764168203)
0 3 ('Z', 4.292806215722134)
1 1 ('O', 5.333315018315032)
1 2 ('S', 5.273826007326018)
1 3 ('D', 4.486067765567781)
2 1 ('I', 5.830117216117233)
2 2 ('V', 5.392289377289392)
2 3 ('E', 4.267117216117228)
{0: 'AMZ', 1: 'OSD', 2: 'IVE'}
keylen =  2
0 1 ('I', 4.810197560975626)
0 2 ('O', 4.562274390243913)
0 3 ('A', 4.415186585365871)
1 1 ('M', 4.557256410256414)
1 2 ('V', 4.542681318681341)
1 3 ('I', 4.338537240537258)
{0: 'IOA', 1: 'MVI'}
keylen =  6
0 1 ('A', 6.367591240875909)
0 2 ('P', 5.041430656934308)
0 3 ('E', 4.885160583941612)
1 1 ('S', 6.245344322344322)
1 2 ('H', 4.7055934065934135)
1 3 ('W', 4.369351648351649)
2 1 ('I', 6.8673223443223455)
2 2 ('T', 4.873608058608065)
2 3 ('E', 4.650586080586077)
3 1 ('M', 6.306934065934067)
3 2 ('Z', 4.561073260073258)
3 3 ('Q', 4.492465201465203)
4 1 ('O', 6.575586080586089)
4 2 ('D', 4.607542124542126)
4 3 ('Z', 4.570794871794874)
5 1 ('V', 6.368021978021977)
5 2 ('I', 4.7929120879120966)
5 3 ('Z', 4.592890109890112)
{0: 'APE', 1: 'SHW', 2: 'ITE', 3: 'MZQ', 4: 'ODZ', 5: 'VIZ'}
Alan Mathison Turing was a British mathematician, logician, cryptanalyst, and computer scientist. He was highly influential in the development of computer science, providing a formalisation of the concepts of "algorithm" and "computation" with the Turing machine. Turing is widely considered to be the father of computer science and artificial intelligence. During World War II, Turing worked for the Government Code and Cypher School (GCCS) at Bletchley Park, Britain's codebreaking centre. For a time he was head of Hut 8, the section responsible for German naval cryptanalysis. He devised a number of techniques for breaking German ciphers, including the method of the bombe, an electromechanical machine that could find settings for the Enigma machine. After the war he worked at the National Physical Laboratory, where he created one of the first designs for a stored-program computer, the ACE. In 1948 Turing joined Max Newman's Computing Laboratory at Manchester University, where he assisted in the development of the Manchester computers and became interested in mathematical biology. He wrote a paper on the chemical basis of morphogenesis, and predicted oscillating chemical reactions such as the Belousov-Zhabotinsky reaction, which were first observed in the 1960s. Turing's homosexuality resulted in a criminal prosecution in 1952, when homosexual acts were still illegal in the United Kingdom. He accepted treatment with female hormones (chemical castration) as an alternative to prison. Turing died in 1954, just over two weeks before his 42nd birthday, from cyanide poisoning. An inquest determined that his death was suicide; his mother and some others believed his death was accidental. On 10 September 2009, following an Internet campaign, British Prime Minister Gordon Brown made an official public apology on behalf of the British government for "the appalling way he was treated." As of May 2012 a private member's bill was before the House of Lords which would grant Turing a statutory pardon if enacted.
key = ASIMOV
```

## 实验总结

本门实验的讲义是本学期所有实验中最具有**引导**、**启发性**的讲义。通过本次实验，加深了我对于python这门编程语言的掌握情况，理解并实现了维吉尼亚密码，在完成频率分析、唯密文攻击时，收获了极大的成就感，受益匪浅。
