---
title: 关系数据库标准语言SQL
tags: mysql
categories:
  - 想要毕业
  - 数据库原理
description: '结构化查询语句(Structured Query Language,SQL)是关系数据库的标准语言'
abbrlink: 4ca49cdf
date: 2021-04-22 15:42:58
cover:
katex:
---

# SQL的特点

都是相比于非关系模型数据库的优点。

## 综合统一

SQL集数据定义语言、数据操纵语言、数据控制语言的功能于一体，语言风格统一，可以独立完成数据库生命周期中的全部活动：

- 定义和修改、删除关系模式，定义和删除视图，插入数据，建立数据库。
- 对数据库中的数据进行查询和更新。
- 数据库重构和维护。
- 数据库安全性、完整性控制，以及事务控制。
- 嵌入式SQL和动态SQL定义。

## 高度非过程化

存取路径的选择以及SQL的操作过程由系统自动完成。

减轻用户负担，提高数据独立性。

## 面向集合的操作方式

非关系数据模型采用面向记录的操作方式。

SQL采用面向集合的操作方式，不仅操作对象、查找结果可以是元组的集合，一次 插入、删除、更新 操作的对象也可以是元组的集合。

## 以统一种语法结构提供多种使用方式

SQL既是独立的语言，又是嵌入式语言，提供了极大的灵获悉与方便性。

## 语言简洁易学易用

完成核心功能只需要9个动词：

| SQL功能  | 动词                   |
| :------: | :--------------------- |
| 数据查询 | SELECT                 |
| 数据定义 | CREATE, DROP, ALTER    |
| 数据操纵 | INSERT, UPDATE, DELETE |
| 数据控制 | CRANT, REVOKE          |

# SQL的基本概念

支持SQL的关系数据库管理系统同样支持关系数据库三级模式结构，其中：

- 外模式 包括 若干视图和部分基本表
- 数据库模式 包括 若干基本表
- 内模式 包括 若干存储文件

用户可以用SQL对基本表和视图进行查询或者其他操作，基本表和视图一样，都是关系。

**基本表**是本身独立存在的表，在关系数据库管理系统中，一个关系就对应一个基本表。

一个或多个基本表对应一个**存储文件**，一个表可以带若干索引，索引页存放在存储文件中。

存储文件的逻辑结构组成了关系数据库的内模式。存储文件的物理结构对最终用户是隐蔽的。

**视图**是从一个或几个基本表导出的表。它本身不独立存储在数据库中，即数据库中只存放视图的定义，而不存放视图对应的数据。这些数据仍存放在导出视图的基本表中，因此视图是一个虚表。视图在概念上与基本表等同，用户可以在视图上再定义视图。

# 数据定义

| 操作对象 | 创建    | 删除        | 修改        |
| :------: | ------------ | ---------- | ----------- |
|   模式   | CREATE SCHEMA | DROP SCHEMA |             |
|    表    | CREATE TABLE  | DROP TABLE  | ALTER TABLE |
|   视图   | CREATE VIEW   | DROP VIEW   |             |
|   索引   | CREATE INDEX  | DROP INDEX  | ALTER INDEX |

## 模式的定义与删除

### 定义模式

```sql 
CREATE SCHEMA <模式名> AUTHORIZATION <用户名>;
```

如果没有指定`<模式名>`，那么`<模式名>`隐含为`<用户名>`。

```sql
CREATE SCHEMA AUTHORIZATION <用户名>;
```

> 如何查看所建模式的用户名？

尝试时发现`mysql`似乎不支持定义`<用户名>`这种用法：

```sql
MariaDB [(none)]> create schema SCH authorization test;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'authorization test' at line 1
```

也不支持`"S-T"`这种命名方式：

```sql
MariaDB [(none)]> create schema "S-T";
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near '"S-T"' at line 1
MariaDB [(none)]> create schema S-T;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near '-T' at line 1
MariaDB [(none)]> create schema 'S-T';
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near ''S-T'' at line 1
MariaDB [(none)]> create schema ST;
Query OK, 1 row affected (0.000 sec)

MariaDB [(none)]> create schema S_T;
Query OK, 1 row affected (0.000 sec)

MariaDB [(none)]> show schemas;
+--------------------+
| Database           |
+--------------------+
| ST                 |
| S_T                |
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
5 rows in set (0.000 sec)
```

```sql
CREATE SCHEMA <模式名> AUTHORIZATION <用户名> [<表定义子句 CREATE TABLE>|<视图定义子句 CREATE VIEW>|<授权定义子句 GRANT>];
```

