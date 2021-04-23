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

```sql
MariaDB [S_T]> select * from student;
+-----------+--------+------+------+-------+
| Sno       | Sname  | Ssex | Sage | Sdept |
+-----------+--------+------+------+-------+
| 201215121 | 李勇   | 男   |   20 | CS    |
| 201215122 | 刘晨   | 女   |   19 | CS    |
| 201215123 | 王敏   | 女   |   20 | MA    |
| 201215125 | 张立   | 男   |   19 | IS    |
+-----------+--------+------+------+-------+
4 rows in set (0.000 sec)

MariaDB [S_T]> update student set sage=18 where sno='201215123';
Query OK, 1 row affected (0.001 sec)
Rows matched: 1  Changed: 1  Warnings: 0

MariaDB [S_T]> select * from student;
+-----------+--------+------+------+-------+
| Sno       | Sname  | Ssex | Sage | Sdept |
+-----------+--------+------+------+-------+
| 201215121 | 李勇   | 男   |   20 | CS    |
| 201215122 | 刘晨   | 女   |   19 | CS    |
| 201215123 | 王敏   | 女   |   18 | MA    |
| 201215125 | 张立   | 男   |   19 | IS    |
+-----------+--------+------+------+-------+
4 rows in set (0.000 sec)
```

更新之前的`Course`表:

```sql
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

MariaDB [S_T]> update course set cpno='5' where cno='1';
Query OK, 1 row affected (0.001 sec)
Rows matched: 1  Changed: 1  Warnings: 0

MariaDB [S_T]> update course set cpno='1' where cno='3';
Query OK, 1 row affected (0.001 sec)
Rows matched: 1  Changed: 1  Warnings: 0

MariaDB [S_T]> update course set cpno='6' where cno='4';
Query OK, 1 row affected (0.001 sec)
Rows matched: 1  Changed: 1  Warnings: 0

MariaDB [S_T]> update course set cpno='7' where cno='5';
Query OK, 1 row affected (0.001 sec)
Rows matched: 1  Changed: 1  Warnings: 0

MariaDB [S_T]> update course set cpno='6' where cno='7';
Query OK, 1 row affected (0.001 sec)
Rows matched: 1  Changed: 1  Warnings: 0

MariaDB [S_T]> select * from course;
+-----+--------------+------+---------+
| Cno | Cname        | Cpno | Ccredit |
+-----+--------------+------+---------+
| 1   | 数据库       | 5    |       4 |
| 2   | 数学         | NULL |       2 |
| 3   | 信息系统     | 1    |       4 |
| 4   | 操作系统     | 6    |       3 |
| 5   | 数据结构     | 7    |       4 |
| 6   | 数据处理     | NULL |       2 |
| 7   | PASCAL语言   | 6    |       4 |
+-----+--------------+------+---------+
7 rows in set (0.000 sec)
```

对学生选课`SC`表插入数据:

```sql
MariaDB [S_T]> select * from sc;
Empty set (0.000 sec)

MariaDB [S_T]> desc sc;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| Sno   | char(9)     | NO   | PRI | NULL    |       |
| Cno   | char(4)     | NO   | PRI | NULL    |       |
| Grade | smallint(6) | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
3 rows in set (0.002 sec)

MariaDB [S_T]> insert into sc values ('201215121','1',92);
Query OK, 1 row affected (0.000 sec)

MariaDB [S_T]> insert into sc values ('201215121','2',85);
Query OK, 1 row affected (0.001 sec)

MariaDB [S_T]> insert into sc values ('201215121','3',88);
Query OK, 1 row affected (0.001 sec)

MariaDB [S_T]> insert into sc values ('201215122','2',90);
Query OK, 1 row affected (0.001 sec)

MariaDB [S_T]> insert into sc values ('201215122','3',80);
Query OK, 1 row affected (0.001 sec)

MariaDB [S_T]> select * from sc;
+-----------+-----+-------+
| Sno       | Cno | Grade |
+-----------+-----+-------+
| 201215121 | 1   |    92 |
| 201215121 | 2   |    85 |
| 201215121 | 3   |    88 |
| 201215122 | 2   |    90 |
| 201215122 | 3   |    80 |
+-----------+-----+-------+
5 rows in set (0.000 sec)
```

