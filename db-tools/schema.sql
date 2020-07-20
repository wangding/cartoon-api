-- 创建 katong 数据库
drop database if exists test;
create database test default character set utf8mb4;

use test;

-- 创建表
drop table if exists `admins`;
create table `admins` (
  `id` int(11) not null auto_increment,
  `user_name` varchar(255) not null,
  `password` varchar(255) not null,
  `last_login_time` int(11) default '0',
  `last_login_ip` varchar(255) default '',
  `create_time` datetime not null,
  `update_time` datetime not null,
  `delete_time` datetime default null,
  primary key (`id`),
  unique key `user_name` (`user_name`)
) engine=innodb default charset=utf8mb4;

drop table if exists `areas`;
create table `areas` (
  `id` int(11) not null auto_increment,
  `area_name` varchar(255) not null comment '地区名',
  `create_time` datetime not null,
  `update_time` datetime not null,
  `delete_time` datetime default null,
  primary key (`id`),
  unique key `area_name` (`area_name`)
) engine=innodb default charset=utf8mb4;

drop table if exists `authors`;
create table `authors` (
  `id` int(11) not null auto_increment,
  `author_name` varchar(255) not null,
  `create_time` datetime not null,
  `update_time` datetime not null,
  `delete_time` datetime default null,
  primary key (`id`),
  unique key `author_name` (`author_name`)
) engine=innodb default charset=utf8mb4;

drop table if exists `books`;
create table `books` (
  `id` int(11) not null auto_increment,
  `unique_id` varchar(255) not null comment '漫画拼音名称标识',
  `book_name` varchar(255) not null comment '漫画名',
  `last_time` varchar(255) default '' comment '最后更新时间',
  `tags` varchar(255) default '' comment '分类',
  `summary` text comment '简介',
  `end` int(4) default '0' comment '0 为连载，1 为完结',
  `area_id` int(11) not null comment '漫画所属地区',
  `is_top` int(4) not null comment '是否推荐',
  `create_time` datetime not null,
  `update_time` datetime not null,
  `delete_time` datetime default null,
  primary key (`id`),
  unique key `unique_id` (`unique_id`),
  key `area_id` (`area_id`),
  key `tags` (`tags`) using btree,
  key `end` (`end`) using btree,
  key `is_top` (`is_top`) using btree,
  key `book_name` (`book_name`) using btree,
  fulltext key `fidx` (`book_name`,`summary`),
  constraint `books_ibfk_1` foreign key (`area_id`) references `areas` (`id`) on delete no action on update cascade
) engine=innodb default charset=utf8mb4;

drop table if exists `author_books`;
create table `author_books` (
  `id` int(11) not null auto_increment,
  `author_id` int(11) not null,
  `book_id` int(11) not null,
  `create_time` datetime not null,
  `update_time` datetime not null,
  `delete_time` datetime default null,
  primary key (`id`),
  key `author_id` (`author_id`),
  key `book_id` (`book_id`),
  constraint `author_books_ibfk_1` foreign key (`author_id`) references `authors` (`id`) on delete cascade on update cascade,
  constraint `author_books_ibfk_2` foreign key (`book_id`) references `books` (`id`) on delete cascade on update cascade
) engine=innodb default charset=utf8mb4;

drop table if exists `chapters`;
create table `chapters` (
  `id` int(11) not null auto_increment,
  `chapter_name` varchar(255) not null comment '章节名称',
  `book_id` int(11) not null comment '章节所属漫画 id',
  `chapter_order` decimal(10,0) not null comment '章节顺序',
  `create_time` datetime not null,
  `update_time` datetime not null,
  `delete_time` datetime default null,
  primary key (`id`),
  key `book_id` (`book_id`),
  key `chapter_name` (`chapter_name`) using btree,
  key `chapter_order` (`chapter_order`) using btree,
  constraint `chapters_ibfk_1` foreign key (`book_id`) references `books` (`id`) on delete cascade on update cascade
) engine=innodb default charset=utf8mb4;

drop table if exists `messages`;
create table `messages` (
  `id` int(11) not null auto_increment,
  `msg_key` int(11) not null comment '留言用户 id，或受回复消息 id',
  `type` int(4) not null comment '留言类型：0 用户留言，1 是回复',
  `content` text,
  `create_time` datetime not null,
  `update_time` datetime not null,
  `delete_time` datetime default null,
  primary key (`id`),
  key `msg_key` (`msg_key`) using btree,
  key `type` (`type`) using btree
) engine=innodb default charset=utf8mb4;

