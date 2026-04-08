const express=require("express");
const {shorturlgen,getAnalytics}=require("../controllers/url");
const router=express.Router();

router.post('/', shorturlgen);

router.get('/analytics/:shortId',getAnalytics);

module.exports=router;