### 修改多个元组的值

```sql
MariaDB [S_T]> select * from student;
+-----------+--------+------+------+-------+
| Sno       | Sname  | Ssex | Sage | Sdept |
+-----------+--------+------+------+-------+
| 201215121 | 李勇   | 男   |   20 | CS    |
| 201215122 | 刘晨   | 女   |   19 | CS    |
| 201215123 | 王敏   | 女   |   18 | MA    |
| 201215125 | 张立   | 男   |   19 | IS    |
+-----------+--------+------+------+-------+
4 rows in set (0.000 sec)

MariaDB [S_T]> update student set sage=sage+1;
Query OK, 4 rows affected (0.001 sec)
Rows matched: 4  Changed: 4  Warnings: 0

MariaDB [S_T]> select * from student;
+-----------+--------+------+------+-------+
| Sno       | Sname  | Ssex | Sage | Sdept |
+-----------+--------+------+------+-------+
| 201215121 | 李勇   | 男   |   21 | CS    |
| 201215122 | 刘晨   | 女   |   20 | CS    |
| 201215123 | 王敏   | 女   |   19 | MA    |
| 201215125 | 张立   | 男   |   20 | IS    |
+-----------+--------+------+------+-------+
4 rows in set (0.000 sec)
```

### 带子查询的修改语句

## 删除数据

```sql
DELETE FROM <表名> [WHERE <条件>];
```

### 删除某个元组的值

```sql
delete from student where sno='201215128';
```

### 删除多个元组的值

```sql
delete from sc;
```

注意：仅使`SC`成为空表，表依旧在。

### 带子查询的删除语句

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
MariaDB [S_T]> select sno,sname from student;
+-----------+--------+
| sno       | sname  |
+-----------+--------+
| 201215122 | 刘晨   |
| 201215125 | 张立   |
| 201215121 | 李勇   |
| 201215123 | 王敏   |
+-----------+--------+
4 rows in set (0.000 sec)

MariaDB [S_T]> select sname,sno,sdept from student;
+--------+-----------+-------+
| sname  | sno       | sdept |
+--------+-----------+-------+
| 李勇   | 201215121 | CS    |
| 刘晨   | 201215122 | CS    |
| 王敏   | 201215123 | MA    |
| 张立   | 201215125 | IS    |
+--------+-----------+-------+
4 rows in set (0.000 sec)
```

#### 查询全部列

```sql
select * from student;
```

#### 查询经过计算的值

查询全体学生的姓名及其出生年份：

```sql
MariaDB [S_T]> select sname,2014-sage from student;
+--------+-----------+
| sname  | 2014-sage |
+--------+-----------+
| 李勇   |      1993 |
| 刘晨   |      1994 |
| 王敏   |      1995 |
| 张立   |      1994 |
+--------+-----------+
4 rows in set (0.000 sec)
```

查询全体学生的姓名、出生年份和所在院系，要求用小谢字母表示院系名：

```sql
MariaDB [S_T]> select sname,'Year of Birth:',2014-sage,lower(sdept) from student;
+--------+----------------+-----------+--------------+
| sname  | Year of Birth: | 2014-sage | lower(sdept) |
+--------+----------------+-----------+--------------+
| 李勇   | Year of Birth: |      1993 | cs           |
| 刘晨   | Year of Birth: |      1994 | cs           |
| 王敏   | Year of Birth: |      1995 | ma           |
| 张立   | Year of Birth: |      1994 | is           |
+--------+----------------+-----------+--------------+
4 rows in set (0.000 sec)

MariaDB [S_T]> select sname NAME,2014-sage BIRTH,lower(sdept) department from student;
+--------+-------+------------+
| NAME   | BIRTH | department |
+--------+-------+------------+
| 李勇   |  1993 | cs         |
| 刘晨   |  1994 | cs         |
| 王敏   |  1995 | ma         |
| 张立   |  1994 | is         |
+--------+-------+------------+
4 rows in set (0.000 sec)
```

### 选择表中的若元组

#### 消除取值重复的行 select distinct

```sql
MariaDB [S_T]> select sno from sc;
+-----------+
| sno       |
+-----------+
| 201215121 |
| 201215121 |
| 201215121 |
| 201215122 |
| 201215122 |
+-----------+
5 rows in set (0.000 sec)

