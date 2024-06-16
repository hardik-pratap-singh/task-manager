const mongoose = require("mongoose");
require("dotenv").config()

mongoose.set('strictQuery', true);
const db = () => {
    mongoose.connect(`${process.env.MONGO_URI}`)
    .then(() => {
        console.log("connected to database") ; 
    }) 

}
module.exports = db ; 