# employee-tracker 
  <p align="left">
    <img src="https://img.shields.io/github/repo-size/deeparkrish/employee-tracker" />
    <img src="https://img.shields.io/github/languages/top/deeparkrish/employee-tracker"  />
    <img src="https://img.shields.io/github/issues/deeparkrish/employee-tracker" />
    <img src="https://img.shields.io/github/last-commit/deeparkrish/employee-tracker" >   
  </p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)<br />

  ## Description
 A command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL.
  
 
  ## Table of Contents 
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Process](#process)
  * [Pseudocode](#pseudocode)
  * [MockUp](#mockup)
  * [ProjectDemo](#projectdemo)
  * [Testing](#testing)
  * [ProjectRepo](#projectrepo)
  * [Contribution](#contribution)
  
  
  ##  Installation
    npm install msql2  inquirer console.table 
    npm i figlet
    Starting the Server :mysql  -u root -p

  ##  Usage
    node server

  ## License 
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)<br />
  This app is covered under MIT license.
  
  ## Process
  At the  start of the application (node server ),
  * The user is  presented with the following options: 
             * View All Employees
             * View All Employees By Department
             * View All Employees By Role
             * View All Employees By Manager
             * Add Employe
             * Remove Employe
             * Update Employee Role
             * Update Employee Manager
             * View All Role
             * Add Role
             * Remove Role
             * View All Departments
             * Total Utilized Budget of a Department
             * Add Department
             * Remove Department
             * Exit
  * When the user chooses to view all departments,he has been presented with a formatted table showing department names and department ids
  * When the user chooses to view all roles,he has been presented with the job title, role id, the department that role belongs to, and the salary for that role.
  * When the choose to view all employees,he has been presented with a formatted table showing employee data, including employee ids, first names, last names,      job titles, departments, salaries, and managers that the employees report to.
  * The employees data can be viewed by department , by role or by theri Manager based on user 's choice.
  * When the user chooses to add a department,he has been prompted to enter the name of the department and that department is added to the database.
  * When the user chooses to add a role,he has been prompted to enter the  role title , salary,and departmen and that role is added to the database.
  * When the user choose to add an employee he has been prompted to enter the employee’s first name, last name, role, and manager and that employee is added to     the database
  * When the user chooses to update an employee role he is prompted to select an employee to update and their new role and this information is updated in the       database.
  * When the user chooses to update an employee manager he is prompted to select an employee to update and their new manager and this information is updated in     the database.
  * The total budget for a Depatment is displayed as table by adding the salaries of all individual employees.
  * Each input is  validated and sent as SQL query to the database. 
  * The application is exited  when the user chooses Exit option.
  * The application has #CRUD functionality.
 

  ## Pseudocode
  ![Webpage](https://github.com/Deeparkrish/Team-Profile-Generator/blob/main/src/img/flow-chart.jpeg)
  ![Webpage](https://github.com/Deeparkrish/Team-Profile-Generator/blob/main/src/img/Pseudocode.jpeg)
  ![Webpage](https://github.com/Deeparkrish/Team-Profile-Generator/blob/main/src/img/pseudo1.jpeg)
  ![Webpage](https://github.com/Deeparkrish/Team-Profile-Generator/blob/main/src/img/pseudo2.jpeg)
  
  
  
  ##  Mockup
   ![Webpage](https://github.com/Deeparkrish/Team-Profile-Generator/blob/main/src/img/mockup1.png)
  
  ##  ProjectDemo
  [![Youtube](https://img.youtube.com/vi/w_SiYzG9_kI/0.jpg)](https://www.youtube.com/embed/w_SiYzG9_kI)

  ## Testing
  The SQL commands have been tested using SQL workbench and also using sql2 prompt in command line
  
  ## ProjectRepo 
  Git hub link: https://github.com/Deeparkrish/employee-tracker

  ## Contribution
  Created with ❤️ by [Deepa Krishnan](https://github.com/DeeparKrish/README-generator)