MariaDB [S_T]> select distinct sno from sc;
+-----------+
| sno       |
+-----------+
| 201215121 |
| 201215122 |
+-----------+
2 rows in set (0.000 sec)
```

#### 查询满足条件的元组

| 查询条件             | 谓词                                                |
| -------------------- | --------------------------------------------------- |
| 比较                 | =，>，<，>=，<=，!=，<>，!>，!<；not+上述比较运算符 |
| 确定范围             | between and，not between and                        |
| 确定集合             | in，not in                                          |
| 字符匹配             | like，not like                                      |
| 空值                 | is null，is not null                                |
| 多重条件（逻辑运算） | and，or，not                                        |

##### 比较

```sql
MariaDB [S_T]> select sname from student where sdept='CS';
+--------+
| sname  |
+--------+
| 李勇   |
| 刘晨   |
+--------+
2 rows in set (0.008 sec)

MariaDB [S_T]> select sname,sage from student where sage<20;
+--------+------+
| sname  | sage |
+--------+------+
| 王敏   |   19 |
+--------+------+
1 row in set (0.001 sec)

MariaDB [S_T]> select distinct sno from sc where grade>=90;
+-----------+
| sno       |
+-----------+
| 201215121 |
| 201215122 |
+-----------+
2 rows in set (0.000 sec)
```

##### 确定范围

```sql
MariaDB [S_T]> select sname,sdept,sage from student where sage between 20 and 23;
+--------+-------+------+
| sname  | sdept | sage |
+--------+-------+------+
| 李勇   | CS    |   21 |
| 刘晨   | CS    |   20 |
| 张立   | IS    |   20 |
+--------+-------+------+
3 rows in set (0.001 sec)

MariaDB [S_T]> select sname,sdept,sage from student where sage not between 20 and 23;
+--------+-------+------+
| sname  | sdept | sage |
+--------+-------+------+
| 王敏   | MA    |   19 |
+--------+-------+------+
1 row in set (0.000 sec)
```

##### 确定集合

```sql
MariaDB [S_T]> select sname,ssex from student where sdept in ('CS','IS');
+--------+------+
| sname  | ssex |
+--------+------+
| 李勇   | 男   |
| 刘晨   | 女   |
| 张立   | 男   |
+--------+------+
3 rows in set (0.001 sec)

MariaDB [S_T]> select sname,ssex from student where sdept not in ('CS','IS');
+--------+------+
| sname  | ssex |
+--------+------+
| 王敏   | 女   |
+--------+------+
1 row in set (0.000 sec)
```

##### 字符匹配

```sql
[NOT] LIKE '<匹配串>' [ESCAPE '<换码字符>']
```

- `%`百分号代表任意长度的字符串
- `_`下划线代表任意单个字符

数据库字符集为`ASCII`时一个汉字需要两个`_`；当字符集为`GBK`时只需要一个`_`。

```sql
MariaDB [S_T]> select * from student where sno like '2012%';
+-----------+--------+------+------+-------+
| Sno       | Sname  | Ssex | Sage | Sdept |
+-----------+--------+------+------+-------+
| 201215121 | 李勇   | 男   |   21 | CS    |
| 201215122 | 刘晨   | 女   |   20 | CS    |
| 201215123 | 王敏   | 女   |   19 | MA    |
| 201215125 | 张立   | 男   |   20 | IS    |
+-----------+--------+------+------+-------+
4 rows in set (0.003 sec)

MariaDB [S_T]> select sname,sno,ssex from student where sname like '刘%';
+--------+-----------+------+
| sname  | sno       | ssex |
+--------+-----------+------+
| 刘晨   | 201215122 | 女   |
+--------+-----------+------+
1 row in set (0.000 sec)
```

`ESCAPE '\'`表示`'\'`为换码字符，匹配串中紧跟在`'\'`后面的字符`'_'`转义为普通字符。

```sql
select cno,ccredit from course where cname like 'DB\_Design' escape '\';
select * form course where cname like 'DB\_%i__' escape '\';
```

