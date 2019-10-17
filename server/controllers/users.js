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
  if(req.body.role=="professional"){
    user.findOne({email:req.body.email},(err,user)=>{
      // if(user) return res.json({succes:false,message:"Email address alredy exist"}); 
      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err)return res.json({succes:false,message:err});
            newUser.password=hash;
            newUser.save((err)=>{
              if(err) return res.json({succes:false,message:err});
              var token = new Token({ _userId: user.id, token: crypto.randomBytes(16).toString('hex') });
              token.save((err)=>{
                if(err) res.json({succes:false,message:err});
                var transporter=nodemailer.createTransport({service:'gmail',host:'smtp.gmail.com',auth:{user:'melkam3392beyu@gmail.com',pass:'igivemylifetojesus0912'}});
            var mailOptions = { from: 'melkam3392beyu@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
              transporter.sendMail(mailOptions,(err)=>{
                if(err) return res.json({succes:true,message:err});
                return res.json({success:true,message:'A verification email has been sent to ' + user.email + '.'})
              })
              })
            
            })
        });
    });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    })                                                                                        
  }
  
  
};



module.exports.emailConfirmation=(req,res)=>{
 Token.findOne({token:req.body.token},(err,token)=>{
  if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
  user.findOne({_id:_userId,email:req.body.email},(err,user)=>{
    if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
      if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
    user.isVerified=true;
    user.save((err)=>{
      if(err)return res.json({succes:false,message:err.message});
      res.json({succes:true,message:"the accout is verified you can login"});
    })
    })
 })
}


module.exports.login=(req,res)=>{
  user.findOne({username:req.body.username},(err,user)=>{
    if(err)throw err;
    bcrypt.compare(req.body.password,user.password,(err,isMatch)=>{
      if(err)throw err;
      if(isMatch){
        const token=jwt.sign({
          
          data:{
            _id:user._id,
            firstname:user.firstname,
            username:user.username,
            lastname:user.lastname,
            email:user.email,
            role:user.role
            

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
        return res.json({success:false,message:"Wrong password"})
      }

    })
  })
}


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







