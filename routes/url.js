const express=require("express");
const {shorturlgen,getAnalytics,handleRedirect}=require("../controllers/url");
const router=express.Router();

router.post('/', shorturlgen);

router.get('/analytics/:shortId',getAnalytics);
router.get('/:shortId',handleRedirect);

module.exports=router;