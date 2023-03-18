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

function prompt() {
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
      //   View All Departments
      if (menu === "View all departments") {
        db.query(
          `SELECT  department.id  AS "ID", department.department_name AS "Department"
        FROM department`,
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
          },
          //   Reactivate the prompts
          prompt()
        );
      }
      //   View All Roles
      else if (menu === "View all roles") {
        db.query(
          `SELECT employee_role.id AS "ID", employee_role.title AS "Job Title", employee_role.department_id AS "Department Id", employee_role.salary AS "Salary"
            FROM employee_role`,
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
          },
          //   Reactivate the prompts
          prompt()
        );
      }
      //   Exiting the prompts
      else if (menu === "Exit") {
        db.end();
        console.log("Terminal closed");
      }
      //   View all employees
      else if (menu === "View all employees") {
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
          },
          //   Reactivate the prompots
          prompt()
        );
      }
      //   Add Departments
      else if (menu === "Add department") {
        // Secondary Prompt to add a department
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
                console.log(`Added ${department} to database`);
              }
            ),
              // Reactivate the original prompts
              prompt();
          });
      }
      //   Adding new roles
      else if (menu === "Add role") {
        // Secondary prompts to add a new role based on role, salary, and department
        inquirer
          .prompt([
            {
              type: "input",
              name: "role",
              message: "What role do you want to add?",
            },
            {
              type: "input",
              name: "salary",
              message: "What is the salary?",
            },
            {
              type: "list",
              name: "department_list",
              message:
                "What department does it belong to? Engineering is 1, Finance is 2, Legal is 3, Sales is 4, Other is 5",
              choices: [1, 2, 3, 4, 5],
            },
          ])
          .then(({ role, salary, department_list }) => {
            db.query(
              `INSERT INTO employee_role (title, salary, department_id)
            VALUES ("${role}", ${salary}, ${department_list});
            `,
              (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(`Added ${role} to database`);
              }
            ),
              // Reactivate the original prompts
              prompt();
          });
      }
      //   Adding a new employee
      else if (menu === "Add employee") {
        // Secondary prompts to add a new employee based on name, role, and manager
        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "What is the employee's first name?",
            },
            {
              type: "input",
              name: "last_name",
              message: "What is the employee's last name?",
            },
            {
              type: "list",
              name: "role",
              message:
                "What is their role? Sales Lead is 1, Salesperson is 2, Lead Engineer is 3, Accountant is 4, Lawyer is 5, Other is 6",
              choices: [1, 2, 3, 4, 5, 6],
            },
            {
              type: "list",
              name: "manager",
              message:
                "Who is their manager? Null is no manager, Engineering manager is 1, Finance manager is 2, Legal manager is 3, Sales manager is 4, manager in other categories is 5",
              choices: ["Null", 1, 2, 3, 4, 5],
            },
          ])
          .then(({ first_name, last_name, role, manager }) => {
            db.query(
              `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ("${first_name}", "${last_name}", ${role}, ${manager});
            `,
              (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(`Added ${first_name} ${last_name} to database`);
              }
            ),
              // Reactivate the original prompts
              prompt();
          });
      }
      //   Updating an employee's role
      else if (menu === "Update employee") {
        // Updating the role based on the employee id and role
        inquirer
          .prompt([
            {
              type: "list",
              name: "employeeId",
              message:
                "Who is the employee? Apple McSauce is 1, Butter Sticks is 2, Stan Howard is 3, Stu Coward is 4, Mindy Ming is 5, Alex Bale is 6, Libby Wilds is 7, Jackie Hernandez is 8, New Employee is 9",
              choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            },
            {
              type: "list",
              name: "role",
              message:
                "What is their updated role? Sales Lead is 1, Salesperson is 2, Lead Engineer is 3, Accountant is 4, Lawyer is 5, Other is 6",
              choices: [1, 2, 3, 4, 5, 6],
            },
          ])
          .then(({ role, employeeId }) => {
            db.query(
              `UPDATE employee 
            SET role_id = ${role}
            WHERE employee.id = ${employeeId}`,
              (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(`updated the role`);
              }
            ),
              prompt();
          });
      }
    });
}
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

prompt();
