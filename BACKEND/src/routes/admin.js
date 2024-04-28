const express = require("express")
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const Admin = require("../models/admin");
const { secret } = require("../config/default");


//desc add middleaware
router.post("/register",async(req,res)=>{

    try{

        const { fullname , email,password }=req.body;

        const ex = await Admin.findOne({ email});

        if (ex) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashed = await bcrypt.hash(password,12);

        const newAdmin = new Admin({ fullname,  email,  password:hashed })

       const user= await newAdmin.save();
        const token = jwt.sign({userID:user._id,role:user.role},secret,{expiresIn: '48h'});
       return  res.status(200).json({token});
       
    }
    catch(er){
        console.log(er)
        res.status(400).send("server side error")

    }

})

//login
router.post("/login",async(req,res)=>{

    try {
        const { email,password }=req.body;
        // console.log(email)
        const user = await Admin.findOne({ email});

        // console.log(user)
        if(!user){
            return res.status(401).json({error:"Invalid credentials"});
        }
        

        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword){
            return res.status(401).json({error:"Invalid credentials"});
        }

        const token = jwt.sign({userID:user._id,role:user.role},secret,{expiresIn: '48h'});
        res.status(200).json({token});
    } catch (er) {
       console.log(er)
        res.status(500).json({error:"internal server error"});
        
    }

});


module.exports = router;
