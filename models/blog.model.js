const mongoose=require('mongoose')

const blogSchema=mongoose.Schema({
   title:{type:String, required:true},
   category:{type:String, required:true},
   author:{type:String},
   content:{type:String, required:true},
   image:{type:String}
})

const BlogModel=mongoose.model('blog', blogSchema)

module.exports={BlogModel}


// Title - For Example : “My Journey at MasaI”,
// Category - For Example : “Career”/”Finance”/”Travel”/”Sports” etc.
// Author - For Example : “Albert”/”Manish”/”Santhi”/”Bob” etc.
// Content - For Example : “A paragraph of content….etc”
// Image(Optional) - Any related image for that blog.