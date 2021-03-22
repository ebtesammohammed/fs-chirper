create database chirpr;
use chirpr;

create table users(
id int not null auto_increment primary key,
name varchar(50) not null,
email varchar(50) not null,
password varchar(50) null,
_created datetime default current_timestamp
);

create table chrips (
id int not null auto_increment primary key,
userid int not null,
content varchar(150) not null,
location varchar(100),
_created datetime default current_timestamp
);

ALTER TABLE chrips
ADD FOREIGN KEY (userid) REFERENCES users(id);

insert into users(name, email, password) values
("Sam", "sam@yahoo.com", "12345"),
("Afrah", "afrah@yahoo.com", "12345"),
("RJ", "rj@yahoo.com", "12345"),
("Jake", "jake@yahoo.com", "12345"),
("Robert", "robert@yahoo.com", "12345"),
("Cimi", "cimi@yahoo.com", "12345"),
("Jason", "jason@yahoo.com", "12345"),
("Josh", "josh@yahoo.com", "12345"),
("Jeremiah", "jeremiah@yahoo.com", "12345"),
("Kelsey", "kelsey@yahoo.com", "12345");

insert into chrips(userid, content, location) values
(1, 'hello world', 'alabama'),
(2, ' world', 'birmingham'),
(3, 'hello', 'jasper'),
(4, 'how are you?', 'mongomery'),
(5, 'thinking', 'alabster'),
(6, 'weekend fun', 'ensley'),
(10, 'saturday night', 'trussville'),
(9, 'friday', 'hoover'),
(8, 'thursday', 'homewood'),
(7, 'tuesday', 'home'),
(11, 'monday', 'mobile'),
(12, 'tomorrow', 'calera'),
(13, 'today', 'gadston'),
(1, 'hello world', 'alabama'),
(2, ' world', 'birmingham'),
(3, 'hello', 'jasper'),
(4, 'how are you?', 'mongomery'),
(5, 'thinking', 'alabster'),
(6, 'weekend fun', 'ensley'),
(10, 'saturday night', 'trussville'),
(9, 'friday', 'hoover'),
(8, 'thursday', 'homewood'),
(7, 'tuesday', 'home'),
(11, 'monday', 'mobile'),
(12, 'tomorrow', 'calera'),
(13, 'today', 'gadston'),
(1, 'hello world', 'alabama'),
(2, ' world', 'birmingham'),
(3, 'hello', 'jasper'),
(4, 'how are you?', 'mongomery'),
(5, 'thinking', 'alabster'),
(6, 'weekend fun', 'ensley'),
(10, 'saturday night', 'trussville'),
(9, 'friday', 'hoover'),
(8, 'thursday', 'homewood'),
(7, 'tuesday', 'home'),
(11, 'monday', 'mobile'),
(12, 'tomorrow', 'calera'),
(13, 'today', 'gadston');

select chrips.* from chrips;
select users.* from users;
SELECT
 users.name,
 chrips.*
 FROM chrips 
 JOIN users ON users.id = chrips.userid;

