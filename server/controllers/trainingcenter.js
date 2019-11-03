
const Trainingcenter=require('../models/trainingcenter');
const jwt =require('jsonwebtoken');
const confg=require('../config/config');
const User=require('../models/users');

module.exports.addInfo=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            if(authData.user.role==="trainingcenter"){
                trainingcenteinfo=new Trainingcenter({
                    userId:authData.user._id,
                    companyName:req.body.companyName,
                    logo:res.body.file,
                    city:req.body.city,
                    compayDescription:req.body.compayDescription,
                    trainingType:req.body.trainingType
                })
                trainingcenteinfo.save()
                .then(info=>{
                    res.json({info:info})

                })
                .catch(err=>{
                    res.json({info:err})
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
            if(authData.user.role==="trainingcenter"){
                Trainingcenter.findById(req.params._id,(err,result)=>{
                    if(err){
                        res.sendStatus(403);
                    }else{
                        if(authData.user._id===result.userId){
                            Trainingcenter.findByIdAndUpdate({_id:result._id},req.body)
                            .then(result=>{
                                res.json({result:result});
                            })
                            .catch(err=>{
                                res.json({result:err});
                            })
                        }
                    }

                })

            }
        }
        
    })
}


module.exports.getTrainingcenter=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        Trainingcenter.find()
        .then(trainingcenter=>{
            res.json({trainingcenter:trainingcenter})
        })
        .catch(err=>{
            res.json({trainingcenter:err})
        })
    })
}

module.exports.getTrainingcenterByName=(req,res)=>{
    jwt.verify(req.token,confg.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            if(authData.user.role==="trainingcenter"){
                Trainingcenter.findOne({companyName:req.params.companyName}).then(result=>{
                        res.json({
                            result:result
                        })
                    }).catch(err=>{
                        res.json({result:err})
                    })

            }
        }
      
    })
}


module.exports.getCenterByName=(req,res)=>{
    jwt.verify(req.token,confg.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            Trainingcenter.findOne({companyName:res.body.companyName})
        .then(trainingcenter=>{
            res.json({trainingcenter:trainingcenter})

        })
        .catch(err=>{
            res.json({trainingcenter:err})
        })
        }


        
    })
}

module.exports.profile=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            Trainingcenter.find({_id:req.params.id}).then(result=>{
                if(authData.user._id===result.userId){
                    res.json({
                        result:result
                    })
                }
            }).catch(err=>{
                res.json({
                    result:err
                })
            })
        }
    })
}


// module.exports={
//     create:(req,res)=>{
//         const trainingcenter=new TrainingcenterModel({
//             firstname:req.body.firstname,
//             lastname:req.body.lastname,
//             professionType:req.body.professionType,
//             address:req.body.address,
//             workPlace:req.body.workPlace,
//             college:req.body.college,
//             highschool:req.body.highschool,
//             profilePicture:req.body.profilePicture
//         });
//        trainingcenter.save()
//        .then(result=>{
//            res.json({success:true,result:result});
//        })
//        .catch(err=>{
//            res.json({success:false,result:err});
//        });
//     },
//     update:(req,res)=>{
//         TrainingcenterModel.update({_id:req.body._id},req.body)
//         .then(trainingcenter=>{
//             if(!trainingcenter) res.json({success:false,result:"professional does not exit"});
//             res.json(trainingcenter)
//         })
//         .catch(err=>{
//             res.json({succes:true,result:err})
//         })
//     },
//     getData:(req,res)=>{
//         TrainingcenterModel.find({})
//         .then(result=>{
//             if(!result)res.json({success:false,result:"No result found"})
//             res.json({success:true,result:result})
//         })
//         .catch(err=>{
//             res.json({success:false,result:err});
//         })
//     },
//     delete:(req,res)=>{
//         TrainingcenterModel.remove({_id:req.body._id})
//         .then(result=>{
//             if(!result)res.json({succes:false,result:"no user with this id"})
//             res.json({success:true,result:result})
//         })
//         .catch(err=>{
//             res.json({success:false,result:err})
//         })
//     },
//     getProfessionalByUsername:(req,res)=>{
//         TrainingcenterModel.findOne({username:req.body.username}).then(result=>{
//             if(!username) return res.json({succes:false,result:"Please enter the usename"});
//             return res.json({succes:true,result:result});
//         }).catch(err=>{
//             return res.json({success:true,result:err});
//         });
//     }


// }