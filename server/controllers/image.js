const image=require('../models/image');

module.exports.upload=(req,res)=>{
    var newImage=new image({
        image:req.file                                                                                                                                                        
    });

    console.log(image);
    newImage.save().then(image=>{
        res.json({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            image:image
        })
    }).catch(err=>{
        res.json({
            image:err                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        })
    })                                                                                                                                                                  
}