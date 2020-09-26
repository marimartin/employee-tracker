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
                "View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View All Roles",
                "View Total Budget",
                "Exit"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.actionTaken === "View All Employees By Department") {
                viewEmpDep();
            }
            else if (answer.postOrBid === "View All Employees By Manager") {
                viewEmpMan();
            }
            else if (answer.postOrBid === "Add Employee") {
                addEmp();
            }
            else if (answer.postOrBid === "Remove Employee") {
                removeEmp();
            }
            else if (answer.postOrBid === "Update Employee Role") {
                updateEmpRole();
            }
            else if (answer.postOrBid === "Update Employee Manager") {
                updateEmpMan();
            }
            else if (answer.postOrBid === "View All Roles") {
                viewRoles();
            }
            else if (answer.postOrBid === "View Total Budget") {
                viewBudget();
            } else {
                connection.end();
            }
        });
}

function viewEmpDep() {
    inquirer
        .prompt({
            name: "department",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Finance",
                "Legal",
                "Engineering",
                "Sales"]
        })
        .then(function (answer) {
            console.log(answer.song);
            connection.query("SELECT * FROM employee WHERE ?", { department_id: answer.name }, function (err, res) {
                if (err) throw err;
                console.log();
                start();
            });
        });
};

function viewEmpMan() {

};

function addEmp() {

};

function removeEmp() {

};

function updateEmpRole() {

};

function updateEmpMan() {

};

function viewRoles() {

};

function viewBudget() {

};