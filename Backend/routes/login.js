const express = require('express');
const router = express.Router();
const { User, validateLogin } = require('../models/user');
const bcrypt = require('bcrypt-nodejs');


//Create and Save User - Registration
router.post('/', async(req,res) => {
    const {error} = validateLogin(req.body);

    if(error){
        return res.status(400).send('Bad Request' + error);
    }

    let user = await User.findOne({email: req.body.email});

    if(!user){
        return res.status(400).send(`The user does not exist...please register.`);
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.status(400).send("Invalid email or password");
    }

    //Generating JWT token
    const token = user.generateAuthToken();
    res.send({
        "name": user.name,
        "email": user.email,
        "token": token,
        "id": user._id
    });
})

module.exports = router;





