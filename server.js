//Adding Dependencies 
const db = require('./db/connection'); // connection to database 
const inquirer = require('inquirer')  // to get prompt user and get inputs 
const figlet = require('figlet'); // for displaying the app title 
const chalk = require('chalk'); // color the table data 
const cTable =require('console.table'); // display data in table format 

// Connect to Database
db.connect(err =>{
    if (err) throw err;
    else {
    console.log('Database connected.');
    // call inquirer prompt 
    promptUserInput();
    }
}); 

//The figlet npm that displays the app name on the console
console.log(chalk.yellow.bold(`====================================================================================`));
console.log(``);
console.log(chalk.greenBright.bold(figlet.textSync('Employee-Tracker')));
console.log(``);
console.log(``);                                                        
console.log(``);
console.log(chalk.yellow.bold(`====================================================================================`));

//<<****************************************** INQUIRER PROMPT *****************************************************************>>
// User response from inquirer
function promptUserInput (){
    inquirer
    .prompt([
        {
          name: 'userchoice',
          type: 'list',
          message: 'Please select an option:',
          choices: [
            'View All Employees',
            'View All Employees By Department',
            'View All Employees By Role',
            'View All Employees By Manager',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'View All Roles',
            'Add Role',
            'Remove Role',
            'View All Departments',
            'Total Utilized Budget of a Department',
            'Add Department',
            'Remove Department',
            'Exit'
            ]
        }
    ])
  .then(({ userchoice }) =>{
        switch(userchoice){
            case "View All Employees":
                console.log("View all Employees");
                viewAllEmp();
                break;
            case "View All Employees By Department":
                viewAllEmpByDept();
                break;

            case "View All Employees By Role":
                viewAllEmpByRole();
                break;

            case "View All Employees By Manager":
                viewEmpByMgr();
                break;
            case "Add Employee":
                addEmp();
                break;
            case "Remove Employee":
                removeEmp();
                break;
            case "Update Employee Role":
                updateEmp();
                break;
            case "Update Employee Manager":
                updateEmpMgr();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "Remove Role":
                removeRole();
                break;
            case "View All Departments":
                viewAllDepts();
                break;
            case "Add Department":
                addDept();
                break;
            case "Remove Department":
                removeDept();
                break;
            case "Total Utilized Budget of a Department":
                viewDeptBudget();
                break;
            case "Exit":
                db.end(); 
                break;
            

        }

    });
    
};

///<<****************************************** BEGIN VIEW FUNCTIONS *****************************************************************>>

