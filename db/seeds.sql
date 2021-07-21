USE employees;
INSERT INTO department(department_name)
VALUES
('Marketing/Sales'),
('Human Resources'),
('R&D'),
('Accounts/Finance'),
('Customer Support'),
('Engineering');

 INSERT INTO role(title, salary,department_id)
VALUES
('Manager',10000,1),
('Lead Engineer',6999,3),
('Accountant',8999,4),
('Specialist',9999,5),
('Admin',8999,2),
('Intern',5999,2);

INSERT INTO employee (first_name, last_name,role_id,manager_id)
VALUES
('Ronald','Firbank',1,1),
  ('Virginia','Woolf',1,1),
  ('Piers','Gaveston',4,NULL),
  ('Charles','LeRoi',2,1),
  ('Katherine','Mansfield',2,1),
  ('Dora','Carrington',3,NULL);
 