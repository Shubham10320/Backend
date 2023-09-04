const {UserModel} =require('../models/User.model')
require('dotenv').config();

const authentication=(req, res, next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        res.send({msg:"please login first..."})
    }else{
        jwt.verify(token, process.env.SECRET_KEY, async function(err, decoded){
            
            if(err){
                res.send({msg:'please login again'})
            }else{
                const user_id=decoded.user._id;
                req.user_id=user_id;
                next();
            }
        })
    }
}
module.exports={authentication}