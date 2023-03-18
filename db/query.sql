-- SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
--     FROM employee
--     LEFT JOIN employee manager on manager.id = employee.manager_id
--     INNER JOIN role ON (role.id = employee.role_id)
--     INNER JOIN department ON (department.id = role.department_id)
--     ORDER BY employee.id;`;

-- Departments query
-- Id and Department Names
SELECT  department.id  AS "ID", department.department_name AS "Department"
FROM department

-- Employee Role query
-- Id, Job Title, Department ID, Salary
SELECT employee_role.id AS "ID", employee_role.title AS "Job Title", employee_role.department_id AS "Department Id", employee_role.salary AS "Salary"
FROM employee_role

-- Employee query
-- Id, First Name, Last Name, Job Title, Department, Salary, Manager
SELECT employee.id AS "ID", employee.first_name AS 'First Name', employee.last_name AS "Last Name", employee_role.title AS "Job Title", department.department_name AS "Department", employee_role.salary AS "Salary", CONCAT(employee.first_name,' ',employee.last_name) AS "manager"
FROM employee
JOIN employee_role ON employee.role_id = employee_role.id
JOIN department ON (department.id = employee_role.department_id)
INNER JOIN employee AS manager ON manager.id = employee.manager_id

