const Answer=require('../models/answer');
const jwt=require('jsonwebtoken');
const config=require('../config/config');
const Question=require('../models/question');

module.exports.viewAnswer=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            if(authData.user.role==="professional"){
                Answer.find()
                .then(answer=>{
                    res.json({
                        answer:answer
                    })
                })
                .catch(err=>{
                    res.json({
                        answer:err
                    })
                })
            }
        }
    })
}


module.exports.answerQuestion=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            if(authData.role==="professional"){
                let questionId=req.params.id;
                let answer=new Answer({
                    question_Id:questionId,
                    questionAnswer:req.body.questionAnswer,
                    answeredBy:authData.username
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
            if(authData.role==="professional"){
                Answer.findById({_id:req.params.id}).then(result=>{
                    if(authData.username===result.answeredBy){
                        Answer.findByIdAndUpdate(req.params.id,req.body).then(answer=>{
                            res.json({answer:answer,message:"updated"})
                        }).catch(err=>{
                            res.json({
                                answer:err,
                                message:"Not Updated"
                            })
                        })
                    }
                }).catch(err=>{
                    res.json({result:err})
                })
        
            }else{
                res.json({message:"You have no permission for this"})
            }
        }
    })
}