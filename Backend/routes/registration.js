const express = require('express');
const router = express.Router();
const { User, validateRegistration } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');

//Create and Save User - Registration
router.post('/', async(req,res) => {
    const {error} = validateRegistration(req.body);

    if(error){
        return res.status(400).send('Bad Request  ' + error.message);
    }

    let user = await User.findOne({email: req.body.email});

    if(user){
         return res.status(400).send(`The user is already registered. Please login with your credentials`);
    }

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);

    await user.save();

     //Generating JWT Token
     const token = user.generateAuthToken();

    //Setting response header
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
})

module.exports = router;
