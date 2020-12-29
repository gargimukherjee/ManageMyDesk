const jwt = require('jsonwebtoken');
const config = require('config')

function auth(req,res,next){
    const token = req.header('x-auth-token');

    if(!token){
       return res.status(401).send('Access Denied');
    }
    try{
        const decoded = jwt.verify(token,config.get('mmd_jwtPrivateKey'))
        req.user = decoded;
        next(); 
    }
    catch(err){
        res.status(400).send(err);
    }
}

module.exports = auth;