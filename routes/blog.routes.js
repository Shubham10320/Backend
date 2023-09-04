const {Router}=require('express');
const {UserModel}=require('../models/User.model')
const {BlogModel}=require('../models/blog.model')

const blogRouter=Router();

//get request for blog
blogRouter.get('/', async(req, res)=>{
    const blogData=await BlogModel.find();
    res.send({responseData : blogData})
})

//create blog
blogRouter.post('/create', async(req, res)=>{
    const{title, category, image,content}=req.body;
    const author_id=req.user_id;
    const user=await UserModel.findOne({_id:author_id});
    const newBlog=new BlogModel({title, category, image, author:user.name});
    await newBlog.save();
    res.send('blog created');
})


//edit blog
blogRouter.put('/edit/:blogId', async(req, res)=>{
    const blogId=req.params.blogId;
    const payload=req.body;
    const user_id=req.user_id;
    const user=await UserModel.findOne({_id:user_id});
    const user_email=user.email;

    const blog=await BlogModel.findOne({_id:blogId});
    const blog_autherEmail=user.email;

    if(user_email !=blog_autherEmail){
        res.send({msg:'you are unauthorized to edit blog....'})
    }else{
        await BlogModel.findByIdAndUpdate(blogId, payload);
        res.send(`blog edited successfully by ${blogId}`)
    }

})



//delete blog
blogRouter.delete('/delete/:blogId', async(req, res)=>{
    const blogId=req.params.blogId;
    const user_id=req.user_id;

    const user=await UserModel.findOne({_id:user_id});
    const user_email=user_email;

    const blog=await BlogModel.findOne({_id:blogId});
    const blog_autherEmail=user.email;

    if(user_email !=blog_autherEmail){
        res.send({msg:'you are not authorized to do so'})
    }else{
        await BlogModel.findByIdAndDelete(blogId);
        res.send({msg:"deleted succesffully"})
    }
})

module.exports={blogRouter}