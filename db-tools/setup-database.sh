#!/bin/bash

# 建库，建表，建视图
mysql -h 127.0.0.1 -u root -p < ./schema.sql

# 初始化漫画书基础数据

# 初始化 areas 表数据
node init-areas-data.js

# 初始化 tags 表，authors 表，books 表的数据
node init-tags-authors-books-data.js

# 初始化 author_books 表的数据
node init-author_books-data.js
