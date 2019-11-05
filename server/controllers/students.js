
const Student=require('../models/students');
const config =require('../config/config');
const jwt=require('jsonwebtoken');




module.exports.addInfo=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            if(authData.role==="student"){
                const student=new Student({
                    userId:authData._id,
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    profilePicture:req.body.profilePicture,
                    address:req.body.address,
                    city:req.body.city,
                    interest:req.body.interest
        });
        student.save().then(result=>{
            res.json({result:result,userId:result.userId})
        }).catch(err=>{
            res.json({result:err})
        })
        }

        
}
})
}

module.exports.editProfile=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            if(authData.role==="student"){
                Student.findById({_id:req.params.id}).then(result=>{
                    if(authData._id===result.userId){
                        Student.findByIdAndUpdate(req.params.id,{$set:req.body}).then(student=>{
                            res.json({student:student})
                        }).catch(err=>{
                            res.json({student:err})
                        })
                    }
                }).catch(err=>{
                    res.json({result:err})
                })
            }
        }
    })
}


// module.exports.profile=(req,res)=>{
//     jwt.verify(req.token,config.secret,(err,authData)=>{
//         if(err){
//             res.sendStatus(403);
//         }else{
//             Student.findById({_id:req.params}).then(result=>{
//                 if(authData.user._id===result.userId){
//                     res.json({
//                         result:result
//                     })
//                 }else{
//                     res.json({
//                         result:"Unaurthorized"
//                     })
//                 }
//             })
//         }
//     })
// }


module.exports.profile=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){}
    })
}


module.exports.getStudent=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        Student.find().then(student=>{
            res.json({
                student:student
            })
        }).catch(err=>{
            res.json({student:err})
        })
    })
}