//<<****************************************** View All Employees  *****************************************************************>>
// VIew All the Employess along with their role and salary 
function viewAllEmp(){
    const  sql = `SELECT employee.id ,employee.first_name,employee.last_name,role.title,role.salary,department.name 
    FROM employee,role, department 
    WHERE employee.role_id = role.id AND role.department_id =department.id 
    ORDER BY employee.id ASC;` 
    db.query(sql, (err, response) => {
        if (err) {
        throw(err); 
        return;
        }
        console.log(``);
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(` Employees Table`));
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.table(response);
        console.log(chalk.yellow.bold(`====================================================================================`));
     });
     promptUserInput();
};
//<<****************************************** View All Roles  *****************************************************************>>
//View all possbile  roles  from role table  along with the departments the role is assigned to 
function viewAllRoles(){
    const  sql = `SELECT role.id AS ID,role.title AS Role ,department.name AS Department,role.salary AS Salary
    FROM role,department
    WHERE  role.department_id =department.id
    ORDER BY role.id ASC;` 
    db.query(sql, (err, response) => {
        if (err) {
        throw(err); 
        return;
        }
        console.log(``);
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(` Employee Roles Table`));
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.table(response);
        console.log(chalk.yellow.bold(`====================================================================================`));
     });
     promptUserInput();
};
//<<****************************************** View All Departments*****************************************************************>>
// View all the departments from deparmtent table.
function viewAllDepts(){
    const  sql = `SELECT * from department
    ORDER BY department.id ASC;` 
    db.promise().query(sql)
    .then(response =>{
        console.log(``);
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(` Department Table`));
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.table(response[0]);
        console.log(chalk.yellow.bold(`====================================================================================`));
    })
    .catch(e =>{
        console.log(e);
    });
     promptUserInput();
};
//<<****************************************** View Employees by Role *****************************************************************>>
// View all the employees by their role 
function viewAllEmpByRole(){
    const sql =`SELECT employee.id AS Employee_ID,CONCAT (employee.first_name," ",employee.last_name) AS Employee_Name ,role.title AS Role
    FROM employee
    LEFT JOIN role ON employee.role_id =role.id
    ORDER BY role.id ASC;`
    db.query(sql, (err, response) => {
        if (err) {
        throw(err); 
        return;
        }
        console.log(``);
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(` Employees by Role Table`));
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.table(response);
        console.log(chalk.yellow.bold(`====================================================================================`));
    });
    promptUserInput();

}
//<<****************************************** View Employees by Department **************************************************************>>
// View the employees and the deparmtent they belong 
function viewAllEmpByDept(){
    const sql =`SELECT employee.id AS Employee_ID,CONCAT (employee.first_name," ",employee.last_name) AS Employee_Name,department.name AS Department 
    FROM employee
    LEFT JOIN role ON employee.role_id =role.id 
    LEFT JOIN department ON role.department_id =department.id
    ORDER BY employee.id ASC;`
    db.query(sql, (err, response) => {
        if (err) {
        throw(err); 
        return;
        }
        console.log(``);
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(` Employees by Department`));
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.table((response));
        console.log(chalk.yellow.bold(`====================================================================================`));
    });
    promptUserInput();
}
//<<****************************************** View Department Budget *****************************************************************>>
// View the budget of every dept but summing  up the salaries of employees in that department 
function viewDeptBudget(){
    const sql =`SELECT department.name AS Department,SUM(role.salary) AS Budget
    FROM employee,department,role 
    WHERE  role.department_id =department.id 
    AND 
    employee.role_id =role.id
    GROUP BY department.id;`
    db.query(sql, (err, response) => {
        if (err) {
        throw(err); 
        return;
        }
        console.log(``);
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(` Total Budget by Department`));
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.table((response));
        console.log(chalk.yellow.bold(`====================================================================================`));
    
        });
    promptUserInput();
}
//<<****************************************** View Employee by Manager *****************************************************************>>
// View the list of managers and employees assigned to them 
function viewEmpByMgr(){
    
        const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS Manager, department.name AS department, employee.id AS EmployeeID, CONCAT(employee.first_name, employee.last_name) AS Employee_Name, role.title AS Role
        FROM employee
        LEFT JOIN employee manager on manager.id = employee.manager_id
        INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
        INNER JOIN department ON (department.id = role.department_id)
        ORDER BY manager;`;
        db.query(query, (err, response) => {
            if (err) throw err;

        console.log(``);
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(`View Employees by Managers`));
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.table((response));
        console.log(chalk.yellow.bold(`====================================================================================`));
    });
    promptUserInput();
}
//<<****************************************** END VIEW FUNCTIONS *****************************************************************>>

//<<****************************************** BEGIN DELETE FUNCTIONS *****************************************************************>>

//<***********************************************Remove a Role *************************************************************************>>
// Remove a role from role table 
function removeRole(){
    const sql = `SELECT title FROM role`;
    db.query(sql, (err,response) =>{
        if(err){
            throw(err);
            return;
        }
        // Select the roles from role table and store into an arr 
        let roleTitleArr =[];
        response.forEach(role => {
            roleTitleArr.push(role.title);
        })
        // Ask the user to pick the role to be removed 
        inquirer
        .prompt([
          {
            name: 'roleChoice',
            type: 'list',
            message: 'Choose the role you would like to remove?',
            choices: roleTitleArr
          }
        ])
        // Upon response fetch the corresponding record. 
        .then (({roleChoice})=>{
            response.forEach(role => {
                if(roleChoice ===role.title){
                    deleteRoleRecord(roleChoice);
                }
            })
        });
        });
}
// delete a role record  from role table 
function deleteRoleRecord(roleTitle){
    db.query(`DELETE FROM role WHERE title = ?`, roleTitle, (err, response) => {
        if (err) {
          console.log(err);
        }
        console.log(chalk.redBright.bold(`====================================================================================`));
        console.log(chalk.greenBright(`Role Successfully Removed`));
        console.log(chalk.redBright.bold(`====================================================================================`));
        viewAllRoles(); // display the role table 
      });
    }

//<<****************************************** Remove Department *****************************************************************>>

// function to remove a department from department table 
function removeDept() {
    chooseDept('remove') // call choosedept  with action as remove
}

function chooseDept(operation){
    const sql = `SELECT * FROM department`; // get the department data 
    db.query(sql,(err,response) =>{
        if(err){
            throw(err);
            return;
        }
        // store the department name in an Arr 
        let deptNameArr =[];
        response.forEach(dept => {
            deptNameArr.push(dept.name);
        });
        // Ask the user which department to be removed 
        inquirer
        .prompt([
          {
            name: 'deptChoice',
            type: 'list',
            message: 'Choose the department name:',
            choices: deptNameArr
          }
        ])
        // based on user choice look for the dept record 
        .then (({deptChoice})=>{     
            response.forEach(dept => {
                if(deptChoice === dept.name){
                    if (operation ==='remove'){// call delete dept record 
                    deleteDeptRecord(deptChoice);}
                    else if(operation ==='linkrole') // if operation is linkrole (when a role is added its linked to a dept of user choice)
                    {

                    let tempId = dept.id;
                    addDeptToRole(tempId) // link the department to the role table 
                    }
                }
            });
        });
    });
}
// Remove department name from department table 
function deleteDeptRecord(deptName){    
    db.query(`DELETE FROM department WHERE name = ?`, deptName, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(chalk.redBright.bold(`====================================================================================`));
        console.log(chalk.greenBright(`Department record Successfully Removed`));
        console.log(chalk.redBright.bold(`====================================================================================`));
        viewAllDepts();
      });
};

//<<****************************************** Remove an Employee *****************************************************************>>

function removeEmp() {
    chooseEmployee('delete'); // call Chooseemployee with action as delete 
}
// Choose the employee on whom the /action  as to be perfomed 
function chooseEmployee(operation){
   const sql = `SELECT employee.first_name, employee.last_name,employee.id FROM employee`; // Get existing emp data from table 
    db.query(sql,(err,response) =>{
        if(err){
            throw(err);
            return;
        }
        // store the emp names in an Array 
        let empNameArr =[];
        response.forEach(employee => {
            empNameArr.push(`${employee.first_name} ${employee.last_name}`);
        });
        // Aks the user to choose the employee 
        inquirer
        .prompt([
          {
            name: 'empChoice',
            type: 'list',
            message: 'Choose the employee you would like to remove?',
            choices: empNameArr
          }
        ])
        // based on user choice find the record in the table 
        .then (({empChoice})=>{     
            response.forEach(employee => {
                if(empChoice === `${employee.first_name} ${employee.last_name}`){
                    let empId =employee.id;
                    if(operation==='delete') // If we have to remove employee call deleteEmpRecord 
                    deleteEmpRecord(empId);
                    if(operation==='update') // If we have to update that employee's role  info  call updateEmpRole 
                    updateEmpRole(empId);
                }
            })
        });
    });
}
// Function to remove an employee record from employee table 
function deleteEmpRecord(empId){    
    db.query(`DELETE FROM employee WHERE id = ?`, [empId], (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(chalk.redBright.bold(`====================================================================================`));
        console.log(chalk.greenBright(`Employee Successfully Removed`));
        console.log(chalk.redBright.bold(`====================================================================================`));
        viewAllEmp();
      });
};
//<<****************************************** END DELETEFUNCTIONS *****************************************************************>>

//<<****************************************** BEGIN UPDATE FUNCTIONS *****************************************************************>>

//<**********************************************Update Employee Table********************************************************************>
// Update Employee data 
function updateEmp() {
    chooseEmployee('update'); // call chooseemployee with action update 
}
// update the role details of  the chosen employee Id 
function updateEmpRole(empId){
    const sql = `SELECT * FROM role`; // get the existing role data from role table 
    db.query(sql, (err,response) =>{
        if(err){
            throw(err);
            return;
        }
        // store the role titles in an Array 
        let roleTitleArr =[];
        response.forEach(role => {
            roleTitleArr.push(role.title);
        })
        // Prompt user to  pick a role  to be updated 
        inquirer
        .prompt([
          {
            name: 'roleChoice',
            type: 'list',
            message: 'Choose the  new role you would like to assign',
            choices: roleTitleArr
          }
        ])
        // based on user choice fecth the corresponding record from role table
        .then (({roleChoice})=>{
            response.forEach(role => {
                if(roleChoice ===role.title){
                    let roleId =role.id; // get the role id 
                    updateRole(roleId,empId); // call updateRole function with the chose empId and roleId 
                }
            })
        });
        });
}

// Update the role of an employee based on his id and his role_id 
function updateRole(newRoleId,empId){
    let sql =    `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
            db.query(
              sql,
              [newRoleId, empId],
              (error) => {
                if (error) throw error;
                console.log(chalk.greenBright.bold(`====================================================================================`));
                console.log(chalk.greenBright(`Employee Role Updated`));
                console.log(chalk.greenBright.bold(`====================================================================================`));
                viewAllEmpByRole();
              }
            );
}

  //<<****************************************** Update Employee Manager******************************************************************>>
