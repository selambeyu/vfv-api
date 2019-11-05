const ArticleModel=require('../models/articel');
const jwt=require('jsonwebtoken');
const config=require('../config/config');

module.exports.addArticle=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            if(authData.role==="professional"){

                 const newArticle=new ArticleModel({
                                author:authData.username,
                                title:req.body.title,
                                content:req.body.content,
                                comment:req.body.comment
                            });
                            newArticle.save().then(article=>{
                                res.json({
                                    article:article
                                })

                            }).catch(err=>{
                                res.json({
                                    article:err
                                })
                            })


            }else{
                res.json({message:"you don't have permission for this"})
            }
           
        }
    })

}

module.exports.editArticle=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{

            if(authData.role==="professional"){
                ArticleModel.findById({_id:req.params.id}).then(result=>{
                if(authData.username===result.author){
                    ArticleModel.findByIdAndUpdate({_id:req.params.id},{$set:req.body}).then(article=>{
                        res.json({
                            article:article
                        })
                    }).catch(err=>{
                        res.json({
                           article:err 
                        })
                    })
                }

            }).catch(err=>{
                res.json({
                    result:err
                })
            })
            }else{
                res.json({
                    message:"You don't have permmison for this"
                })
            }
            
        }
    })

}

module.exports.deleteArticle=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            ArticleModel.findById({_id:req.params.id}).then(result=>{
                if(authData.username===result.author){
                    ArticleModel.findByIdAndDelete({_id:req.params.id}).then(success=>{
                        res.json({
                            success:success,
                            message:"Deleted"
                        })
                    }).catch(err=>{
                        res.json({
                            success:err
                        })
                    })
                }else{
                    res.json({message:"You have no permission for this"})
                }
            }).catch(err=>{
                res.json({
                    result:err
                })
            })
        }
    })

}


module.exports.getByTitle=(req,res)=>{
jwt.verify(req.token,config.secret,(err,authData)=>{
    if(err){
        res.sendStatus(403);
    }else{
        ArticleModel.find({title:req.body.title}).then(article=>{
            res.json({
                article:article
            })
        }).catch(err=>{
            res.json({
                article:err
            })
        })
    }
})


}

module.exports.getByauthor=(req,res)=>{
    jwt.verify()

}

module.exports.getArticle=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            ArticleModel.find().then(article=>{
                res.json({article:article});
            }).catch(err=>{
                res.json({article:err})
            })
        }
    })
    
}


module.exports.searchArticle=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            var obj={};
            if(req.body.author){
                obj['author']=req.body.author;
            }

            if(req.body.title){
                obj['title']=req.body.title;
            }
            ArticleModel.find(obj,(err,result)=>{
                if(err)throw err;
                res.json({result:result})
            })
        }
    })
}

