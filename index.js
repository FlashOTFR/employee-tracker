const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '5eku+aya',
    database: 'employees'
  });
  
  connection.connect(err => {
    if (err) {
      console.error('error connecting', err.stack);
      return;
    }
  
    console.log(`connected with id ${connection.threadId}`);
    init();
  });

function init(){
inquirer.prompt([
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['Add Info', 'View Info', 'Update Info']
    }
]).then(data => {
    
    switch(data.choice){
        case 'Add Info':
            addInfo();
            break;
        case 'View Info':
            viewInfo();
            break;
        case 'Update Info':
            updateInfo();
            break;
    }
});
};

function addInfo(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What info would you like to add?',
            choices: ['New Department', 'New Role', 'New Employee']
        }
    ]).then(data => {
        
        switch(data.choice){
            case 'New Department':
                departmentAdd();
                break;
            case 'New Role':
                roleAdd();
                break;
            case 'New Employee':
                employeeAdd();
                break;
        }
    });
};

function viewInfo(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What info would you like to view?',
            choices: ['Departments', 'Roles', 'Employees']
        }
    ]).then(data => {
        
        switch(data.choice){
            case 'Departments':
                departmentView();
                break;
            case 'Roles':
                roleView();
                break;
            case 'New Employee':
                employeeView();
                break;
        }
    });
};
function updateInfo(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What info would you like to update?',
            choices: ['Departments', 'Roles', 'Employees']
        }
    ]).then(data => {
        
        switch(data.choice){
            case 'Departments':
                departmentUpdate();
                break;
            case 'New Role':
                roleUpdate();
                break;
            case 'New Employee':
                employeeUpdate();
                break;
        }
    });
};