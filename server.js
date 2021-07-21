
const db = require('./db/connection'); // connection to database 
const inquirer = require('inquirer') 
const figlet = require('figlet');

// Connect to Database
db.connect(err =>{
    if (err) throw err;
    else {
    console.log('Database connected.');
    // call inquirer prompt 
    }
}); 

//This line of code runs a synchronous function through the figlet npm that displays the designated text string in the console
console.log(figlet.textSync('Employee Management', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}));
