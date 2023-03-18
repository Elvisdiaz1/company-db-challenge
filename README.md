# <Employee-Tracker>

## Description

This application was built for the purposes of creating a application that allows you to view a mysql database and interact with it in the terminal using inquirer prompts. This company interactive database can allow you to view the database and add and update employee infomation. The application was created by using node.js, express, mysql, and inquirer as well as the console.table package to view the info in a table format and mysql2 to connect mysql to node.js. The reason why I did this application was so I can have a application to not only view the database made with mysql, but also to interact with it using the inquirer prompts to add and update infomation. I learned how to use mysql to create databases and insert data into them and also how to combine it with node.js to create an interactive application with the databases.

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To install this application, you need clone the repository. To clone the repository, you go to the green button on the repository that says "< > Code". Then you can choose to copy either the https url or the ssh url if you have a ssh key. After you copy the link, then you go to your terminal on your computer and in the terminal, you change the current directory to the directory you want to place the cloned repository in and then you type "git clone" and paste the url. Finally, you hit enter and the repository will be on your machine.

## Usage

This is a terminal based application. You need to activate the mysql datatbase so you have to go to the schema.sql file in the terminal and type "mysql -u root -p" to enter your password. From there, type "source schema.sql" and then "source seeds.sql" to place the data in the database. Then you need to open the terminal in your code editor or machine and go to the server.js in the folder. Then type "node server" or "npm start" to start the prompts. There is a list question for selecting the option you want to choose. You can view the departments and the employees or add roles, employees, and update the employee's role by selecting the corresponding choices. If you selected to add or update infomation, you will see questions which you will have to type the responses for in the terminal. Once you are done with the database, select the "exit" option to exit out of the database. At the moment, to keep the terminal prompts continuous, the prompts will erase the responses once you decide to press up or down arrows on the keyboard. Also this application can only add one new role and department as I couldn't figure out how to use the database to fill out the options so for the purposes of demostrating this application, only one new role and department will be added. A future update will occur to fix these issues as well as fixing the managers portion in the database.

![Tutorial Video](./Untitled_%20Mar%2018%2C%202023%204_04%20PM.webm)

## Credits

Inquirer- https://www.npmjs.com/package/inquirer/v/8.2.4

Node.js- https://nodejs.org/en

Express.js- https://www.npmjs.com/package/express

Console.table- https://www.npmjs.com/package/console.table

Mysql- https://www.mysql.com/downloads/

Mysql2- https://www.npmjs.com/package/mysql2

## License

MIT
