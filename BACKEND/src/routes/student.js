const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const Student = require('../models/student');
const { secret } = require('../config/default');

router.post('/register', async (req, res) => {
    try {
        const { fullname, email, rollNo, password } = req.body;

       console.log(req.body)
       const exi = await Student.findOne({ rollNo });
       if (exi) {
        return res.status(400).json({ error: 'User already exists' });
    }
        const ex = await Student.findOne({ email});

        if (ex) {
            return res.status(400).json({ error: 'User already exists' });
        }

   
        const hashed = await bcrypt.hash(password, 12);

       
        const student = new Student({
            fullname,
            email,
            rollNo,
            password: hashed
        });
        const user = await student.save();
        const token = jwt.sign({ userID:user._id ,role:user.role },secret,{expiresIn: '48h'});
        return  res.status(201).json({token});

        // res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email,password } = req.body;

    //    console.log(req.body)
        const ex = await Student.findOne({ email });
        const isPassword = await bcrypt.compare(password,ex.password);
        if (!ex || !isPassword) {
            return res.status(400).json({ message: ' invalid credentials' });
        }
        
        const token = jwt.sign({ userID:ex._id , role:ex.role },secret,{expiresIn: '48h'});
        return  res.status(200).json({token});

        // res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
