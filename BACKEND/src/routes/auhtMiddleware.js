const jwt = require('jsonwebtoken');
const { secret } = require('../config/default');


function authMiddleware(req,res,next){
    const token=req.headers.authorization
    console.log(token)

    if(!token){
        
        return res.status(401).json({Error:'Unauthorized'});
    }
    try {
        const decode = jwt.verify(token,secret);
        if(decode.role !== 'admin'){
            return res.status(403).json({message: "you need an access (Unauthorized)" });
        }

        next();
        
    } catch (er) {

        return res.status(401).json({Error:'Unauthorized'})
        
    }

}


function auth(req,res,next){
    const token=req.headers.authorization
    console.log(token)

    if(!token){
        
        return res.status(401).json({Error:'Unauthorized'});
    }
    try {
        const decode = jwt.verify(token,secret);
        console.log(decode.role)
        if (decode.role !== 'student' && decode.role !== 'admin') {
            return res.status(403).json({ message: "You need an access (Unauthorized)" });
        }

        next();
        
    } catch (er) {

        return res.status(401).json({Error:'Unauthorized'})
        
    }

}

module.exports={authMiddleware,auth};