const express=require("express");
const app=express();
const port=2500;

const urlRoutes=require("./routes/url");
const {connectmongodb}=require("./connect");
const URL =require("./models/url");

app.use(express.json());//middleware for parse json request bodies

connectmongodb("mongodb://localhost:27017/urlshortener")
.then(()=>{
    app.listen(port,()=>console.log(`server started at ${port}`));
})
.catch((err)=>{
    console.error("error starting server",err);
});

//this goes to database find original url with shorturl
app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate(
        {shortURL: shortId}, //find the entry with shortURL matching shortId
        {$push: {visithistory: {timestamp: Date.now()}}}, //adding new record to history
        {new: true}

    );
    if(!entry){
        return res.status(404).json({error:"short URL not found"});
    }
    res.redirect(entry.originalURL);
    
});

app.use("/",urlRoutes); //redirects to urlroutes

