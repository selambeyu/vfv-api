
const bcrypt=require('bcryptjs')
const express = require('express');
const router = express.Router();
const passport =require('passport');
const jwt=require('jsonwebtoken');
const user=require('../models/users');
//const db=require('../config/db_connection');
const config=require('../config/config');
// const Token=require('../models/token')



router.use(passport.initialize());
router.use(passport.session());


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
    
    user.findOne({username:req.body.username}).then(result=>{
      if(result) return res.json({success:false,result:"user already exist"});
      bcrypt.genSalt(10,(err,salt)=>{
        if(err) return res.json({succes:fals,result:err});
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
          if(err) return res.json({succes:false,result:err});
          newUser.password=hash;
          newUser.save().then(result=>{
            return res.json({succes:true,result:result,message:"user successfuly registered"})
          }).catch(err=>{
            return res.json({succes:false,result:err});
          })
        })
      })
    }).catch(err=>{
      return res.json({succes:false,result:err});
    })

  
};






module.exports.login=(req,res)=>{
  const username=req.body.username;
  const password=req.body.password;
  user.findOne({username                                                                                                                                                                                                                                                                                                },(err,user)=>{
    if(username!=user.username) return res.json({success:false,message:"wrong username"});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    bcrypt.compare(req.body.password,user.password,(err,isMatch)=>{
      if(err)res.json({success:false,message:"no user found"});
      if(isMatch){
        
        const token=jwt.sign({user:user},config.secret,{expiresIn:604880})
       
        // return res.json({success:true,token:token})
        if(user.role=="professional"){
          return res.json({
            success:true,
            token:token,
            message:"Professional loged in"
          });
        }
        if(user.role=="student"){
          return res.json({
            success:true,
            token:token,
            message:"Stuent log"
          })
        }
        // else{
        //   return res.json({
        //     succes:true,
        //     token:token,
        //     message:"Student log in"
        //   })
        // }

      }else{
        return res.json({success:false,message:"Wrong password"})
      }

    });
  })
};



// /get authenticated user profile

module.exports.profile=(req,res)=>{
  // console.log(req.user);
  jwt.verify(req.token,config.secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
    }else{
      if(authData.user.role==="professional"){
        res.json({
          message:"professional profile",
          authData
        });
      }
      else{
        res.json({
          message:"user profile",
          authData
        });
      }
      
    }
  })
  
};


module.exports.getUsers=(req,res)=>{
  user.find({}).then(result=>{
    if(!result)return res.json({succes:true,result:"No result found"})
    return res.json({succes:true,result:result});
  }).catch(err=>{
    return res.json({succes:false,result:err});
  });
};
module.exports.getuserByName=(req,res)=>{
  user.findOne({username:req.body.username}).then(result=>{
    if(!req.body.username) return res.json({succes:false,message:"Please enter the username"});
    return res.json({succes:true,result:result});
  }).catch(err=>{
    return res.json({succes:false,result:true});
  });
};








