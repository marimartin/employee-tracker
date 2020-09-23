DROP DATABASE IF EXISTS employeeSummary_DB;

CREATE DATABASE employeeSummary_DB;

USE employeeSummary_DB;

CREATE TABLE department{
    id INT NOT NULL AUTO_INCREMBER,
    name VARCHAR
(30) NOT NULL,
    PRIMARY KEY
(id)
};

CREATE TABLE roll{
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR
(30) NOT NULL,
    salary DECIMAL,
    department-id INT NOT NULL REFERENCES department
(id),
    PRIMARY KEY
(id), 
};

CREATE TABLE employee{
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR
(30) NOT NULL,
    last_name VARCHAR
(30) NOT NULL,
    role_id - INT NOT NULL REFERENCES roll
(id),
    manager_id - INT,
    PRIMARY KEY
(id),
};