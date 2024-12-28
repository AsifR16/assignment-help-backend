const express = require('express');
const User = require("../models/User")
const router = express.Router();

router.post("/add",(req,res)=>{
    const name=req.body.name
    const email=req.body.email
    const password=req.body.password
    let result = User.newUser(name,email,password)
    if(result!=-1){
        res.status(200).json({"userid":result})
    }else{
        res.sendStatus(500)
    }
})

router.update("/update-contact",(req,res)=>{
    const userid=req.body.userid
    const contact=req.body.contact
    let result = User.UpdateContactByUserID(contact,userid)
    if(result!=-1){
        res.status(200).json({"userid":result})
    }else{
        res.sendStatus(500)
    }
})

router.update("/update-password",(req,res)=>{
    const userid=req.body.userid
    const password=req.body.password
    let result = User.UpdatePasswordByUserID(password,userid)
    if(result!=-1){
        res.status(200).json({"userid":result})
    }else{
        res.sendStatus(500)
    }
})

module.exports = router