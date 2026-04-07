const mongoose=require("mongoose");

async function connect(url){
    try{
        await mongoose.connect(url);
        console.log("connected to database");
    }
    catch(err){
        console.error("error connecting to database",err);
    }
}