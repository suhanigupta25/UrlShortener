const express=require("express");
const app=express();
const port=2500;
const {connectmongodb}=require("./connect");
const path=require("path");

const staticrouter=require("./routes/staticRouter");
const urlRoutes=require("./routes/url");
const userRoutes=require("./routes/user");

const URL =require("./models/url");

app.use(express.json());//middleware for parse json request bodies
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve("./public"))); //serves static files from public folder


app.use("/",urlRoutes); //redirects to urlroutes
app.use("/user",userRoutes); //redirects to userroutes
app.use("/static",staticrouter); //serves static files from public folder

app.get("/",async (req,res)=>{
    const allUrls=await URL.find({});
    return res.render("home",{
        urls: allUrls
    });
});

app.set("view engine","ejs");
app.set("views",path.resolve("./view"));

connectmongodb("mongodb://localhost:27017/urlshortener")
.then(()=>{
    app.listen(port,()=>console.log(`server started at ${port}`));
})
.catch((err)=>{
    console.error("error starting server",err);
});

//authentication
const 


