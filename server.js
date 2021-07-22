
const db = require('./db/connection'); // connection to database 
const inquirer = require('inquirer') 
const figlet = require('figlet');
const chalk = require('chalk');
const cTable =require('console.table');

// Connect to Database
db.connect(err =>{
    if (err) throw err;
    else {
    console.log('Database connected.');
    // call inquirer prompt 
    promptUserInput();
    }
}); 

//This line of code runs a synchronous function through the figlet npm that displays the designated text string in the console
console.log(chalk.yellow.bold(`====================================================================================`));
console.log(``);
console.log(chalk.greenBright.bold(figlet.textSync('Employee-Tracker')));
console.log(``);
console.log(``);                                                        
console.log(``);
console.log(chalk.yellow.bold(`====================================================================================`));


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
            'View All Employees by Order of Salary',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'View All Roles',
            'Add Role',
            'Remove Role',
            'View All Departments',
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
                //viewAllEmpByMgr();
                break;
            case "Add Employee":
                //addEmp();
                break;
            case "Remove Employee":
                //removeEmp();
                break;
            case "Update Employee Role":
                //updateEmpRole();
                break;
            case "Update Employee Manager":
                //updateEmpMgr();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                //addRole();
                break;
            case "Remove Role":
                removeRole();
                break;
            case "View All Departments":
                viewAllDepts();
                break;
            case "Add Department":
                //addDept();
                break;
            case "Remove Department":
                removeDept();
                break;
            case "Exit":
                db.end(); 
                break;
            

        }

    });
    
};

function viewAllEmp(){
    const  sql = `SELECT employee.id ,employee.first_name,employee.last_name,role.title,role.salary,department.department_name from employee,role, department 
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

function viewAllRoles(){
    const  sql = `SELECT role.id,role.title,role.salary from role
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

function viewAllDepts(){
    const  sql = `SELECT * from department
    ORDER BY department.id ASC;` 
    db.query(sql, (err, response) => {
            if (err) {
            throw(err); 
            return;
            }
        console.log(``);
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(` Department Table`));
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.table(response);
        console.log(chalk.yellow.bold(`====================================================================================`));
     
     });
     promptUserInput();
};
function viewAllEmpByRole(){
    const sql =`SELECT employee.id AS Employee_ID,CONCAT (employee.first_name," ",employee.last_name) AS Employee_Name ,role.title AS Desgination
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

function viewAllEmpByDept(){
    const sql =`SELECT employee.id AS Employee_ID,CONCAT (employee.first_name," ",employee.last_name) AS Employee_Name,department.department_name AS Department 
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

function removeRole(){

    const sql = `SELECT * FROM role`;
    db.query(sql, (err,response) =>{
        if(err){
            throw(err);
            return;
        }
        let roleTitleArr =[];
        response.forEach(role => {
            roleTitleArr.push(role.title);
        })
        inquirer
        .prompt([
          {
            name: 'roleChoice',
            type: 'list',
            message: 'Choose the role you would like to remove?',
            choices: roleTitleArr
          }
        ])
        .then (({roleChoice})=>{
            response.forEach(role => {
                if(roleChoice ===role.title){
                    deleteRoleRecord(roleChoice);
                }
            })
        });
        });

}

function deleteRoleRecord(roleTitle){
    
    db.query(`DELETE FROM role WHERE title = ?`, roleTitle, (err, response) => {
        if (err) {
          console.log(err);
        }
        console.log(chalk.redBright.bold(`====================================================================================`));
        console.log(chalk.greenBright(`Role Successfully Removed`));
        console.log(chalk.redBright.bold(`====================================================================================`));
        viewAllRoles();
      });
    }


function removeDept() {
    const sql = `SELECT * FROM department`;
    db.query(sql,(err,response) =>{
        if(err){
            throw(err);
            return;
        }
        let deptNameArr =[];
        response.forEach(dept => {
            deptNameArr.push(dept.department_name);
        });
        inquirer
        .prompt([
          {
            name: 'deptChoice',
            type: 'list',
            message: 'Choose the department you would like to remove?',
            choices: deptNameArr
          }
        ])
        .then (({deptChoice})=>{     
            response.forEach(dept => {
                if(deptChoice === dept.department_name){
                    deleteDeptRecord(deptChoice);
                }
            })
        });
    });
}
function deleteDeptRecord(deptName){    
    db.query(`DELETE FROM department WHERE department_name = ?`, deptName, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(chalk.redBright.bold(`====================================================================================`));
        console.log(chalk.greenBright(`Department record Successfully Removed`));
        console.log(chalk.redBright.bold(`====================================================================================`));
        viewAllDepts();
      });
};



    