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
            choices: ['Employee Manager', 'Employee Role']
        }
    ]).then(data => {
        
        switch(data.choice){
            case 'Employee Role':
                roleUpdate();
                break;
            case 'Employee Manager':
                managerUpdate();
                break;
        }
    });
};
//VIEW FUNCTIONS
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


//ADD FUNCTIONS
function roleAdd() {
    inquirer.prompt(
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new role being added?'
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary for this new role?"
        }
    ).then(data =>{
        console.log('Creating a new role...\n');
  const query = connection.query(
    'INSERT INTO emprole SET ?',
    {
      title: data.title,
      salary: data.salary
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} new role created!\n`);
      console.table(res);
     
      init();
    });

    })
};

function departmentAdd() {
    inquirer.prompt(
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the new deparment being added?'
        }
    ).then(data =>{
        console.log('Creating a new department...\n');
  const query = connection.query(
    'INSERT INTO department SET ?',
    {
      name: data.name
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} new department created!\n`);
      console.table(res);
     
      init();
    });

    })
};

function employeeAdd() {
    inquirer.prompt(
        {
            type: 'input',
            name: 'fname',
            message: 'What is the first name of the new employee being added?'
        },
        {
            type: 'input',
            name: 'lname',
            message: "What is the last name of the new employee being added?"
        }
    ).then(data =>{
        console.log('Creating a new employee entry...\n');
  const query = connection.query(
    'INSERT INTO employee SET ?',
    {
      first_name: data.fname,
      last_name: data.lname
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} new employee entry created!\n`);
      console.table(res);
     
      init();
    });

    })
};


//UPDATE FUNCTIONS
function roleUpdate() {

};

function managerUpdate() {

};
