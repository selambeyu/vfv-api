const Question=require('../models/question');
const jwt=require('jsonwebtoken');
const config=require('../config/config')



module.exports.createQuestion=(req,res,next)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
          res.sendStatus(403);
        }else{
            console.log(authData.user.role);
            if(authData.user.role==="professional"){
                const question=new Question({
                    question:req.body.question,
                    askedBy:authData.user.username,
      
      
                })
      
                question.save()
                .then(result=>{
                    res.json({
                        sucess:true,result:result
                    })
                })
                .catch(err=>{
                    res.json({success:false,result:err})
                })
            }else{
                res.sendStatus(403);
            }
          
          
        }
      });
      


}


module.exports.getQuestion=(req,res)=>{
jwt.verify(req.token,config.secret,(err,authData)=>{
    if(err) {
        res.sendStatus(403);
    }else{
        Question.find()
.then(result=>{
    res.json({success:true,result:result,authData});
})
.catch(err=>{
    res.json({success:true,result:err})
})


  
}
});

}


module.exports.updateQuestion=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            if(authData.user.role==="professional"){
                Question.findById(req.params.id).then(result=>{
                    if(authData.user.username===result.askedBy){
                        // result.question=req.body.question;
                        Question.update({question:req.body},req.body).then(result=>{
                            res.json({result:result,message:"updated"});
                        }).catch(err=>{
                            res.json({result:err});
                        });
                    }
                
                
            }).catch(err=>{
                res.json({result:err});

            })
            }

            
           
        }
    })
}


module.exports.deleteQuestion=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        Question.findByIdAndDelete({_id:req.params.id})
        .then(result=>{
            res.json({success:true,result:result,message:"the question askedby"+authData.user.username+"is deleted"})
        }).catch(err=>{
            res.json({success:false,result:err})
        })
    })
}

module.exports.deleteQuestion=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            if(authData.user.role==="professional"){
                 Question.findById(req.params.id)
        .then(question=>{
            Question.remove(question).then(question=>{
                res.json({question:question})
            })

        }).catch(err=>{
            res.json({question :err})
        })
            }
        }
       
    })
}

