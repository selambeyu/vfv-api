const express = require('express');
const router = express.Router();
const passport =require('passport');
const jwt=require('jsonwebtoken');
router.use(passport.initialize());
router.use(passport.session());
const Admin=require('../models/admin');
//const db=require('../config/db_connection');
const config=require('../config/config');

/*  */
// require('../config/passport')(passport);

router.post('/register',(req,res)=>{
  let newAdmin=new Admin({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    username:req.body.username,
    email:req.body.email,
    password:req.body.password

  });
  Admin.addAdmin(newAdmin,(err,user)=>{
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
        message:"Admin is registered succesfully"
      });
    }
  });
});



router.post('/login',(req,res)=>{
  const username=req.body.username;
  const password=req.body.password;
  Admin.getAdminByUsername(username,(err,user)=>{
    if(err)throw err;
    if(!user){
      return res.json({
        success:false,

      });
    }
    Admin.comparePassword(password,user.password,(err,isMatch)=>{
      if(err)throw err;
      if(isMatch){
        const token=jwt.sign({
        role:"Admin",
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
});


// /get authenticated user profile

router.get('/profile',verifyToken,(req,res)=>{
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
  
});


function verifyToken(req,res,next){
  const bearerHeader=req.headers['authorization'];
  if(typeof bearerHeader!=='undefined'){
// sprlit at thes space
const bearer=bearerHeader.split(' ');
//get tokent from array 
const bearerToken=bearer[1];
req.token=bearerToken;

next();
  }else{
    res.sendStatus(403);
  }
}
module.exports = router;
