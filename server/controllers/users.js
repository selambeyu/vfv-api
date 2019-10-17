// const User =require('../services/users');
const bcrypt=require('bcryptjs')
const express = require('express');
const router = express.Router();
const passport =require('passport');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer')
router.use(passport.initialize());
router.use(passport.session());
const user=require('../models/users');
//const db=require('../config/db_connection');
const config=require('../config/config');
const Token=require('../models/token')

/*  */
//require('../config/passport')(passport);

module.exports.register=(req,res)=>{
  let newUser=new user({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    username:req.body.username,
    email:req.body.email,
    password:req.body.password,
    role:req.body.role

  });
  
    user.findOne({username:req.body.username},(err,result)=>{
      if(user) return res.json({succes:false,result:"User alredy exits"}); 
      bcrypt.genSalt(10,(err,salt)=>{
        if(err) return res.json({succes:false,result:err})
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err)return res.json({succes:false,message:err});
            newUser.password=hash;
            newUser.save((err)=>{
              if(err) return res.json({succes:false,result:err});
              return res.json({succes:true,result:result})
            
            })
        });
    });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    })                                                                                        

  
};






module.exports.login=(req,res)=>{
  user.findOne({username:req.body.username},(err,user)=>{
    if(err)throw err;
    bcrypt.compare(req.body.password,user.password,(err,isMatch)=>{
      if(err)throw err;
      if(isMatch){
        const token=jwt.sign({user:user},config.secret,{expiresIn:604880})
       
        // return res.json({success:true,token:token})
        if(user.role=="professional"){
          return res.json({
            success:true,
            token:token,
            message:"Professional loged in"
          });
        }else{
          return res.json({
            succes:true,
            token:token,
            message:"Student log in"
          })
        }

      }else{
        return res.json({success:false,message:"Wrong password"})
      }

    })
  })
}


// /get authenticated user profile

module.exports.profile=(req,res)=>{
  // console.log(req.user);
  jwt.verify(req.token,config.secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
    }else{
      if(authData.role!="professional"){
        res.json({
          message:"user profile",
          authData
        });
      }
      else{
        res.json({
          message:"Professional profile",
          authData
        });
      }
      
    }
  })
  
};