// Change an employee's manager 
function  updateEmpMgr()  {
    // get the employee details from table 
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id 
    FROM employee`;
    db.query(sql, (error, response) => {
        // Store the employee name in an Array 
        let employeeNamesArr = [];
        // Ask the user to pick the employee whose manager needs to be changed  
        // Ask the user to pick the new manager name from the list 
        response.forEach((employee) => {employeeNamesArr.push(`${employee.first_name} ${employee.last_name}`);});  
    inquirer

        .prompt([
          {
            name: 'chosenEmployee',
            type: 'list',
            message: 'Choose the employee whose manager needs to be updated',
            choices: employeeNamesArr
          },
          {
            name: 'newManager',
            type: 'list',
            message: 'Choose a manager too assign ',
            choices: employeeNamesArr
          }
        ])

        .then((answer) => {
          // Validate the user selection  
          let employeeId, managerId;
          response.forEach((employee) => {
            if (
              answer.chosenEmployee === `${employee.first_name} ${employee.last_name}`
            ) {
              employeeId = employee.id;
              let empRole = employee.role_id;
            }

            if (
              answer.newManager === `${employee.first_name} ${employee.last_name}`
            ) {
              managerId = employee.id;
            }
          });
          // The employee name and manager name are same declare it as invalid choice.
          if ((answer.chosenEmployee=== answer.newManager)) {
            console.log(chalk.redBright.bold(`====================================================================================`));
            console.log(chalk.redBright(`Invalid Manager Selection`));
            console.log(chalk.redBright.bold(`====================================================================================`));
            promptUserInput();
          } else { // Update the employee's Manager 
            let sql = `UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?`;

            db.query(
              sql,
              [managerId, employeeId],
              (error) => {
                if (error) throw error;
                console.log(chalk.greenBright.bold(`====================================================================================`));
                console.log(chalk.greenBright(`Employee Manager Updated`));
                console.log(chalk.greenBright.bold(`====================================================================================`));
                viewAllEmp();
              
              }
            );
          }
        });
    });
};
//<<********************************************END OF UPDATE FUNCTIONS******************************************************************>>

//<<**********************************************BEGIN ADD FUNCTIONS *******************************************************************>>

//<<************************************************ Add a Department ********************************************************************>>
function addDept()
{
    // Get the department name from user 
    inquirer
    .prompt
    ([
        {
            name: 'deptName',
            type: 'text',
            message: 'Enter the department you would like to add:',
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('Please Enter the department you would like to add:');
                  return false;
                }
            },           
        }     
    ])
    .then(({deptName})=>{
    const sql = `INSERT INTO department(name) VALUES(?)ON DUPLICATE KEY UPDATE name=?;`;  
    // If the dept name already do not exist ,Insert department  name into deprmtent  table 
    const params = [deptName,deptName];
    db.query(sql,params,(err,response)=>{
        if (err) {
            console.log(err);
          }
        //   let count =getTableCount('department');
        //   console.log(count);
          console.log(chalk.redBright.bold(`====================================================================================`));
          console.log(chalk.greenBright(`Department record Successfully Added`));
          console.log(chalk.redBright.bold(`====================================================================================`));
          viewAllDepts(); //view departmen tables
    });
});
}

//<<*********************************************** Add a New Role ********************************************************************>>
function addRole(){
    chooseDept('linkrole'); // call choose dept with action of linkrole - to get the department name the role belongs to 
}
// Add a new role data into roles rable and link to the deptId provided as parameter 
function addDeptToRole(depId)
{ 
    // Ask for user to enter a valid role title and salar for the role to be added    
  inquirer
    .prompt([
        {       
            name: 'roleTitle',
            type: 'text',
            message: 'Enter the role title you would like to add:',
            validate: titleInput => {
                if (titleInput) {
                  return true;
                } else {
                  console.log('Please Enter the role title you would like to add:');
                  return false;
                }
            }
        },    
        {    
            name: 'roleSalary',
            type: 'Number',
            message: 'Enter the salary amount you would like to add:',
            validate: salaryInput => {
                if (salaryInput) {
                  return true;
                } else {
                  console.log('Please Enter the salary amount you would like to add:');
                  return false;
                }
            }
        }     
    ])
    // Insert the data collected into role table and link it to corresponding department 
    .then((answer) => {
    const sql = `INSERT INTO role(title,salary,department_id) VALUES(?,?,?)`;
    const params = [answer.roleTitle,answer.roleSalary,depId];
    db.query(sql,params,(err,response)=>{
        if (err) {
            console.log(err);
          }
          console.log(chalk.redBright.bold(`====================================================================================`));
          console.log(chalk.greenBright(`Role Successfully Added`));
          console.log(chalk.redBright.bold(`====================================================================================`));
          viewAllRoles(); //view the updated  Roles table 
    });
});
}
  //<<******************************************** Add a New Employee********************************************************************>>

function addEmp() {
    //Get the Employee's first and last name 
    inquirer.prompt([
      {
        name: 'firstName',
        type: 'input',
        message: "Please enter employee's first name:",
        validate: addFirstName => {
          if (addFirstName) {
              return true;
          } else {
              console.log('Please enter a  valid first name');
              return false;
          }
        }
      },
      {
        name: 'lastName',  
        type: 'input',
        message: "What is the employee's last name?",
        validate: addLastName => {
          if (addLastName) {
              return true;
          } else {
              console.log('Please enter a  valid last name');
              return false;
          }
        }
      }
    ])
      .then(answer => {
        // Add the first and last name to an array . 
      const empArr = [answer.firstName, answer.lastName]
      //Select the employee role from role table 
      const sql = `SELECT role.id, role.title FROM role`;  // select the role names from table 
      db.query(sql, (error, response) => {
        if (error) throw error; 
        const roleTitleArr= response.map(({ id, title }) => ({ name: title, value: id })); // populate role array 
        // Ask user to choose a role for employee 
        inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: roleTitleArr
              }
            ])
              .then(roleChoice => {
                const role = roleChoice.role;
                // add role selected to emparr
                empArr.push(role);
                // Select the employee's Manager 
                const managerSql =  `SELECT * FROM employee`; 
                db.query(managerSql, (error, response) => {
                  if (error) throw error;
                  // fetch all the names in manager Arr 
                  const managerArr = response.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'manager',
                      message: "Who is the employee's manager?",
                      choices: managerArr
                    }
                  ])
                    .then(managerChoice => {
                      const manager = managerChoice.manager; // choose manager 
                      console.log(manager);
                      empArr.push(manager); // add mgr name to empArr
                      //insert the data into the table 
                      console.log (empArr);
                      const sql =   `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                      db.query(sql, empArr, (error) => {
                      if (error) throw error;
                      console.log("Employee has been added!")
                      viewAllEmp(); // view employee added 
                });
              });
            });
          });
       });
    });
  };
  //<<********************************************END OF ADD FUNCTIONS********************************************************************>>