##### 涉及空值

```sql
MariaDB [S_T]> select * from course where cpno is null;
+-----+--------------+------+---------+
| Cno | Cname        | Cpno | Ccredit |
+-----+--------------+------+---------+
| 2   | 数学         | NULL |       2 |
| 6   | 数据处理     | NULL |       2 |
+-----+--------------+------+---------+
2 rows in set (0.000 sec)
```

##### 多重条件查询

`AND`的优先级高于`OR`，用户可以用括号改变优先级。

`IN`谓词实际是多个`OR`运算符的缩写，后者查询效率更高。

```sql
MariaDB [S_T]> select sname,ssex from student where sdept='CS' or sdept='IS';
+--------+------+
| sname  | ssex |
+--------+------+
| 李勇   | 男   |
| 刘晨   | 女   |
| 张立   | 男   |
+--------+------+
3 rows in set (0.000 sec)
```

#### ORDER BY 子句 对查询结果排序

默认升序`ASC`。

```sql
MariaDB [S_T]> select sno,grade from sc where cno='3' order by grade;
+-----------+-------+
| sno       | grade |
+-----------+-------+
| 201215122 |    80 |
| 201215121 |    88 |
+-----------+-------+
2 rows in set (0.001 sec)

MariaDB [S_T]> select sno,grade from sc where cno='3' order by grade desc;
+-----------+-------+
| sno       | grade |
+-----------+-------+
| 201215121 |    88 |
| 201215122 |    80 |
+-----------+-------+
2 rows in set (0.000 sec)

MariaDB [S_T]> select * from student order by sdept asc,sage desc;
```

#### 聚集函数

| 聚集函数                      | 函数功能                                 |
| ----------------------------- | ---------------------------------------- |
| count(*)                      | 统计元组个数                             |
| count([distinct\|all] <列名>) | 统计一列中值的个数                       |
| sum([distinct\|all] <列名>)   | 统计一列中值的总和（此列必须是数值型）   |
| avg([distinct\|all] <列名>)   | 统计一列中值的平均值（此列必须是数值型） |
| max([distinct\|all] <列名>)   | 统计一列中值的最大值                     |
| min([distinct\|all] <列名>)   | 统计一列中值的最小值                     |

当聚集函数遇到空值时，除了`count(*)`外，都跳过空值而只处理非空值。

注意⚠️：聚集函数只能用于`select`子句和`group by`中的`having`子句。

#### GROUP BY 子句

```sql
MariaDB [S_T]> select cno,count(sno) from sc group by cno;
+-----+------------+
| cno | count(sno) |
+-----+------------+
| 1   |          1 |
| 2   |          2 |
| 3   |          2 |
+-----+------------+
3 rows in set (0.002 sec)
```

```sql
MariaDB [S_T]> select * from sc;
+-----------+-----+-------+
| Sno       | Cno | Grade |
+-----------+-----+-------+
| 201215121 | 1   |    92 |
| 201215121 | 2   |    85 |
| 201215121 | 3   |    88 |
| 201215122 | 2   |    90 |
| 201215122 | 3   |    80 |
+-----------+-----+-------+
5 rows in set (0.000 sec)

MariaDB [S_T]> select sno from sc group by sno having count(*)>2;
+-----------+
| sno       |
+-----------+
| 201215121 |
+-----------+
1 row in set (0.000 sec)

MariaDB [S_T]> select cno from sc group by cno having count(*)=1;
+-----+
| cno |
+-----+
| 1   |
+-----+
1 row in set (0.000 sec)
```

`where`子句作用于基本表或者视图，从中选择满足条件的元组；

`having`短语用于组，从中选择满足条件的组。

## 连接查询

若一个查询同时涉及两个以上的表，则称之为连接查询，是关系数据库中最主要的查询。

### 等值与非等值连接查询

