const ArticleModel=require('../models/articel');

module.exports={
    create:(req,res)=>{
        const articel=new ArticleModel({
            author:req.body.author,
            title:req.body.title,
            content:req.body.content,
            comment:req.body.comment
        });
       articel.save()
       .then(result=>{
           res.json({success:true,result:result});
       })
       .catch(err=>{
           res.json({success:false,result:err});
       });
    },
    update:(req,res)=>{
        ArticleModel.update({_id:req.body._id},req.body)
        .then(articel=>{
            if(!articel) res.json({success:false,result:"professional does not exit"});
            res.json(articel)
        })
        .catch(err=>{
            res.json({succes:true,result:err})
        })
    },
    getData:(req,res)=>{
        ArticleModel.find({})
        .then(result=>{
            if(!result)res.json({success:false,result:"No result found"})
            res.json({success:true,result:result})
        })
        .catch(err=>{
            res.json({success:false,result:err});
        })
    },
    getById:(req,res)=>{
        ArticleModel.findById({_id:req.body._id}).then(result=>{
            if(!result)res.json({success:false,result:"No result fount"})
            res.json({succes:true,result:result});
        }).catch(err=>{
            res.json({succes:false,result:err});
        })
    },
    getByauthor:(req,res)=>{
        ArticleModel.findOne({author:req.body.author}).then(result=>{
            if(!result)res.json({succes:false,result:"No result found"})
            res.json({succes:true,result:result});
        }).catch(err=>{
            res.json({succes:false,result:err});
        })
    },
    getByTitle:(req,res)=>{
        ArticleModel.findOne({title:req.body.title}).then(result=>{
            if(!title)res.json({succes:false,result:"NO result Found"})
            res.json({succes:true,result:result});
        }).catch(err=>{
            res.json({succes:false,result:err});
        })
    }
    ,
    delete:(req,res)=>{
        ArticleModel.remove({_id:req.body._id})
        .then(result=>{
            if(!result)res.json({succes:false,result:"no user with this id"})
            res.json({success:true,result:result})
        })
        .catch(err=>{
            res.json({success:false,result:err})
        })
    }

}