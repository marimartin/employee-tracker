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
                "View Departments",
                "View Roles",
                "View Employees",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Exit"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.actionTaken === "View Departments") {
                viewDep();
            }
            else if (answer.actionTaken === "View Roles") {
                viewRoles();
            }
            else if (answer.actionTaken === "View Employees") {
                viewAllEmp();
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
            } else {
                connection.end();
            }
        });
}

function viewAllEmp() {
    var sql = "SELECT employee.id, employee.first_name AS FirstName, employee.last_name AS LastName, roll.title AS Title, roll.salary AS Salary, department.name AS Department FROM employee INNER JOIN roll ON employee.role_id = roll.id INNER JOIN department ON roll.department_id = department.id";

    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.log("");
        console.table(res);
    });
    start();

}

function viewDep() {
    connection.query(
        "SELECT * FROM department",
        function (err, departments) {
            if (err) throw err;
            console.table(departments);
            start();
        }

    )
}


function viewRoles() {
    connection.query(
        "SELECT * FROM roll",
        function (err, roles) {
            if (err) throw err;
            console.table(roles);
            start();
        }

    )
}

function addEmp() {
    connection.query(
        "SELECT * FROM employee",
        function (err, employees) {
            if (err) throw err;

            connection.query(
                "SELECT * FROM roll",
                function (err, roles) {
                    if (err) throw err;

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
                                choices: roles.map(function (item) {
                                    return item.title;
                                })
                            },
                            {
                                name: "managerID",
                                type: "list",
                                message: "Who is the employee's manager?",
                                choices: [...employees.map(function (item) {
                                    return `${item.first_name} ${item.last_name}`;
                                }), "none"]
                            }
                        ])
                        .then(function (answer) {
                            // when finished prompting, insert a new item into the db with that info
                            connection.query(
                                "INSERT INTO employee SET ?",
                                {
                                    first_name: answer.firstName,
                                    last_name: answer.lastName,
                                    role_id: roles.find(function (item) {
                                        return item.title === answer.roleID;
                                    }).id,
                                    manager_id: employees.find(function (item) {
                                        return `${item.first_name} ${item.last_name}` === answer.managerID;
                                    }).id || null,
                                },
                                function (err) {
                                    if (err) throw err;
                                    console.log("Your new employee has been added");
                                    // go back to starting prompt
                                    start();
                                }
                            );
                        });
                });
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
    connection.query(
        "SELECT * FROM department",
        function (err, data) {
            if (err) throw err;
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
                        choices: data.map(function (item) {
                            return item.name;
                        })
                    }
                ])
                .then(function (answer) {
                    // when finished prompting, insert a new item into the db with that info
                    connection.query(
                        "INSERT INTO roll SET ?",
                        {
                            title: answer.title,
                            salary: answer.salary,
                            department_id: data.find(function (item) {
                                return item.name === answer.departmentID;
                            }).id
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

    )

}

function updateEmpRole() {
    connection.query(
        "SELECT * FROM employee",
        function (err, employees) {
            if (err) throw err;
            connection.query(
                "SELECT * FROM roll",
                function (err, roles) {
                    if (err) throw err;

                    inquirer
                        .prompt([

                            {
                                name: "employeeName",
                                type: "list",
                                message: "Which employee would you like to update?",
                                choices: employees.map(function (item) {
                                    return `${item.first_name} ${item.last_name}`;
                                })
                            },
                            {
                                name: "role",
                                type: "list",
                                message: "What is their new role?",
                                choices: roles.map(function (item) {
                                    return item.title;
                                })
                            }
                        ])
                        .then(function (answer) {
                            // when finished prompting, insert a new item into the db with that info
                            connection.query(
                                "UPDATE employee SET ? WHERE ?",
                                [
                                    {
                                        role_id: roles.find(function (item) {
                                            return item.title === answer.role;
                                        }).id
                                    },
                                    {
                                        id: employees.find(function (item) {
                                            return `${item.first_name} ${item.last_name}` === answer.employeeName;
                                        }).id
                                    }
                                ],
                                function (err) {
                                    if (err) throw err;
                                    console.log("Your new role has been added");
                                    // go back to starting prompt
                                    start();
                                }
                            );
                        });
                })
        })
}