试过示例，依旧有问题，自行实现如下：

```sql
MariaDB [(none)]> create schema test;
Query OK, 1 row affected (0.000 sec)

MariaDB [(none)]> use test;
Database changed
MariaDB [test]> create table tab1(
    -> col1 smallint,
    -> col2 int,
    -> col3 char(20),
    -> col4 numeric(10,3),
    -> col5 decimal(5,2)
    ->  );
Query OK, 0 rows affected (0.024 sec)

MariaDB [test]> show tables;
+----------------+
| Tables_in_test |
+----------------+
| tab1           |
+----------------+
1 row in set (0.000 sec)

MariaDB [test]> describe tab1;
+-------+---------------+------+-----+---------+-------+
| Field | Type          | Null | Key | Default | Extra |
+-------+---------------+------+-----+---------+-------+
| col1  | smallint(6)   | YES  |     | NULL    |       |
| col2  | int(11)       | YES  |     | NULL    |       |
| col3  | char(20)      | YES  |     | NULL    |       |
| col4  | decimal(10,3) | YES  |     | NULL    |       |
| col5  | decimal(5,2)  | YES  |     | NULL    |       |
+-------+---------------+------+-----+---------+-------+
5 rows in set (0.002 sec)
```

在`mysql`中，似乎`schema`的用法与`database`一致。

### 删除模式

```sql
DROP SCHEMA <模式名> <级联 CASCADE|限制 RESTRICT>
```

```sql
MariaDB [(none)]> show schemas;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| test               |
+--------------------+
6 rows in set (0.007 sec)

MariaDB [(none)]> drop schema test;
Query OK, 1 row affected (0.004 sec)

MariaDB [(none)]> show schemas;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
5 rows in set (0.005 sec)
```

## 基本表的定义、删除与修改

### 定义基本表

创建并切换到数据库`S_T`:

```sql
MariaDB [(none)]> create database S_T;
Query OK, 1 row affected (0.000 sec)

MariaDB [(none)]> use S_T;
Database changed
MariaDB [S_T]>
```

创建“学生”表`Student`:

```sql
MariaDB [S_T]> create table Student(
    -> Sno char(9) primary key,		/*列级完整性约束，Sno是主码*/
    -> Sname char(20) unique,		/*Sname取唯一值*/
    -> Ssex char(2),
    -> Sage smallint,
    -> Sdept char(20)
    -> );
Query OK, 0 rows affected (0.036 sec)

MariaDB [S_T]> show tables;
+---------------+
| Tables_in_S_T |
+---------------+
| Student       |
+---------------+
1 row in set (0.000 sec)

MariaDB [S_T]> desc Student;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| Sno   | char(9)     | NO   | PRI | NULL    |       |
| Sname | char(20)    | YES  | UNI | NULL    |       |
| Ssex  | char(2)     | YES  |     | NULL    |       |
| Sage  | smallint(6) | YES  |     | NULL    |       |
| Sdept | char(20)    | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
5 rows in set (0.002 sec)
```

创建“课程”表`Course`:

```sql
MariaDB [S_T]> create table Course(
    -> Cno char(4) primary key,		/*列级完整性约束，Cno是主码*/
    -> Cname char(40) not null,		/*Cname不能取空值*/
    -> Cpno char(4),			/*Cpno为先修课程号*/
    -> Ccredit smallint,
    -> foreign key (Cpno) references Course(Cno)
  					/*表级完整性约束，外码是Cpno，被参照表是Course，被参照列是Cno*/
    -> );
Query OK, 0 rows affected (0.036 sec)

MariaDB [S_T]> desc Course;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| Cno     | char(4)     | NO   | PRI | NULL    |       |
| Cname   | char(40)    | NO   |     | NULL    |       |
| Cpno    | char(4)     | YES  | MUL | NULL    |       |
| Ccredit | smallint(6) | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
4 rows in set (0.003 sec)
```

创建“学生选课”表`SC`:

```sql
MariaDB [S_T]> create table SC(
    -> Sno char(9),
    -> Cno char(4),
    -> Grade smallint,
    -> primary key (Sno,Cno),
    -> foreign key (Sno) references Student(Sno),
    -> foreign key (Cno) references Course(Cno)
    -> );
Query OK, 0 rows affected (0.027 sec)

MariaDB [S_T]> desc SC;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| Sno   | char(9)     | NO   | PRI | NULL    |       |
| Cno   | char(4)     | NO   | PRI | NULL    |       |
| Grade | smallint(6) | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
3 rows in set (0.002 sec)
```

