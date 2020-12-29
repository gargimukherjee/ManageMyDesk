const Joi = require('joi');
const mongoose = require('mongoose');
const User  = require('./user');

const documentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    categories: { type: String, lowercase:true, required: true },
    keywords: { type: String, lowercase:true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User' }
})

const Document = mongoose.model('Document', documentSchema);

function validateDocument(document){
    const schema = {
        name: Joi.string().required(),
        categories: Joi.string().required(),
        keywords: Joi.string().required(),
        //categories: Joi.array().items(Joi.string().required()),
        //keywords: Joi.array().items(Joi.string().required()),
        user: Joi.string()
    }

    return Joi.validate(document,schema)
}

module.exports.Document = Document;
module.exports.validate = validateDocument;

