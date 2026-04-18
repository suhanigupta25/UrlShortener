const {getuser}=require('../service/auth');

async function restricttoauth(req,res,next){
    
    const token=req.cookies?.token;  
    if(!token){
        return res.redirect("/login"); //redirect to login page if token is not present
    }
    const user=getuser(token); //get user details from token
    if(!user){
        return res.redirect("/login"); //redirect to login page if user is not found
    }
    req.user=user; //set user details in request object for further use
    next(); //call the next middleware function
}

module.exports=restricttoauth;