#!/usr/bin/env node
'use strict';

//require sqlite
const sqlite3 = require('sqlite3').verbose();

//create new sqlite database
const db = new sqlite3.Database('bangazon.sqlite', (err) =>
	console.log('connected'));

//create customer table
db.run("CREATE TABLE IF NOT EXISTS customers (id INT PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, street_address TEXT NOT NULL, city TEXT NOT NULL, state TEXT NOT NULL, postal_code INT NOT NULL, phone_number INT NOT NULL)");

//create payment options table
db.run("CREATE TABLE IF NOT EXISTS payment_options (pmt_opt_id INT PRIMARY KEY, pmt_opt_name TEXT NOT NULL, pmt_opt_acc_num INT NOT NULL)");

//create products table
db.run("CREATE TABLE IF NOT EXISTS products (product_id INT PRIMARY KEY, product_name TEXT NOT NULL, pmt_opt_acc_num INT NOT NULL, FOREIGN KEY(pmt_opt_acc_num) REFERENCES payment_options(pmt_opt_acc_num))");

//create orders table
db.run("CREATE TABLE IF NOT EXISTS orders (order_id INT PRIMARY KEY, customer_id INT NOT NULL, pmt_opt_id INT NOT NULL, order_fully_paid INT(-1, 1) NOT NULL DEFAULT'-1', FOREIGN KEY(customer_id) REFERENCES customers(id), FOREIGN KEY(pmt_opt_id) REFERENCES payment_options(id))")

//create order line items table
db.run("CREATE TABLE IF NOT EXISTS order_line_items (order_line_items_id INT PRIMARY KEY, order_id INT NOT NULL, product_id INT NOT NULL, FOREIGN KEY(order_id) REFERENCES orders(order_id), FOREIGN KEY(product_id) REFERENCES products(product_id))")

// db.run("DROP TABLE products");
