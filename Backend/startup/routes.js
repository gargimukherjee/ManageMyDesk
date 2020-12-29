//Import modules for routing 
const express = require('express');
const registration = require('../routes/registration');
const login = require('../routes/login');
const document = require('../routes/document');


module.exports = function(app){
    app.use(express.json());
    
    app.use('/api/registration',registration);
    app.use('/api/login', login);
    app.use('/api/document', document);
}
