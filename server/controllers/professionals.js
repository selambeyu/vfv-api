
const ProfesionalModel=require('../models/professional');

module.exports={
    create:(req,res)=>{
        const professional=new ProfesionalModel({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            professionType:req.body.professionType,
            address:req.body.address,
            workPlace:req.body.workPlace,
            college:req.body.college,
            highschool:req.body.highschool,
            profilePicture:req.body.profilePicture
        });
       professional.save()
       .then(result=>{
           res.json({success:true,result:result});
       })
       .catch(err=>{
           res.json({success:false,result:err});
       });
    },
    update:(req,res)=>{
        ProfesionalModel.update({_id:req.body._id},req.body)
        .then(professional=>{
            if(!professional) res.json({success:false,result:"professional does not exit"});
            res.json(professional)
        })
        .catch(err=>{
            res.json({succes:true,result:err})
        })
    },
    getData:(req,res)=>{
        ProfesionalModel.find()
        .then(result=>{
            if(!result)res.json({success:false,result:"No result found"})
            res.json({success:true,result:result})
        })
        .catch(err=>{
            res.json({success:false,result:err});
        })
    },
    delete:(req,res)=>{
        ProfesionalModel.remove({_id:req.body._id})
        .then(result=>{
            if(!result)res.json({succes:false,result:"no user with this id"})
            res.json({success:true,result:result})
        })
        .catch(err=>{
            res.json({success:false,result:err})
        })
    }

}