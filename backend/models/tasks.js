const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'users',
    },
    title : {
        type:String,
        require : true ,
    }, 
    description : {
        type:String,
        require : true ,
    },
    status : {
        type : String,
        require : true ,
        default : "pending"
    },
    date  : {
        type : Date ,
        default : Date.now 
    }

})

const Task = mongoose.model('tasks', noteSchema);

module.exports = Task ; 

