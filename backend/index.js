const express = require('express');
const connections = require("./db");
const cors =require("cors");
const UserRoutes=require("./routes/UserRoutes")
const BlogRotes =require("./routes/BlogRoutes")
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api",UserRoutes);
app.use("/api",BlogRotes);
app.get("/", function(req, res){
  res.send("welcome to the server"); 
})
app.listen(8080,async (req,res)=>{
   try {
      await connections;
      console.log("listening on http://localhost:8080");
      console.log("connections established")
   } catch (error) {
      console.log(error);
   }
})