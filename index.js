const express=require("express");
const app=express();
const port=2500;
const {connectmongodb}=require("./connect");
const path=require("path");
const cookieParser=require("cookie-parser");

const staticrouter=require("./routes/staticRouter");
const urlRoutes=require("./routes/url");
const userRoutes=require("./routes/user");

const restricttoauth=require("./middleware/auth");
const URL =require("./models/url");

app.use(cookieParser()); //middleware for parse cookies
app.use(express.json());//middleware for parse json request bodies
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve("./public"))); //serves static files from public folder


app.use("/url",restricttoauth,urlRoutes); //redirects to urlroutes
app.use("/user",userRoutes); //redirects to userroutes
app.use("/",staticrouter); //serves static files from public folder

app.get("/",restricttoauth,async (req,res)=>{
    const allUrls=await URL.find({ createdBy: req.user._id }).sort({ createdAt: -1 }); //fetch all urls created by the user and sort by creation date
    return res.render("home",{
        urls: allUrls
    });
});

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

connectmongodb("mongodb://localhost:27017/urlshortener")
.then(()=>{
    app.listen(port,()=>console.log(`server started at ${port}`));
})
.catch((err)=>{
    console.error("error starting server",err);
});





