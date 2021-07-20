const mysql = require("mysql2");
const express = require('express');
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3001;
const app = express();

//middle ware 
app.use(express.json);
app.use(express.urlencoded({extended:true}));
app.use()

app.use((req,res)=>{
    res.status(404).end();
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});