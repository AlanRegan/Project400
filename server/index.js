require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const cors = require("cors");
//const pool = require("./db");
const { json } = require("express");

// middleware
app.use(cors());
app.use(express.json()); // req.body

app.use("/api/v1/tasks", require("./routes/tasks"));
app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/modules", require("./routes/modules"));
app.use("/api/v1/grades", require("./routes/grades"));
app.use("/api/v1/events", require("./routes/events"));
app.use("/api/v1/friends", require("./routes/friends"));

// app.listen(5000, () => {
//     console.log("server has started on port 5000");
// })
app.listen(PORT, () => console.log("Magic happening on PORT", +PORT));