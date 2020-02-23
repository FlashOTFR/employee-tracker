ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '5eku+aya';

DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(30),
	PRIMARY KEY(id)
);
 CREATE TABLE emprole (
	id int NOT NULL AUTO_INCREMENT,
    title varchar(30),
    salary decimal,
    department_id int,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
 );
 CREATE TABLE employee (
	id int NOT NULL AUTO_INCREMENT,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    department_id int,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES emprole(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
 );