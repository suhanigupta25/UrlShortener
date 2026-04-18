const User=require('../models/user');
const{v4:uuidv4}=require('uuid');
const {setuser}=require('../service/auth');

const bcrypt = require("bcrypt");
const hashedPassword = await bcrypt.hash(password, 10);

async function usersignup(req,res){
    try{
        const {username,email,password}=req.body;
        await User.create({username,email,password:hashedPassword});
        return res.redirect("/")

    }
    catch(err){
        console.error("error in user signup",err);
        return res.status(500).json({message:"internal server error"});
    }
}  

async function userlogin(req,res){
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        if(user.password!==password){
            return res.status(401).json({message:"invalid credentials"});
        }
        const token=uuidv4();
        setuser(token,user);
        res.cookie("token",token,{httpOnly:true}); //set token in cookie for authentication
        return res.redirect("/"); //redirect to home page after successful login
    }
    catch(err){
        console.error("error in user login",err);
        return res.status(500).json({message:"internal server error"});
    }
}

module.exports={usersignup,userlogin};