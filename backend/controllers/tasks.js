const Task = require("../models/tasks.js")

const addTask = async (req, res) => {
    const { title, description , status } = req.body;
    const userid = req.user.id;  

    const data = await Task.create({
        title, description , status, userid
    })
    res.json({ "success": true , data });
}

const getTask = async (req, res) => {
    const arr = await Task.find({ userid: req.user.id }) ; 
    res.json(arr);
}

const deleteTask = async (req, res) => {


    try {

        const idtodelete = req.params.id;  

        let task = await Task.findById(idtodelete);

        if (!task) {
            return res.status(404).json({ "error": "Not Found" });
        }

        if (req.user.id.toString() != task.userid.toString()) {
            return res.status(401).json({ "error": "unauthorized Access !" })
        }

        const taskdeleted = await Task.findByIdAndDelete(idtodelete);
        return res.status(200).json({ "success": true, taskdeleted });


    } catch (error) {
        return res.json({ "error": "some error occurred in this deletetask controller " });
    }



}

const updateTask = async (req, res) => {


    try {

        const idtoupdate = req.params.id;

        let task = await Task.findById(idtoupdate);
        if (!task) { return res.status(404).json({ "error": "Not Found" }) };

        if (req.user.id != task.userid.toString()) {
            return res.status(401).json({ "error": "unauthorized Access !" })
        }
        const { title, description , status } = req.body;

        const updatetask = {};
        if (title) { updatetask.title = title };
        if (description) { updatetask.description = description; }
        if (status) { updatetask.status = status; }

        task = await Task.findByIdAndUpdate(req.params.id, { $set: updatetask }, { new: true })
        res.status(200).json({ "success": true, task });

    } catch (error) {
        return res.json({ "error": "some error occurred in this updatetask controller " });
    }

}


const getCompletedTasks = async (req , res) => {
    try {
        const arr = await Task.find({userid : req.user.id , status : "Completed"}) ; 
        res.json(arr);
    } catch (error) {
        return res.json({ "error": "some error occurred in this getCompletedTasks controller " });
        
    }
}

const getPendingTasks = async (req , res) => {
    try {
        const arr = await Task.find({userid : req.user.id ,status : "Pending"}) ; 
        res.json(arr);
    } catch (error) {
        return res.json({ "error": "some error occurred in this getPendingTasks controller " });
        
    }
}

const getSearchedTasks = async (req , res) => {
    try {
    
        const key = req.params.searchkey ; 
        console.log(key)
        
        const arr = await Task.find({userid : req.user.id}) ; 
        if(!key) return res.json(arr) ; 
        // console.log(arr)
        let result = [] ;

        arr.forEach(function (item) {
            let currName = item.title ;
            if(currName.toLowerCase().includes(key) == true){
                result.push(item) ;
            }
        });


        res.json(result);

    } catch (error) {
        return res.json({ "error": "some error occurred in this getSearchedTasks controller " });
        
    }
}
module.exports = {addTask , getTask , deleteTask , updateTask, getCompletedTasks, getPendingTasks, getSearchedTasks }; 