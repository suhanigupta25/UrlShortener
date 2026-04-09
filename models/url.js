const mongoose=require("mongoose");

//schema for url model
const userschema=mongoose.Schema({
    originalURL: {
        type: String,
        required: true,
    },
    shortURL: {
        type: String,
        required: true,
        unique: true,
    },
    visithistory: [{timestamp: {type: Number}}],
}, {
    timestamps: true //store createdAt and updatedAt fields automatically,clicks
});

const URL =mongoose.model("url",userschema);
module.exports=URL;