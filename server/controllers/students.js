
const StudentModel=require('../models/students');

module.exports={
    create:(req,res)=>{
        const student=new StudentModel({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            professionType:req.body.professionType,
            address:req.body.address,
            workPlace:req.body.workPlace,
            college:req.body.college,
            highschool:req.body.highschool,
            profilePicture:req.body.profilePicture
        });
       student.save()
       .then(result=>{
           res.json({success:true,result:result});
       })
       .catch(err=>{
           res.json({success:false,result:err});
       });
    },
    update:(req,res)=>{
        StudentModel.update({_id:req.body._id},req.body)
        .then(student=>{
            if(!student) res.json({success:false,result:"professional does not exit"});
            res.json(student)
        })
        .catch(err=>{
            res.json({succes:true,result:err})
        })
    },
    getData:(req,res)=>{
        StudentModel.find({})
        .then(result=>{
            if(!result)res.json({success:false,result:"No result found"})
            res.json({success:true,result:result})
        })
        .catch(err=>{
            res.json({success:false,result:err});
        })
    },
    delete:(req,res)=>{
        StudentModel.remove({_id:req.body._id})
        .then(result=>{
            if(!result)res.json({succes:false,result:"no user with this id"})
            res.json({success:true,result:result})
        })
        .catch(err=>{
            res.json({success:false,result:err})
        })
    },
    getStudentByUsername:(req,res)=>{
        StudentModel.findOne({username:req.body.username}).then(result=>{
            if(!username) return res.json({succes:false,result:"Please enter the usename"});
            return res.json({succes:true,result:result});
        }).catch(err=>{
            return res.json({success:true,result:err});
        });
    }


}