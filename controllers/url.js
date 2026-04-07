
const {nanoid}=require("nanoid");
const URL=require("../models/url");


async function shorturlgen(req,res){
    const shortID =nanoid(8);
    const body=req.body;
    if(!body.url){
        return res.status(400).json({error:"originalURL is required"});
    }
    await URL.create({
        shortId :shortID,
        originalURL: body.url,
        visithistory: [],

    });
    return res.status(201).json({shortId: shortID});
}

module.exports={shorturlgen};