> 完整性约束有哪些？
>
> 如何查看外码？

### 数据类型

| 数据类型         | 含义                                                         |
| ---------------- | ------------------------------------------------------------ |
| char(n)          | 长度为n的定长字符串                                          |
| varchar(n)       | 最大长度为n的变长字符串                                      |
| clob             | 字符串大对象                                                 |
| blob             | 二进制大对象                                                 |
| int              | 长整数（4字节）                                              |
| smallint         | 短整数（2字节）                                              |
| bigint           | 大整数（8字节）                                              |
| numeric(p,d)     | 定点数，由p位数字（不包括符号、小数点）组成，小数点后面由d位数字 |
| decimal(p,d)     | 同numeric                                                    |
| real             | 取决于机器精度的单精度浮点数                                 |
| double precision | 取决于机器精度的双精度浮点数                                 |
| float(n)         | 可选精度的浮点数，精度至少为n位数字                          |
| boolean          | 逻辑布尔量                                                   |
| date             | 日期，包含 年、月、日，格式为YYYY-MM-DD                      |
| time             | 时间，包含一日的 时、分、秒，格式为HH:MM:SS                  |
| timestamp        | 时间戳类型                                                   |
| interval         | 时间间隔类型                                                 |

### 修改基本表

```sql
ALTER TABLE <表名>
[ADD [COLUMN] <新列名> <数据类型> [列级完整性约束]]
[ADD <表级完整性约束>]
[DROP [COLUMN] <列名> [CASCADE|RESTRICT]]
[DROP CONSTRAINT <完整性约束名> [CASCADE|RESTRICT]]
[ALTER COLUMN <列名> <数据类型>];
```

向`Student`表增加“入学时间”列，数据类型为日期：

```sql
MariaDB [S_T]> desc Student;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| Sno   | char(9)     | NO   | PRI | NULL    |       |
| Sname | char(20)    | YES  | UNI | NULL    |       |
| Ssex  | char(2)     | YES  |     | NULL    |       |
| Sage  | smallint(6) | YES  |     | NULL    |       |
| Sdept | char(20)    | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
5 rows in set (0.002 sec)

MariaDB [S_T]> alter table Student add Sentrance date;
Query OK, 0 rows affected (0.043 sec)
Records: 0  Duplicates: 0  Warnings: 0

MariaDB [S_T]> desc Student;
+-----------+-------------+------+-----+---------+-------+
| Field     | Type        | Null | Key | Default | Extra |
+-----------+-------------+------+-----+---------+-------+
| Sno       | char(9)     | NO   | PRI | NULL    |       |
| Sname     | char(20)    | YES  | UNI | NULL    |       |
| Ssex      | char(2)     | YES  |     | NULL    |       |
| Sage      | smallint(6) | YES  |     | NULL    |       |
| Sdept     | char(20)    | YES  |     | NULL    |       |
| Sentrance | date        | YES  |     | NULL    |       |
+-----------+-------------+------+-----+---------+-------+
6 rows in set (0.002 sec)
```

将年龄`Sage`的数据类型由`smallint`改为`int`，使用`modify`：

```sql
MariaDB [S_T]> desc Student;
+-----------+-------------+------+-----+---------+-------+
| Field     | Type        | Null | Key | Default | Extra |
+-----------+-------------+------+-----+---------+-------+
| Sno       | char(9)     | NO   | PRI | NULL    |       |
| Sname     | char(20)    | YES  | UNI | NULL    |       |
| Ssex      | char(2)     | YES  |     | NULL    |       |
| Sage      | smallint(6) | YES  |     | NULL    |       |
| Sdept     | char(20)    | YES  |     | NULL    |       |
| Sentrance | date        | YES  |     | NULL    |       |
+-----------+-------------+------+-----+---------+-------+
6 rows in set (0.002 sec)

MariaDB [S_T]> alter table Student alter column Sage int;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'int' at line 1
MariaDB [S_T]> alter table Student alter column Sage char(3);
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'char(3)' at line 1
MariaDB [S_T]> alter table Student modify Sage int;
Query OK, 0 rows affected (0.045 sec)
Records: 0  Duplicates: 0  Warnings: 0

MariaDB [S_T]> desc Student;
+-----------+----------+------+-----+---------+-------+
| Field     | Type     | Null | Key | Default | Extra |
+-----------+----------+------+-----+---------+-------+
| Sno       | char(9)  | NO   | PRI | NULL    |       |
| Sname     | char(20) | YES  | UNI | NULL    |       |
| Ssex      | char(2)  | YES  |     | NULL    |       |
| Sage      | int(11)  | YES  |     | NULL    |       |
| Sdept     | char(20) | YES  |     | NULL    |       |
| Sentrance | date     | YES  |     | NULL    |       |
+-----------+----------+------+-----+---------+-------+
6 rows in set (0.002 sec)
```

