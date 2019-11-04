const ArticleModel=require('../models/articel');
const jwt=require('jsonwebtoken');
const config=require('../config/config');

module.exports.addArticle=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            const newArticle=new ArticleModel({
                                author:authData.user.username,
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

        }
    })

}

module.exports.editArticle=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            ArticleModel.findById({_id:req.params.id}).then(result=>{
                if(authData.user.username===result.author){
                    ArticleModel.findByIdAndUpdate({_id:req.params},{$set:req.body}).then(article=>{
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
        }
    })

}

module.exports.deleteArticle=(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            ArticleModel.findById({_id:req.params.id}).then(result=>{
                if(authData.user.username===result.author){
                    ArticleModel.findByIdAndDelete({_id:req.params.id}).then(article=>{
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



// module.exports={
//     create:(req,res)=>{

//             const articel=new ArticleModel({
//                 author:req.body.author,
//                 title:req.body.title,
//                 content:req.body.content,
//                 comment:req.body.comment
//             });
//            articel.save()
//            .then(result=>{
//                res.json({success:true,result:result});
//            })
//            .catch(err=>{
//                res.json({success:false,result:err});
//            });

        
//     }
// ,
//     update:(req,res)=>{
//         ArticleModel.update({_id:req.body._id},req.body)
//         .then(articel=>{
//             if(!articel) res.json({success:false,result:"professional does not exit"});
//             res.json(articel)
//         })
//         .catch(err=>{
//             res.json({succes:true,result:err})
//         })
//     },
//     getData:(req,res)=>{
//         ArticleModel.find({})
//         .then(result=>{
//             if(!result)res.json({success:false,result:"No result found"})
//             res.json({success:true,result:result})
//         })
//         .catch(err=>{
//             res.json({success:false,result:err});
//         })
//     },
//     getById:(req,res)=>{
        
//         ArticleModel.findById({_id:req.body._id}).then(result=>{
//             if(!result)res.json({success:false,result:"No result fount"})
//             res.json({succes:true,result:result});
//         }).catch(err=>{
//             res.json({succes:false,result:err});
//         })
//     },
//     getByauthor:(req,res)=>{
//         ArticleModel.findOne({author:req.body.author}).then(result=>{
//             if(!result)res.json({succes:false,result:"No result found"})
//             res.json({succes:true,result:result});
//         }).catch(err=>{
//             res.json({succes:false,result:err});
//         })
//     },
//     getByTitle:(req,res)=>{
//         ArticleModel.findOne({title:req.body.title}).then(result=>{
//             if(!title)res.json({succes:false,result:"NO result Found"})
//             res.json({succes:true,result:result});
//         }).catch(err=>{
//             res.json({succes:false,result:err});
//         })
//     }
//     ,
//     delete:(req,res)=>{
//         ArticleModel.remove({_id:req.body._id})
//         .then(result=>{
//             if(!result)res.json({succes:false,result:"no user with this id"})
//             res.json({success:true,result:result})
//         })
//         .catch(err=>{
//             res.json({success:false,result:err})
//         })
//     }

// }