
const db = require('./db/connection'); // connection to database 
const inquirer = require('inquirer') 
const figlet = require('figlet');
const chalk = require('chalk');

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
          name: 'choices',
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
  .then(answer => {
        switch(answer.action){
            case "View All Employees":
                //viewAllEmp();
                break;
            case "View all Employees By Department":
                //viewAllEmpByDept();
                break;

            case "View all Employees By Role":
                //viewAllEmpByRole();
                break;

            case "View all Employees By Manager":
                ///viewAllEmpByMgr();
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
            case "View all Roles":
                //viewAllRoles();
                break;
            case "Add Role":
                //addRole();
                break;
            case "Remove role":
                //removeRole();
                break;
            case "View all Departments":
                    //viewDeptBudget();
                    break;
            case "Add Department":
                //addDept();
                break;
            case "Remove department":
                //removeDept();
                break;
            case "Exit":
                db.end(); 
                break;
            

        }

    });
    
};