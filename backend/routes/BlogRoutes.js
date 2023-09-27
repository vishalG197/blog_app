const express =require('express');
const UserModel= require("../model/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BlogModel = require('../model/BlogModel');
const auth = require('../middleware/auth')
// var cookies = require('cookie-parser');
const router =express.Router();
router.use(auth);
router.post("/blogs",async function(req, res){
try {
  
   const blog = new BlogModel({...req.body});
   await blog.save();


  return res.status(200).json({message:"blog posted successfully"})

} catch (error) {
  return res.status(500).json({message: error.message});
}

})

router.get("/blogs",async function(req, res){
  try {
    const {title,category,sort,order,page} = req.query;
    let obj={};
    if(title){
      obj.title = {$regex: title,$options:"i"};
    }
    if(category){
      obj.category =category;

    }
   
    let sortobj={};
    if(sort){
      // sortobj.sort ="date";
      if(order=="asc"){
        sortobj[sort]=1;

      }else  if(order=="desc"){
        sortobj[sort]=-1;
      }
    }
     const blog = await BlogModel.find(obj).sort(sortobj);
     
  
  
    return res.status(200).json({blog})
  
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
  
  })

   
router.patch("/blogs/:id",async function(req, res){
  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
  })
router.delete("/blogs/:id",async function(req, res){
  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
  })
  
router.patch("/blogs/:id/like",async function(req, res){

    
    try {
      const blog = await BlogModel.findById(req.params.id);
      
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
   
      blog.likes += 1;
      await blog.save();
      
      return res.status(200).json({ message: "Liked the blog post" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  

  
  })
  
router.patch("/blogs/:id/comment",async function(req, res){
  try {
    const blog = await BlogModel.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
   
    const newComment = {
      username: req.body.username, // You should provide the username
      content: req.body.content,   // The comment content
    };
    
    blog.comments.push(newComment);
    await blog.save();
    
    return res.status(200).json({ message: "Comment added to the blog post" });
  }  catch (error) {
    return res.status(500).json({message: error.message});
  }
  
  })

module.exports = router;