const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "hamburger",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

inquirer
  .prompt([
    {
      type: "list",
      name: "menu",
      choices: [
        "View all employees",
        "Add employee",
        "Update employee",
        "View all roles",
        "Add role",
        "View all departments",
        "Add department",
        "Exit",
      ],
    },
  ])
  .then(({ menu }) => {
    console.log(menu);
    if (menu === "View all departments") {
      db.query(
        `SELECT  department.id  AS "ID", department.department_name AS "Department"
        FROM department`,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.table(result);
        }
      );
    } else if (menu === "View all roles") {
      db.query(
        `SELECT employee_role.id AS "ID", employee_role.title AS "Job Title", employee_role.department_id AS "Department Id", employee_role.salary AS "Salary"
            FROM employee_role`,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.table(result);
        }
      );
    } else if (menu === "View all employees") {
      db.query(
        `SELECT employee.id AS "ID", employee.first_name AS 'First Name', employee.last_name AS "Last Name", employee_role.title AS "Job Title", department.department_name AS "Department", employee_role.salary AS "Salary", CONCAT(employee.first_name,' ',employee.last_name) AS "manager"
        FROM employee
        JOIN employee_role ON employee.role_id = employee_role.id
        JOIN department ON (department.id = employee_role.department_id)
        INNER JOIN employee AS manager ON manager.id = employee.manager_id
        `,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.table(result);
        }
      );
    } else if (menu === "Add department") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "department",
            message: "What department do you want to add?",
          },
        ])
        .then(({ department }) => {
          db.query(
            `INSERT INTO department (department_name)
            VALUES ("${department}");
            `,
            (err, result) => {
              if (err) {
                console.log(err);
              }
              console.log(result);
            }
          );
        });
    }
  });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
