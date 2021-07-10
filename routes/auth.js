const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
    const { userName, email, password } = req.body;
    
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create new user
        const newUser = User({
            userName: userName,
            email: email,
            password: hashedPassword
        });

        //save user and return response
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


//login
router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (!user) {
            
            res.status(404).json("user not found");
        }
        else {
            const validPassword = await bcrypt.compare(password, user.password)
            !validPassword && res.status(400).json("wrong password")
            res.status(200).json(user);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;