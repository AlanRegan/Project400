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
        const allTasks = await pool.query("SELECT * FROM task as t INNER JOIN module as m on t.module_id = m.module_id where completestatus is null");
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

// get all high priority tasks
app.get("/tasks/highpriority", async(req, res) => {
    try {
        const prioritizedTasks = await pool.query("SELECT * FROM task as t INNER JOIN module as m on t.module_id = m.module_id WHERE priority='High' OR priority= 'Medium' ORDER BY priority = 'High' desc FETCH FIRST 3 ROWS ONLY;");
        for (var i = 0; i < prioritizedTasks.rows.length; i++) {
            var row = prioritizedTasks.rows[i];
            var todaysDate = new Date()
            var deadlineCorrectFormat = new Date(row.deadline);
            var daysLeft = (deadlineCorrectFormat - todaysDate)/(1000*3600*24)
            console.log(daysLeft);
            row.daysLeft = daysLeft.toFixed(0);;      
        }
        res.json(prioritizedTasks.rows);
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

// edit task - update
app.put("/tasks/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description, deadline, priority, caValue } = req.body;
        const updateTask = await pool.query
        ("UPDATE task SET description = $1 deadline = $2 priority = $3 caValue = $4 WHERE task_id = $5",
        [description, deadline, priority, caValue, id]
        );
        res.json("Task updated!")
    } catch (err) {
        console.error(err.message);
    }
});

// complete task - update
app.put("/completetask/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { completeStatus } = req.body;
        const updateTask = await pool.query
        ("UPDATE task SET completeStatus = $1 WHERE task_id = $2",
        [completeStatus, id]
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
        const { module_name, ca_total, module_colour} = req.body;
        const newModule = await pool.query
            ("INSERT INTO module (module_name, ca_total, module_colour) VALUES($1, $2, $3) RETURNING *",
            [module_name, ca_total, module_colour]
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

// get all modules for overview
app.get("/modulesoverview", async (req, res) => {
    try {
        const allModules = await pool.query(`SELECT m.module_id, module_name, ca_total, 
        SUM( 
        CASE WHEN t.completestatus IS NULL 
        THEN 0 ELSE cavalue END) AS currentlycompleted,
        SUM(t.grade) AS grade FROM task AS t
        FULL OUTER JOIN module AS m
        ON m.module_id = t.module_id
        GROUP BY m.module_id`);
        res.json(allModules.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get all completed tasks for grading
app.get("/grades", async (req, res) => {
    try {
        const allModules = await pool.query(`SELECT * FROM task WHERE completestatus = 'Complete'`);
        res.json(allModules.rows);
    } catch (err) {
        console.error(err.message);
    }
});
// update grade
app.put("/grades/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { grade } = req.body;
        const updateGrade = await pool.query
        ("UPDATE task SET grade = $1 WHERE task_id = $2",
        [grade, id]
        );
        res.json("Task updated!")
    } catch (err) {
        console.error(err.message);
    }
});

// get specific task
app.get("/modules/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const task = await pool.query
        ("SELECT * FROM task WHERE module_id = $1", [id])
        res.json(task.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(5000, () => {
    console.log("server has started on port 5000");
})