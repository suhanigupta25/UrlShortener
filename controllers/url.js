
const {nanoid}=require("nanoid");
const URL=require("../models/url");

async function shorturlgen(req,res){
    
    const body=req.body;
    if(!body.enteredUrl){
        return res.status(400).json({error:"originalURL is required"});
    }
    const shortID =nanoid(8);
    await URL.create({
        shortURL :shortID,
        originalURL: body.enteredUrl,
        visithistory: [],

    });
    return res.render("home",{
        id:shortID
    });
    
}

async function handleRedirect(req, res) {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortURL: shortId },
        { $push: { visithistory: { timestamp: Date.now() } } },
        {returnDocument: 'after'}
    );

    if (!entry) {
        return res.status(404).json({ error: "short URL not found" });
    }

    res.redirect(entry.originalURL);
}

async function getAnalytics(req,res){
    const shortId=req.params.shortId;
    const entry=await URL.findOne({shortURL: shortId});
    if(!entry){
        return res.status(404).json({error:"short URL not found"});
    }
    return res.json({
        totalclicks: entry.visithistory.length,
        analytics: entry.visithistory,
    })
}

module.exports={shorturlgen,getAnalytics,handleRedirect};