增加课程名`Cname`必须取唯一值的约束条件：

```sql
MariaDB [S_T]> desc Course;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| Cno     | char(4)     | NO   | PRI | NULL    |       |
| Cname   | char(40)    | NO   |     | NULL    |       |
| Cpno    | char(4)     | YES  | MUL | NULL    |       |
| Ccredit | smallint(6) | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
4 rows in set (0.002 sec)

MariaDB [S_T]> alter table Course add unique(Cname);
Query OK, 0 rows affected (0.024 sec)
Records: 0  Duplicates: 0  Warnings: 0

MariaDB [S_T]> desc Course;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| Cno     | char(4)     | NO   | PRI | NULL    |       |
| Cname   | char(40)    | NO   | UNI | NULL    |       |
| Cpno    | char(4)     | YES  | MUL | NULL    |       |
| Ccredit | smallint(6) | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
4 rows in set (0.002 sec)
```

> 如何取消唯一性约束？

### 删除基本表

```sql
DROP TABLE <表名> [CASCADE|RESTRICT];
```

## 建立视图

【例 3.12】

## 索引的建立与删除

【3.3.3】

# 数据更新

## 插入数据

### 插入元组

```sql
INSERT INTO <表名> [<属性列1>[,<属性列n>]] VALUES(<常量1>[,<常量n>]);
```

对`Student`表插入数据：

```sql
MariaDB [S_T]> desc Student;
+-----------+-------------+------+-----+---------+-------+
| Field     | Type        | Null | Key | Default | Extra |
+-----------+-------------+------+-----+---------+-------+
| Sno       | char(9)     | NO   | PRI | NULL    |       |
| Sname     | char(20)    | YES  | UNI | NULL    |       |
| Ssex      | char(2)     | YES  |     | NULL    |       |
| Sage      | smallint(6) | YES  |     | NULL    |       |
| Sdept     | char(20)    | YES  |     | NULL    |       |
| Sentrance | date        | YES  |     | NULL    |       |
+-----------+-------------+------+-----+---------+-------+
6 rows in set (0.002 sec)

MariaDB [S_T]> select * from Student;
Empty set (0.000 sec)

MariaDB [S_T]> insert into Student Sno,Sname,Ssex,Sage,Sdept values ('201215121','李勇','男',20,'CS');
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'Sno,Sname,Ssex,Sage,Sdept values ('201215121','李勇','男',20,'CS')' at line 1
MariaDB [S_T]> insert into Student values ('201215121','李勇','男',20,'CS');
ERROR 1136 (21S01): Column count doesn't match value count at row 1
MariaDB [S_T]> insert into Student values ('201215121','李勇','男',20,'CS',2011);
ERROR 1292 (22007): Incorrect date value: '2011' for column `s_t`.`student`.`Sentrance` at row 1
MariaDB [S_T]> insert into Student values ('201215121','李勇','男',20,'CS',2010-9-1);
ERROR 1292 (22007): Incorrect date value: '2000' for column `s_t`.`student`.`Sentrance` at row 1
MariaDB [S_T]> insert into Student values ('201215121','李勇','男',20,'CS',2010:09:01);
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near ':09:01)' at line 1
MariaDB [S_T]> insert into Student values ('201215121','李勇','男',20,'CS',20100901);
Query OK, 1 row affected (0.001 sec)

MariaDB [S_T]> select * from Student;
+-----------+--------+------+------+-------+------------+
| Sno       | Sname  | Ssex | Sage | Sdept | Sentrance  |
+-----------+--------+------+------+-------+------------+
| 201215121 | 李勇   | 男   |   20 | CS    | 2010-09-01 |
+-----------+--------+------+------+-------+------------+
1 row in set (0.000 sec)

MariaDB [S_T]> insert into Student (Sno,Sname,Ssex,Sage,Sdept) values ('201215121','李勇','男',20,'CS');
ERROR 1062 (23000): Duplicate entry '201215121' for key 'PRIMARY'
MariaDB [S_T]> insert into Student (Sno,Sname,Ssex,Sage,Sdept) values ('201215122','刘晨','女',19,'CS');
Query OK, 1 row affected (0.001 sec)

MariaDB [S_T]> select * from Student;
+-----------+--------+------+------+-------+------------+
| Sno       | Sname  | Ssex | Sage | Sdept | Sentrance  |
+-----------+--------+------+------+-------+------------+
| 201215121 | 李勇   | 男   |   20 | CS    | 2010-09-01 |
| 201215122 | 刘晨   | 女   |   19 | CS    | NULL       |
+-----------+--------+------+------+-------+------------+
2 rows in set (0.000 sec)

MariaDB [S_T]> alter table student drop column sentrance;
Query OK, 0 rows affected (0.023 sec)
Records: 0  Duplicates: 0  Warnings: 0

MariaDB [S_T]> select * from student;
+-----------+--------+------+------+-------+
| Sno       | Sname  | Ssex | Sage | Sdept |
+-----------+--------+------+------+-------+
| 201215121 | 李勇   | 男   |   20 | CS    |
| 201215122 | 刘晨   | 女   |   19 | CS    |
+-----------+--------+------+------+-------+
2 rows in set (0.000 sec)
```

