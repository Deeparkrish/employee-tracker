INSERT INTO department(dept_name)
VALUES
('Marketing/Sales'),
('Human Resources'),
('R&D'),
('Accounts/Finance'),
('Customer Support'),
('Engineering');

INSERT INTO roles (title, salary,department_id)
VALUES
('Manager',10,000.99,1),
('Lead Engineer',6999.99,3),
('Accountant',8999.99,4),
('Specialist',9999.99,5)
('Admin',8999.99,4),
('Intern',5999.99,2);

INSERT INTO employee (first_name, last_name,role_id,manager_id)
VALUES
('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 4, NULL),
  ('Charles', 'LeRoi', 2, 5),
  ('Katherine', 'Mansfield', 2, 3),
  ('Dora', 'Carrington', 3, NULL);