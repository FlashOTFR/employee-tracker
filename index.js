const inquirer = require('inquirer');
const connection = require('./connection.js');
const consoleTable = require('console.table');




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
    let query = 'SELECT * FROM employee INNER JOIN emprole ON employee.role_id = role_id INNER JOIN department ON emprole.department_id = department.id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

function roleView() {
    let query = 'SELECT * FROM emprole INNER JOIN department ON emprole.department_id = department.id';
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
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new role being added?'
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary for this new role?"
        },
        {
            type:'list',
            name:'department',
            message: 'Please enter your department number. \n Legal: 1 Sales: 2 Engineering: 3 Finance: 4',
            choices: ['1', '2', '3', '4']
        }]
        ).then(data =>{
            console.log('Creating a new role...\n');
           
        const query = connection.query(
    'INSERT INTO emprole SET ?',
    {
        department_id: data.department,
        title: data.title,
        salary: data.salary
    },
    (err, res) => {
        if (err) throw err;
        //   console.log('new role created!\n`);
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
        [{
            type: 'input',
            name: 'fname',
            message: 'What is the first name of the new employee being added?'
        },
        {
            type: 'input',
            name: 'lname',
            message: "What is the last name of the new employee being added?"
        },
        {
            type: 'list',
            name: 'department',
            message: 'Please enter your department number. \n Engineering: 1 Finance: 2 Sales: 3 Legal: 4',
            choices: [1, 2, 3, 4]
        },
        {
            type: 'list',
            name: 'role',
            message: 'what is the new employees role number? \n junior dev: 1 senior dev: 2 junior accountant: 5 senior accountant: 6 junior salesperson: 3 senior salesperson: 4 law clerk: 7 lawyer: 8',
            choices:[1, 2, 3, 4, 5, 6, 7, 8]
        }]
        ).then(data =>{
        console.log('Creating a new employee entry...\n');
        const query = connection.query(
    'INSERT INTO employee SET ?',
    {
      first_name: data.fname,
      last_name: data.lname,
      role_id: data.role,
      department_id: data.department
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

init();