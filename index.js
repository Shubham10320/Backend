const express=require('express')
const{connection}=require('./config/db')
const{UserModel}=require('./models/User.model')
const{BlogModel}=require('./models/blog.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cors=require('cors');
require('dotenv').config();
const{authentication}=require('./middleware/middleware')
const app=express();
const {blogRouter}=require('./routes/blog.routes')


app.use(express.json())

app.get('/',(req, res)=>{
    res.status(200).send('Base API Point...')
})

//SignUp 
app.post("/signup", async(req, res)=>{
    const {name, email, password}=req.body;
        bcrypt.hash(password, 2, async function(err, hash) {
            try{
                const newUser=new UserModel({name, email, password:hash});
                await newUser.save();
                res.send({msg:'signup successfully done....'})
            }catch(err){
               console.log(err)
               res.status(500).send({msg:"Something went wrong, please try again...."})
            }
        });
});



//Login
app.post('/login', async(req, res)=>{
    const{email, password}=req.body;
    const user=await UserModel.findOne({email});
    if(!user){
        res.send('please sign up first....')
    }else{
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                const token=jwt.sign({user_id: user._id},process.env.SECRET_KEY);
                res.send({msg:"login successfully done"})
            }else{
                res.send({msg:'login failed....'})
            }
        });
    }
})


//get blog
app.get('/blogs',authentication, blogRouter);








app.listen(process.env.PORT, async()=>{
    try{
       await connection;

    }catch(err){
        console.log('Unable to Connect')
        console.log(err)
    }
    console.log(`listening on port ${process.env.PORT}`)
})