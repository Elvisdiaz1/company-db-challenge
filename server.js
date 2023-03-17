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
    }
  });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