```sql
MariaDB [S_T]> select student.*,sc.* from student,sc where student.sno=sc.sno;
+-----------+--------+------+------+-------+-----------+-----+-------+
| Sno       | Sname  | Ssex | Sage | Sdept | Sno       | Cno | Grade |
+-----------+--------+------+------+-------+-----------+-----+-------+
| 201215121 | 李勇   | 男   |   21 | CS    | 201215121 | 1   |    92 |
| 201215121 | 李勇   | 男   |   21 | CS    | 201215121 | 2   |    85 |
| 201215121 | 李勇   | 男   |   21 | CS    | 201215121 | 3   |    88 |
| 201215122 | 刘晨   | 女   |   20 | CS    | 201215122 | 2   |    90 |
| 201215122 | 刘晨   | 女   |   20 | CS    | 201215122 | 3   |    80 |
+-----------+--------+------+------+-------+-----------+-----+-------+
5 rows in set (0.001 sec)
```

若在等值连接中把目标列中重复的属性列去掉，则为`自然连接`：

```sql
MariaDB [S_T]> select student.sno,sname,ssex,sage,sdept,cno,grade from student,sc where student.sno=sc.sno;
+-----------+--------+------+------+-------+-----+-------+
| sno       | sname  | ssex | sage | sdept | cno | grade |
+-----------+--------+------+------+-------+-----+-------+
| 201215121 | 李勇   | 男   |   21 | CS    | 1   |    92 |
| 201215121 | 李勇   | 男   |   21 | CS    | 2   |    85 |
| 201215121 | 李勇   | 男   |   21 | CS    | 3   |    88 |
| 201215122 | 刘晨   | 女   |   20 | CS    | 2   |    90 |
| 201215122 | 刘晨   | 女   |   20 | CS    | 3   |    80 |
+-----------+--------+------+------+-------+-----+-------+
5 rows in set (0.000 sec)
```

### 自身连接

查询`SC`中课程间接先修课，需要通过取别名的方式：

```sql
MariaDB [S_T]> select first.cno,second.cpno
    -> from course first,course second
    -> where first.cpno=second.cno
    -> and second.cpno is not null
    -> order by first.cno;
+-----+------+
| cno | cpno |
+-----+------+
| 1   | 7    |
| 3   | 5    |
| 5   | 6    |
+-----+------+
3 rows in set (0.001 sec)
```

### 外连接

```sql
MariaDB [S_T]> select student.sno,sname,ssex,sage,sdept,cno,grade
    -> from student left outer join sc on (student.sno=sc.sno);
+-----------+--------+------+------+-------+------+-------+
| sno       | sname  | ssex | sage | sdept | cno  | grade |
+-----------+--------+------+------+-------+------+-------+
| 201215121 | 李勇   | 男   |   21 | CS    | 1    |    92 |
| 201215121 | 李勇   | 男   |   21 | CS    | 2    |    85 |
| 201215121 | 李勇   | 男   |   21 | CS    | 3    |    88 |
| 201215122 | 刘晨   | 女   |   20 | CS    | 2    |    90 |
| 201215122 | 刘晨   | 女   |   20 | CS    | 3    |    80 |
| 201215123 | 王敏   | 女   |   19 | MA    | NULL |  NULL |
| 201215125 | 张立   | 男   |   20 | IS    | NULL |  NULL |
+-----------+--------+------+------+-------+------+-------+
7 rows in set (0.000 sec)
```

利用`using`：

```sql
MariaDB [S_T]> select * from student left outer join sc using (sno);
+-----------+--------+------+------+-------+------+-------+
| Sno       | Sname  | Ssex | Sage | Sdept | Cno  | Grade |
+-----------+--------+------+------+-------+------+-------+
| 201215121 | 李勇   | 男   |   21 | CS    | 1    |    92 |
| 201215121 | 李勇   | 男   |   21 | CS    | 2    |    85 |
| 201215121 | 李勇   | 男   |   21 | CS    | 3    |    88 |
| 201215122 | 刘晨   | 女   |   20 | CS    | 2    |    90 |
| 201215122 | 刘晨   | 女   |   20 | CS    | 3    |    80 |
| 201215123 | 王敏   | 女   |   19 | MA    | NULL |  NULL |
| 201215125 | 张立   | 男   |   20 | IS    | NULL |  NULL |
+-----------+--------+------+------+-------+------+-------+
7 rows in set (0.000 sec)
```

### 多表连接

