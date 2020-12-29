const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config= require('config');


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, maxlength: 255 }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},config.get('jwtPrivateKey'))
    return token;
}

const User = mongoose.model('User', userSchema);


function validateRegistration(user){
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().max(255).required()
    }

    return Joi.validate(user,schema);
}

function validateLogin(user){
    const schema = {
        email: Joi.string().required(),
        password: Joi.string().max(255).required()
    }

    return Joi.validate(user,schema);
}

module.exports.User = User;
module.exports.validateRegistration = validateRegistration;
module.exports.validateLogin = validateLogin;
module.exports.userSchema = userSchema;
