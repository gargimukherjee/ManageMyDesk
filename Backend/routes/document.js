const express = require('express');
const router = express.Router();
const { Document, validate } = require('../models/document'); 
const { User } = require('../models/user');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('config');


//Router to upload a document and save the document details in the db
router.post('/upload', (req,res) => {
    const token = req.header('x-auth-token');
    const decoded = jwt.verify(token,config.get('jwtPrivateKey'))

    let fieldObject = {}
    fieldObject.user = decoded._id;
    var form = new formidable.IncomingForm();
    
    form.multiples = true;
    form.parse(req);
    form.on('field', function(field, value) {
        fieldObject[field] = value;
    });

    form.on('file', function(field, file) {
        fieldObject.name = file.name
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });
    
    form.uploadDir = path.join("\public", decoded._id);
        if (!fs.existsSync(form.uploadDir)){
        fs.mkdirSync(form.uploadDir);
        }
    
    form.on('error', function(err) {
    });

    form.on('end', async() => {
        const { error } = validate(fieldObject);
        if(error){
            res.status(400).send(error);
            return;
        }

        let document = new Document({
            name: fieldObject.name,
            categories: fieldObject.categories,
            keywords: fieldObject.keywords,
            user: fieldObject.user
        })

        document = await document.save();
        res.send(document);
    });
})

//Router to search for a document and return the same
router.post('/search', async(req,res) => {
    const token = req.header('x-auth-token');
    const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
    let userId = decoded._id;
    let validUser = await User.findById(userId);

    if(validUser){
        let categories = req.body.categories;
        let keywords = req.body.keywords;
        const documents = await Document
                                .find({ user: userId})
                                .or([{ categories: categories}, {keywords: keywords}]);
    
        if(documents.length == 0){
            return res.status(404).send("No Matching Document");
        }
        else {
            res.status(200).send(documents);
        }
    }
})



//Edit and Save the document
router.put('/update/:id', async(req,res) => {
    const token = req.header('x-auth-token');
    const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
    let userId = decoded._id;
    let validUser = await User.findById(userId);
    
    if(validUser){
        const document = await Document.findByIdAndUpdate(req.params.id, {
            $set:{
                categories: req.body.categories,
                keywords: req.body.keywords,
            }
        }, {new: true});
    
        if(!document){
            return res.status(404).send("Document not found");
        }
    
        res.send(document);
    }
    
})

//Delete Document 
router.delete('/delete/:id', async(req,res) => {
    const token = req.header('x-auth-token');
    const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
    let userId = decoded._id;
    let validUser = await User.findById(userId);

    if(validUser){
        const document = await Document.findByIdAndRemove(req.params.id);  

        if(!document){
            return res.status(404).send('The document to be deleted does not exist');
        }
        let url = path.join("\public", document.user._id.toString(), document.name);
        let fileFound = fs.existsSync(url)
        if(fileFound){
            fs.unlink(url, error => {
                if(error){
                }
            });
        }
        res.send(document);
    }
 
})

module.exports = router;