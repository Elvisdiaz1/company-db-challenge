-- Department seed data
INSERT INTO department (department_name)
VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

-- Employee role seed data
INSERT INTO employee_role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 4), ("Salesperson", 80000, 4), ("Lead Engineer", 150000, 1), ("Accountant", 125000, 2), ("Laywer", 190000, 3);

-- Employee seed data
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Apple", "McSauce", 1, 1), ("Butter", "Sticks", 2, 2), ("Stan", "Howard", 3, NULL), ("Stu", "Coward", 3, 3), ("Mindy", "Ming", 4, 6), ("Alex", "Bale", 4, NULL), ("Libby", "Wilds", 5, NULL), ("Jackie", "Hernandez", 5, 7);