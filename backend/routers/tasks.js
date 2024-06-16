const express = require("express")
const app = express(); 
const fetchuser = require("../middlewares/fetchuser.js")


const router = express.Router() ; 

const {addTask , getTask , deleteTask , updateTask, getCompletedTasks, getPendingTasks,getSearchedTasks } = require("../controllers/tasks.js")

router.post("/addTask" , fetchuser , addTask) ; 
router.get("/getTask"  , fetchuser ,  getTask) ; 
router.get("/getCompletedTasks" , fetchuser, getCompletedTasks);
router.get("/getPendingTasks" ,fetchuser, getPendingTasks);
router.get("/search/:searchkey?" , fetchuser,  getSearchedTasks);
router.delete("/deleteTask/:id" , fetchuser, deleteTask);
router.put("/updateTask/:id" , fetchuser , updateTask);


module.exports = router; 