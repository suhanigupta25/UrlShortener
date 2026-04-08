const mongoose=require("mongoose");

async function connectmongodb(url){
    try{
        await mongoose.connect(url);
        console.log("connected to database");
    }
    catch(err){
        console.error("error connecting to database",err);
    }
}

module.exports={
    connectmongodb
};