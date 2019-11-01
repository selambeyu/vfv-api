const Answer=require('../models/answer');
const jwt=require('jsonwebtoken');
const config=require('../config/config');
const Question=require('../models/question');

module.exports.answerQuestion=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            if(authData.user.role==="professional"){
                let questionId=req.params.id;
                let answer=new Answer({
                    question_Id:questionId,
                    answer:req.body.answer,
                    answeredBy:authData.user.username
                })
                answer.save()
                .then(answer=>{
                    res.json({
                        answer:answer
                    })
                }).catch(err=>{
                    res.json({answer:err})
                })


            }
        }
    })
}


module.exports.updateAnswer=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            if(authData.user.role==="professional"){
                Answer.findById(req.params.id,(err,result)=>{
                    if(err){
                        res.json({message:"not found"});
                    }else{
                        res.json({result:result});
                    }
                })
            }
        }
    })
}