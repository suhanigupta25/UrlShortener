const mongoose=require("mongoose");

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
    timestamps: true
});

const URL =mongoose.model("url",userschema);
module.exports=URL;