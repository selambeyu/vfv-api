// const User =require('../services/users');
const bcrypt=require('bcryptjs')
const express = require('express');
const router = express.Router();
const passport =require('passport');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer')
router.use(passport.initialize());
router.use(passport.session());
const admin=require('../models/users');
//const db=require('../config/db_connection');
const config=require('../config/config');
const Token=require('../models/token')

/**
 * @api {get} /user/register Request User information
 * @apiName registerUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */


module.exports.register=(req,res)=>{
  let newAdmin=new admin({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
   

  });
  
    admin.findOne({username:req.body.username},(err,result)=>{
      if(admin) return res.json({succes:false,result:"admin alredy exits"}); 
      bcrypt.genSalt(10,(err,salt)=>{
        if(err) return res.json({succes:false,result:err})
        bcrypt.hash(newAdmin.password,salt,(err,hash)=>{
            if(err)return res.json({succes:false,message:err});
            newAdmin.password=hash;
            newAdmin.save((err)=>{
              if(err) return res.json({succes:false,result:err});
              return res.json({succes:true,result:result})
            
            })
        });
    });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    })                                                                                        

  
};






module.exports.login=(req,res)=>{
  admin.findOne({username:req.body.username},(err,user)=>{
    if(err)throw err;
    bcrypt.compare(req.body.password,user.password,(err,isMatch)=>{
      if(err)throw err;
      if(isMatch){
        const token=jwt.sign({user:user},config.secret,{expiresIn:604880})
       
        return res.json({success:true,token:token})
      

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
      if(err)res.json({success:false,message:err});
      res.json({
        succes:true,
        authData
      })

  })
  
};







