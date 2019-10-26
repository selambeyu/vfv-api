// const User =require('../services/users');
const bcrypt=require('bcryptjs')
const express = require('express');
const router = express.Router();
const passport =require('passport');
const jwt=require('jsonwebtoken');
// const nodemailer=require('nodemailer')
router.use(passport.initialize());
router.use(passport.session());
const user=require('../models/users');
//const db=require('../config/db_connection');
const config=require('../config/config');
// const Token=require('../models/token')

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

// module.exports.login=(req,res)=>{
//   const username = req.body.username;
//   const password = req.body.password;   
//   user.findOne({ username })
//        .then(user => {
//           if (!user) {
//             //  errors.user = "No Account Found";
//              return res.status(404).json({succes:false,message:"not found"});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
//              }
//          bcrypt.compare(password, user.password)
//                 .then(isMatch => {
                  
//                    if (isMatch) {
                     
//                     jwt.sign({user:user}, config.secret, { expiresIn: 36000 },
//                             (err, token) => {
//                               if (err) res.status(500)
//                               .json({ error: "Error signing token",
//                                      raw: err }); 
//                                res.json({ 
//                                success: true,
//                                token: token });
//                     });      
//               } else {
//                   errors.password = "Password is incorrect";                        
//                   res.status(400).json(errors);
//       }
//     })
//   }).catch(err=>{
//     return res.json({succes:true,result:err})
//   })
// }


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








