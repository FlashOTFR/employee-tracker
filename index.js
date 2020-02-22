const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
const util = require('util');

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
    connection.query = util.promisify(connection.query);
    init();
  });

function init(){
inquirer.prompt([
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['Add Info', 'View Info', 'Update Info', 'Quit Program']
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
        case 'Quit Program':
            connection.end;
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
            case 'Employees':
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

function employeeView(){
    let query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

function roleView() {
    let query = 'SELECT * FROM emprole';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

function departmentView() {
    let query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

function roleAdd() {

};

function departmentAdd() {

};

function employeeAdd() {

};

function roleUpdate() {

};

function departmentUpdate() {

};

function employeeUpdate() {

};