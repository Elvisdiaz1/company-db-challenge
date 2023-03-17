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