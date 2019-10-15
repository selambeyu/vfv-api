const User =require('../services/users');

const express = require('express');
const router = express.Router();
const passport =require('passport');
const jwt=require('jsonwebtoken');
router.use(passport.initialize());
router.use(passport.session());
const User=require('../models/users');
//const db=require('../config/db_connection');
const config=require('../config/config');

/*  */
//require('../config/passport')(passport);

module.exports.register=(req,res)=>{
  let newUser=new User({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    username:req.body.username,
    email:req.body.email,
    password:req.body.password

  });
  User.addUser(newUser,(err,user)=>{
    if(err){
      let message='';
      if(err.errors.username)messsage="Username is alredy taken  ";
      if(err.errors.email)message +="Email alredy exits";
      return res.json({
        success:false,
        message
      });
    } else {
      return res.json({
        success:true,
        message:"User is registered succesfully"
      });
    }
  });
};



module.exports.login=(req,res)=>{
  const username=req.body.username;
  const password=req.body.password;
  User.getUserByUsername(username,(err,user)=>{
    if(err)throw err;
    if(!user){
      return res.json({
        success:false,

      });
    }
    User.comparePassword(password,user.password,(err,isMatch)=>{
      if(err)throw err;
      if(isMatch){
        const token=jwt.sign({
        role:"user",
          data:{
            _id:user._id,
            firstname:user.firstname,
            username:user.username,
            lastname:user.lastname,
            email:user.email,
            

          }
        },config.secret,{
          expiresIn:604880
        }

        );
        return res.json({
          success:true,
          token:token
        });
      }else{
        return res.json({
          success:true,
          message:"Wrong password"
        })
      }
    });
  });
};


// /get authenticated user profile

module.exports.profile=(req,res)=>{
  console.log(req.user);
  jwt.verify(req.token,config.secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
    }else{
      res.json({
        message:"user profile",
        authData
      })
    }
  })
  
};







