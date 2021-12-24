const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { json } = require("express");


// middleware
app.use(cors());
app.use(express.json()); // req.body

// routes
//#region tasks
// create task 
app.post("/tasks", async(req, res) => {
    try{
        const { description, deadline, priority, caValue, module_id } = req.body;
        const newTask = await pool.query
            ("INSERT INTO task (description, deadline, priority, caValue, module_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [description, deadline, priority, caValue, module_id]
        );
        res.json(newTask.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all tasks
app.get("/tasks", async(req, res) => {
    try {
        const allTasks = await pool.query("SELECT * FROM task as t INNER JOIN module as m on t.module_id = m.module_id");
       for (var i = 0; i < allTasks.rows.length; i++) {
        var row = allTasks.rows[i];
        var todaysDate = new Date()
        var deadlineCorrectFormat = new Date(row.deadline);
        var daysLeft = (deadlineCorrectFormat - todaysDate)/(1000*3600*24)
        console.log(daysLeft);
        row.daysLeft = daysLeft.toFixed(0);;      
    }
        res.json(allTasks.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get specific task
app.get("/tasks/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const task = await pool.query
        ("SELECT * FROM task WHERE task_id = $1", [id])
        res.json(task.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }
});

// update task
app.put("/tasks/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTask = await pool.query
        ("UPDATE task SET description = $1 WHERE task_id = $2",
        [description, id]
        );
        res.json("Task updated!")
    } catch (err) {
        console.error(err.message);
    }
});

// delete task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await pool.query
        ("DELETE FROM task WHERE task_id = $1", [id]
        );
        res.json("Task deleted!");
    } catch (err) {
        console.error(err.message);
    }
});
//#endregion tasks

// create module
app.post("/modules", async(req, res) => {
    try{
        const { module_name, ca_total} = req.body;
        const newModule = await pool.query
            ("INSERT INTO module (module_name, ca_total) VALUES($1, $2) RETURNING *",
            [module_name, ca_total]
        );
        res.json(newModule.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all modules
app.get("/modules", async(req, res) => {
    try {
        const allModules = await pool.query("SELECT * FROM module");
        res.json(allModules.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(5000, () => {
    console.log("server has started on port 5000");
})