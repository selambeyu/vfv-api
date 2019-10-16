// const User =require('../services/users');
const bcrypt=require('bcryptjs')
const express = require('express');
const router = express.Router();
const passport =require('passport');
const jwt=require('jsonwebtoken');
router.use(passport.initialize());
router.use(passport.session());
const user=require('../models/users');
//const db=require('../config/db_connection');
const config=require('../config/config');

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
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(newUser.password,salt,(err,hash)=>{
        if(err)return err;
        newUser.password=hash;
        newUser.save().then(result=>{
            res.json({success:true,result:result}).catch(err=>{
                res.json({success:false,result:err})
            })
        })
    });
});
  
};

// bcrypt.compare(password,hash,(err,isMatch)=>{
//     if(err) throw err;
//     callback(null,isMatch);
// });



// module.exports.login=(req,res)=>{
//   const username=req.body.username;
//   const password=req.body.password;
//   user.findOne({"username":username}).then(result=>{
//     bcrypt.compare(password,hash,(err,isMatch)=>{
//         if(err)throw err;
//         if(isMatch){
//           const token=jwt.sign({
          
//             data:{
//               _id:user._id,
//               firstname:user.firstname,
//               username:user.username,
//               lastname:user.lastname,
//               email:user.email,
//               role:"admin"
              
  
//             }
//           },config.secret,{
//             expiresIn:604880
//           }
  
//           );
//           return res.json({
//             success:true,
//             token:token
//           });
//         }else{
//           return res.json({
//             success:true,
//             message:"Wrong password"
//           })
//         }
//       });
//     res.json({success:true,result:result})
// }).catch(err=>{
//     res.json(({success:false,result:err}))
// })
 
//   };
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
            role:"admin"
            

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







