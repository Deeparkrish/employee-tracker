DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department(
    id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
  id INT  UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(50) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INTEGER UNSIGNED NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE 
);

CREATE TABLE employee( 
    id INTEGER  UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INTEGER UNSIGNED NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INTEGER  UNSIGNED ,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
    );


