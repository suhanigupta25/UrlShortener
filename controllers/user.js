const User=require('../models/user');

async function usersignup(req,res){
    try{
        const {username,email,password}=req.body;
        await User.create({username,email,password});
        return res.render("home");

    }
    catch(err){
        console.error("error in user signup",err);
        return res.status(500).json({message:"internal server error"});
    }
}  

module.exports={usersignup};