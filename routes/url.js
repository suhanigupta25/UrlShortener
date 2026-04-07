const express=require("express");
const {shorturlgen}=require("../controllers/url");
const router=express.Router();

router.post('/', shorturlgen);
module.exports=router;