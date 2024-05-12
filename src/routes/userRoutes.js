const express = require('express');
const User = require('../models/userModel');
// import { getToken } from "../util";

const router = express.Router();

router.post("/login", async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            // token: getToken(signinUser)
        });
    } else {
        res.status(401).send({ message: "Invalid Email or Password." });
    }
});
router.post("/register", async (req, res) => {

    try {
        const {name, email, password} = req.body;

        // check if user is exist
        const findUser = await User.findOne({email});

        console.log(findUser);

        if(findUser) {
            res.status(400).json("User already exist");
            return;
        }

        const newUser = User.create({
            name,
            email,
            password
        })

        const result = await newUser.save();

        res.status(201).json("User Created Successfully",result)

    } catch (err) {
        res.status(500).send(err)
    }
   
});

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: "suhas",
            email: "suhas@gmail.com",
            password: "1234",
            isAdmin: true
        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({ message: error.message });
    }
});

module.exports = router;