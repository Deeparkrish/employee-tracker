const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware 
app.use(express.json);
app.use(express.urlencoded({extended:true}));



// Default response for any other request (Not Found)
app.use((req,res)=>{
    res.status(404).end();
});

// Connect to Database and start server 
db.connect(err =>{
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    });
}); 