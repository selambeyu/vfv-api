
const Profesional=require('../models/professional');
const jwt=require('jsonwebtoken');
const config=require('../config/config');
const upload=require('../middeware/imageUpload');



module.exports.addInfo=(upload,req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            if(authData.user.role==="professional"){
                const professional=new Profesional({
                    userId:authData.user._id,
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    professionType:req.body.professionType,
                    address:req.body.address,
                    workPlace:req.body.workPlace,
                    college:req.body.college,
                    highschool:req.body.highschool,
                    profilePicture:req.body.file
                })
                professional.save()
                .then(professional=>{
                    res.json({
                        professional:professional
                    })
                })
                .catch(err=>{
                    res.json({
                        professional:err
                    })
                })
            }
        }


    })
}

module.exports.editProfile=(req,res)=>{
    
}

module.exports.getProfessionals=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            Profesional.find()
            .then(professional=>{
                res.json({professional:professional})
            })
            .catch(err=>{
                res.json({professional:err})
            })
        }
    })
}


module.exports.getProfessionalByName=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            Profesional.findOne({firstname:req.body.firstname})
            .then(professional=>{
                res.json({professional:professional})
            })
            .catch(err=>{
                res.json({professional:err})
            })
        }
    })
}


module.exports.profile=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);

        }else{
            Profesional.find({_id:req.params.id}).then(result=>{
                if(authData.user._id===result.userId){
                    res.json({
                        result:result
                    })
                }else{
                    res.json({
                        result:"Unauthorized"
                    })
                }
            })

        }
    })
}




// module.exports={
//     create:(req,res)=>{
//         const professional=new ProfesionalModel({
//             firstname:req.body.firstname,
//             lastname:req.body.lastname,
//             professionType:req.body.professionType,
//             address:req.body.address,
//             workPlace:req.body.workPlace,
//             college:req.body.college,
//             highschool:req.body.highschool,
//             profilePicture:req.body.profilePicture
//         });
//        professional.save()
//        .then(result=>{
//            res.json({success:true,result:result});
//        })
//        .catch(err=>{
//            res.json({success:false,result:err});
//        });
//     },
//     update:(req,res)=>{
//         ProfesionalModel.update({_id:req.body._id},req.body)
//         .then(professional=>{
//             if(!professional) res.json({success:false,result:"professional does not exit"});
//             res.json(professional)
//         })
//         .catch(err=>{
//             res.json({succes:true,result:err})
//         })
//     },
//     getData:(req,res)=>{
//         ProfesionalModel.find({})
//         .then(result=>{
//             if(!result)res.json({success:false,result:"No result found"})
//             res.json({success:true,result:result})
//         })
//         .catch(err=>{
//             res.json({success:false,result:err});
//         })
//     },
//     delete:(req,res)=>{
//         ProfesionalModel.remove({_id:req.body._id})
//         .then(result=>{
//             if(!result)res.json({succes:false,result:"no user with this id"})
//             res.json({success:true,result:result})
//         })
//         .catch(err=>{
//             res.json({success:false,result:err})
//         })
//     },
//     getProfessionalByUsername:(req,res)=>{
//         ProfesionalModel.findOne({username:req.body.username}).then(result=>{
//             if(!username) return res.json({succes:false,result:"Please enter the usename"});
//             return res.json({succes:true,result:result});
//         }).catch(err=>{
//             return res.json({success:true,result:err});
//         });
//     }


// }