对`Student`表插入数据：

```sql
MariaDB [S_T]> desc course;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| Cno     | char(4)     | NO   | PRI | NULL    |       |
| Cname   | char(40)    | NO   | UNI | NULL    |       |
| Cpno    | char(4)     | YES  | MUL | NULL    |       |
| Ccredit | smallint(6) | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
4 rows in set (0.002 sec)

MariaDB [S_T]> insert into course values ('1','数据库','5',4);
ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (`s_t`.`course`, CONSTRAINT `course_ibfk_1` FOREIGN KEY (`Cpno`) REFERENCES `Course` (`Cno`))
MariaDB [S_T]> insert into course values ('1','数据库',,4);
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near '4)' at line 1
MariaDB [S_T]> insert into course values ('1','数据库',null,4);
Query OK, 1 row affected (0.001 sec)

MariaDB [S_T]> select * from sc;
Empty set (0.000 sec)

MariaDB [S_T]> select * from course;
+-----+-----------+------+---------+
| Cno | Cname     | Cpno | Ccredit |
+-----+-----------+------+---------+
| 1   | 数据库    | NULL |       4 |
+-----+-----------+------+---------+
1 row in set (0.000 sec)
```

这个`Course`表建表时外键参考竟是自己的or2

```sql
MariaDB [S_T]> insert into course values ('2','数学',null,2);
Query OK, 1 row affected (0.005 sec)

MariaDB [S_T]> insert into course values ('3','信息系统',null,4);
Query OK, 1 row affected (0.001 sec)

MariaDB [S_T]> insert into course values ('4','操作系统',null,3);
Query OK, 1 row affected (0.001 sec)

MariaDB [S_T]> insert into course values ('5','数据结构',null,4);
Query OK, 1 row affected (0.001 sec)

MariaDB [S_T]> insert into course values ('6','数据处理',null,2);
Query OK, 1 row affected (0.001 sec)

MariaDB [S_T]> insert into course values ('7','PASCAL语言',null,4);
Query OK, 1 row affected (0.001 sec)

MariaDB [S_T]> select * from course;
+-----+--------------+------+---------+
| Cno | Cname        | Cpno | Ccredit |
+-----+--------------+------+---------+
| 1   | 数据库       | NULL |       4 |
| 2   | 数学         | NULL |       2 |
| 3   | 信息系统     | NULL |       4 |
| 4   | 操作系统     | NULL |       3 |
| 5   | 数据结构     | NULL |       4 |
| 6   | 数据处理     | NULL |       2 |
| 7   | PASCAL语言   | NULL |       4 |
+-----+--------------+------+---------+
7 rows in set (0.000 sec)
```

稍后通过数据更新修改先修课程`Cpno`数据。

### 插入子查询结果

## 修改数据

```sql
UPDATE <表名> SET <列名>=<表达式> [WHERE <条件>];
```

### 修改某个元组的值



# 数据查询

```sql
SELECT [ALL|DISTINCT] <目标列表达式> [,<目标列表达式>]
FROM <表名或视图名> [,<表名或视图名>]|(<SELECT语句>) [AS] <别名>
[WHERE <条件表达式>]
[GROUP BY <列名1> [HAVING <条件表达式>]]
[ORDER BY <列名2> [ASC|DESC]];
```

## 单表查询

### 选择表中的若干列

#### 查询指定列

```sql

```



