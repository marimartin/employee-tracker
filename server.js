var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "gothefuckaway",
    database: "employeeSummary_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "actionTaken",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Department",
                "View Roles",
                "View Employees",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Remove Employee",
                "Exit"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.actionTaken === "View Department") {
                viewDep();
            }
            else if (answer.actionTaken === "View Roles") {
                viewRoles();
            }
            else if (answer.actionTaken === "View Employees") {
                viewEmp();
            }
            else if (answer.actionTaken === "Add Employee") {
                addEmp();
            }
            else if (answer.actionTaken === "Add Department") {
                addDep();
            }
            else if (answer.actionTaken === "Add Role") {
                addRole();
            }
            else if (answer.actionTaken === "Update Employee Role") {
                updateEmpRole();
            }
            else if (answer.actionTaken === "Remove Employee") {
                removeEmp();
            } else {
                connection.end();
            }
        });
}

function viewDep() {

}

function viewRoles() {
}

function viewEmp() {
}

function addEmp() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "roleID",
                type: "list",
                message: "What is the employees role?",
                choices: []
            },
            {
                name: "managerID",
                type: "list",
                message: "Who is the employee's manager?",
                choices: []
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleID,
                    manager_id: answer.managerID || null
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your new employee has been added");
                    // go back to starting prompt
                    start();
                }
            );
        });
}

function addDep() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What department would you like to add?"
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.department
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your new department has been added");
                    // go back to starting prompt
                    start();
                }
            );
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of this role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this role?"
            },
            {
                name: "departmentID",
                type: "list",
                message: "Which department is this role in?",
                choices: []
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.departmentID
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your new role has been added");
                    // go back to starting prompt
                    start();
                }
            );
        });
}

function updateEmpRole() {
}

function removeEmp() {
}

