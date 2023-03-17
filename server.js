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
  .then((answer) => {
    console.log(answer);
  });

// Hardcoded query: DELETE FROM course_names WHERE id = 3;

// db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// // Query database
// db.query("SELECT * FROM course_names", function (err, results) {
//   console.log(results);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
