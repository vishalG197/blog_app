const express =require('express');
const UserModel= require("../model/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// var cookies = require('cookie-parser');
const router =express.Router();

router.post("/register",async function(req, res){
try {
   const {password,email}=req.body;
   const users= await UserModel.findOne({email});
   if(users){
      return res.status(400).json({message:"user with this email already exists, please login"})
   }
   const hashedPass = await bcrypt.hash(password,10);
   // console.log(hashedPass);
   const user = new UserModel({...req.body,password:hashedPass});
   await user.save();


  return res.status(200).json({message:"sucessfully registered"})

} catch (error) {
  return res.status(500).json({message: error.message});
}

})

router.post("/login",async function(req, res){
   try {
      const {email,password} = req.body;
      const user =await UserModel.findOne({email});
      console.log(user)
      if(!user){
return res.status(404).json({message:"user with email not found"
      })
   }
const ispassword =await bcrypt.compare(password,user.password);
console.log(ispassword);
if(!ispassword){
   return res.status(404).json({message:"password mismatch, please try again"});

}

const token =jwt.sign({userId:user._id,username:user.username},"blog",{expiresIn:"1h"})

// res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
res.status(200).json({message:"successfully logged in",token});
   } catch (error) {
      res.status(500).json({message: error.message});
   }
   
   })



module.exports = router;