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
            else if (answer.postOrBid === "View Roles") {
                viewRoles();
            }
            else if (answer.postOrBid === "View Employees") {
                viewEmp();
            }
            else if (answer.postOrBid === "Add Employee") {
                addEmp();
            }
            else if (answer.postOrBid === "Add Department") {
                addDep();
            }
            else if (answer.postOrBid === "Add Role") {
                addRole();
            }
            else if (answer.postOrBid === "Update Employee Role") {
                updateEmpRole();
            }
            else if (answer.postOrBid === "Remove Employee") {
                removeEmp();
            } else {
                connection.end();
            }
        });
}

function viewDep() {
};
function viewRoles() {
};
function viewEmp() {
};
function addEmp() {
};
function addDep() {
};
function addRole() {
};
function updateEmpRole() {
};
function removeEmp() {
};

