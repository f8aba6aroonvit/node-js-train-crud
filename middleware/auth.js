const jwt = require('jsonwebtoken')

module.exports.auth=async(req,res,next)=>{
    try{

        
        const token =req.headers.authorization.split("Bearer ")[1];
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        req.auth = decoded;
        return next()
        
        
    }catch(err){
        return res.status(401).json({
            message: 'ไปหา Token มาซะ'
        })
    }
}