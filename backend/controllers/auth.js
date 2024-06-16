const User = require("../models/auth.js")
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET ;

const bcrypt = require("bcryptjs");


const signup = async (req, res) => {

    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(500).json({ error: "Email Already Taken ! " });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        user = await User.create({ email, password: secPass })

        
        return res.status(200).json({ "success": true });



    }

    catch (err) {
        res.json({ error: "Internal Server Error .. " })
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ "success": false, "issue": "email" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(401).json({ "success": false, "issue": "password" });
        }


        else {
            const data = {

                user: {
                    id: user.id
                }
            }



            const authToken = jwt.sign(data, JWT_SECRET);

            return res.status(200).json({ "success": true, authToken });
        }

    }

    catch (err) {
        res.status(400).json({ error: "Internal Server Error .. " })
    }


}


const getuser = async (req, res) => {

    try {
        let userid = req.user.id;
        let data = await User.findById(userid);
        let passd = data.password ; 

        res.status(200).json(data);

    } catch (err) {
        res.json({ "error": "getuser catch block" });
    }

}

const updatePassword = async (req , res) => {
    const userid = req.user.id; 
    const { prevPasswd , newPasswd } = req.body ; 

    try {
        let user = await User.findById(userid);
        if(!user){
            res.json({"error"  : "user not Found"}) ;
        }
        console.log(user) ; 

        const passwordCompare = await bcrypt.compare(prevPasswd , user.password);
        // let pass = user.password ; 
        if (!passwordCompare) {
            return res.status(401).json({ "success": false, "issue": "wrong prevPassword" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(newPasswd, salt);

        const updateuser = {} ; 
        updateuser.password = secPass ; 

        user = await User.findByIdAndUpdate(userid, { $set: updateuser }, { new: true }) ; 
        res.status(200).json({ "success": true, user });

        
    } catch (error) {
        res.json({ "error": "update user password backend issue" });
    }

}



module.exports = { signup, login, getuser , updatePassword}; 