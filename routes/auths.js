const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


// user-register
router.post('/register', async (req, res) => {
    try{
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            "username": req.body.username,
            "email": req.body.email,
            "password": hashedPwd
        });

        // save user to MongoDB and return response.

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }

});

// user-login
router.post('/login', async (req, res) => {
    try{
        // check email.
        const user = await User.findOne({email:req.body.email} );
        !user && res.status(404).json("User Not Found.");

        //check pwd
        const password = await bcrypt.compare(req.body.password, user.password);
        !password && res.status(400).json("Wrong Password.");

        res.status(200).json(user); // when email and password matches, res with 200.
    }catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;