drop table if exists `pictures`;
create table `pictures` (
  `id` int(11) not null auto_increment,
  `chapter_id` int(11) not null,
  `pic_order` decimal(10,0) not null comment '图片顺序',
  `create_time` datetime not null,
  `update_time` datetime not null,
  `delete_time` datetime default null,
  primary key (`id`),
  key `chapter_id` (`chapter_id`),
  key `pic_order` (`pic_order`) using btree,
  constraint `pictures_ibfk_1` foreign key (`chapter_id`) references `chapters` (`id`) on delete cascade on update cascade
) engine=innodb default charset=utf8mb4;

drop table if exists `tags`;
create table `tags` (
  `id` int(11) not null auto_increment,
  `tag_name` varchar(255) not null comment '分类名',
  `create_time` datetime not null,
  `update_time` datetime not null,
  `delete_time` datetime default null,
  primary key (`id`),
  unique key `tag_name` (`tag_name`)
) engine=innodb default charset=utf8mb4;

drop table if exists `users`;
create table `users` (
  `id` int(11) not null auto_increment,
  `user_name` varchar(255) not null,
  `nick_name` varchar(255) default '',
  `mobile` char(11) default '',
  `password` varchar(255) not null,
  `last_login_time` int(11) default '0',
  `create_time` datetime not null,
  `update_time` datetime not null,
  `delete_time` datetime default null,
  primary key (`id`),
  unique key `user_name` (`user_name`),
  key `mobile` (`mobile`) using btree
) engine=innodb default charset=utf8mb4;

drop table if exists `comments`;
create table `comments` (
  `id` int(11) not null auto_increment,
  `user_id` int(11) not null,
  `book_id` int(11) not null,
  `comment` text not null,
  `create_time` datetime not null,
  `update_time` datetime not null,
  `delete_time` datetime default null,
  primary key (`id`),
  key `user_id` (`user_id`),
  key `book_id` (`book_id`),
  constraint `comments_ibfk_1` foreign key (`user_id`) references `users` (`id`) on delete cascade on update cascade,
  constraint `comments_ibfk_2` foreign key (`book_id`) references `books` (`id`) on delete cascade on update cascade
) engine=innodb default charset=utf8mb4;

drop table if exists `user_books`;
create table `user_books` (
  `id` int(11) not null auto_increment,
  `user_id` int(11) not null,
  `book_id` int(11) not null comment '用户收藏的漫画 id',
  `create_time` datetime not null,
  `update_time` datetime not null,
  `delete_time` datetime default null,
  primary key (`id`),
  key `user_id` (`user_id`),
  key `book_id` (`book_id`),
  constraint `user_books_ibfk_1` foreign key (`user_id`) references `users` (`id`) on delete cascade on update cascade,
  constraint `user_books_ibfk_2` foreign key (`book_id`) references `books` (`id`) on delete cascade on update cascade
) engine=innodb default charset=utf8mb4;

-- 创建视图

drop view if exists book_stat_area_views;
create view book_stat_area_views
as
select a.id, a.area_name, an.count
from (
  select area_id, count(id) as count
  from books
  group by area_id) as an
join areas as a
on a.id = an.area_id
order by a.id;

drop view if exists book_views;
create view book_views
as
select
  bk.id,
  bk.unique_id,
  bk.book_name,
  group_concat(bk.author_name separator ', ') as author_name,
  bk.last_time,
  bk.tags,
  bk.summary,
  bk.`end`,
  bk.area_name,
  bk.is_top
from (
  select b.id, unique_id, book_name, last_time, tags, summary, `end`, is_top, ar.area_name, a.author_name
  from books as b
  join author_books as ab
  on b.id = ab.book_id
  join authors as a
  on ab.author_id = a.id
  join areas as ar
  on b.area_id = ar.id) as bk
group by bk.id
order by bk.id;

drop view if exists author_views;
create view author_views
as
select au.id, au.author_name, count(au.book_Id) as book_count, au.create_time, au.update_time
from (
  select a.*, ab.book_id
  from authors as a
  left join author_books as ab
  on a.id = ab.author_id) as au
group by au.id;
