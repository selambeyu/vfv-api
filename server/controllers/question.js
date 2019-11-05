const Question=require('../models/question');
const jwt=require('jsonwebtoken');
const config=require('../config/config')



module.exports.createQuestion=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
          res.sendStatus(403);
        }else{
            
            console.log(authData.role);
            if(authData.role==="student"){
                const question_txt=new Question({
                    question:req.body.question,
                    askedBy:authData.username,
      
      
                })
      
                question_txt.save()
                .then(result=>{
                    res.json({
                        sucess:true,result:result
                    })
                })
                .catch(err=>{
                    res.json({success:false,result:err})
                })
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
            if(authData.role==="student"){
                Question.findById(req.params.id).then(result=>{
                    if(authData.username===result.askedBy){
                        // result.question=req.body.question;
                        Question.findByIdAndUpdate({_id:req.params.id},req.body).then(question=>{
                            res.json({question:question,message:"updated"});
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




// module.exports.deleteQuestion=(req,res)=>{
//     jwt.verify(req.token,config.secret,(err,authData)=>{
//         if(err){
//             res.sendStatus(403);
//         }else{
//             if(authData.role==="student"){
//                  Question.findById(req.params.id)
//         .then(result=>{
//             if(authData.username===result.username){
//             Question.findByIdAndDelete({_id:req.params.id}).then(question=>{
//                 res.json({question:question,message:"Deleted"})
//             })

//         }).catch(err=>{
//             res.json({result :err})
//         })
//             }
//         }
//     }
//     })
// }

module.exports.deleteQuestion=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            if(authData.role==="student"){
                Question.findById({_id:req.params.id}).then(result=>{
                    if(authData.username===result.askedBy){
                        Question.findByIdAndDelete({_id:req.params.id}).then(question=>{
                            res.json({question:question,message:"Deleted"})
                        }).catch(err=>{
                            res.json({question:err})
                        })
                    }
                }).catch(err=>{
                    res.json({
                        result:err
                    })
                })
            }
        }
    })
}