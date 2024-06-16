require("dotenv").config() 
const express = require("express")
const app = express()
const db = require('./db')
db();
const cors = require("cors") ; 
app.use(cors());

app.use(express.json());

const authRouter = require("./routers/auth.js")
app.use("/auth" , authRouter);
const noteRouter = require("./routers/tasks.js")
app.use("/tasks" , noteRouter) ; 

const PORT = process.env.PORT || 5000  ;


app.listen(PORT , () => {
    console.log("server running on PORT 5000");
})

