
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
                    userId:authData._id,
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
                if(authData._id===result.userId){
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