```sql
MariaDB [S_T]> select student.sno,sname,cname,grade
    -> from student,sc,course
    -> where student.sno=sc.sno and sc.cno=course.cno;
+-----------+--------+--------------+-------+
| sno       | sname  | cname        | grade |
+-----------+--------+--------------+-------+
| 201215122 | 刘晨   | 数学         |    90 |
| 201215122 | 刘晨   | 信息系统     |    80 |
| 201215121 | 李勇   | 数据库       |    92 |
| 201215121 | 李勇   | 数学         |    85 |
| 201215121 | 李勇   | 信息系统     |    88 |
+-----------+--------+--------------+-------+
5 rows in set (0.000 sec)
```

## 嵌套查询

在SQL语言中，一个`SELECT-FROM-WHERE`的语句称为一个`查询块`，将一个查询块嵌套在另一个查询块的`WHERE`子句或`HAVING`短语的条件中的查询，称为`嵌套查询`(nested query)。

### 带有IN谓词的子查询

```sql
MariaDB [S_T]> select *
    -> from student
    -> where sdept in(
    ->     select sdept
    ->     from student
    ->     where sname='李勇'
    -> );
+-----------+--------+------+------+-------+
| Sno       | Sname  | Ssex | Sage | Sdept |
+-----------+--------+------+------+-------+
| 201215121 | 李勇   | 男   |   21 | CS    |
| 201215122 | 刘晨   | 女   |   20 | CS    |
+-----------+--------+------+------+-------+
2 rows in set (0.000 sec)
```

子查询的查询条件不依赖于父查询，称为`不相关子查询`。

该🌰也可以通过`自身连接`实现：

```sql
MariaDB [S_T]> select s1.*
    -> from student s1,student s2
    -> where s1.sdept=s2.sdept and s2.sname='李勇';
+-----------+--------+------+------+-------+
| Sno       | Sname  | Ssex | Sage | Sdept |
+-----------+--------+------+------+-------+
| 201215121 | 李勇   | 男   |   21 | CS    |
| 201215122 | 刘晨   | 女   |   20 | CS    |
+-----------+--------+------+------+-------+
2 rows in set (0.000 sec)
```

### 带有比较运算符的子查询

`IN`换做比较运算符，用于确切知道内层查询返回单值。

### 带有ANY(SOME)或ALL谓词的子查询

查询非计算机专业中比计算机专业任意一位学生年龄小的学生姓名和年龄：

```sql
MariaDB [S_T]> select sname,sage
    -> from student
    -> where sage < any(
    ->     select sage
    ->     from student
    ->     where sdept = 'CS'
    -> )
    -> and sdept <> 'CS';
+--------+------+
| sname  | sage |
+--------+------+
| 王敏   |   19 |
| 张立   |   20 |
+--------+------+
2 rows in set (0.003 sec)
```

|      |  =   | <> 或 != |   <   |   <=   |   >   |   >=   |
| :--: | :--: | :------: | :---: | :----: | :---: | :----: |
| any  |  in  |          | < max | <= max | > min | >= min |
| all  |      |  not in  | < min | <= min | > max | >= max |

### 带有EXISTS谓词的子查询

带有`exists`谓词的子查询`不返回`任何数据，只产生逻辑真值`true`或逻辑假值`false`。

查询所有选修了1号课程的学生姓名：

```sql
MariaDB [S_T]> select sname
    -> from student
    -> where exists(
    ->     select *
    ->     from sc
    ->     where sno=student.sno and cno='1'
    -> );
+--------+
| sname  |
+--------+
| 李勇   |
+--------+
1 row in set (0.003 sec)
```

使用存在量词`exists`后，若内层查询结果非空，则外层的`where`子句返回真值，否则返回假值。

上例中子查询的查询条件依赖于外层父查询的某个属性值，是`相关子查询`。

相关子查询大概可以理解为循环（？

用`exist/not exist`可实现带全称量词的查询，比如查询

选修了全部课程的学生姓名<=>没有一门课是ta不选的：

```
select sname
from student
where not exists(
    select *
    from course
    where not exists(
        select *
        from sc
        where sno=student.sno and cno=course.cno
    )
);
```

> 淦，是真的想不通，有没有好兄弟教教我or2

## 集合查询

