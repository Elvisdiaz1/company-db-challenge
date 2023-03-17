 DROP DATABASE IF EXISTS company_db;
 CREATE DATABASE company_db;

 Use company_db;

 CREATE TABLE department (
    id INT PRIMARY KEY,
    department_name VARCHAR(30)
 );

 CREATE TABLE employee_role(
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    FOREIGN KEY (department_id) REFERENCES department(id)
 );

 CREATE TABLE employee(
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    FOREIGN KEY (role_id) REFERENCES employee_role(id),
    FOREIGN KEY (manager_id) REFERENCES manager(id)
 );

 CREATE TABLE manager(
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30)
 );