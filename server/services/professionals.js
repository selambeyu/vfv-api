//const mongoose=require('mongoose');
const Professional=require('../models/professional');

module.exports.addProfessionalInfo=function(data,callback){
    Professional.create(data).then((response)=>{
        callback(null,response);
    },(error)=>{
        callback(error,null);
    })
}

module.exports.updateProfessionalProfile=function(query,data,options,callback){
    Professional.findOneAndUpdate(query,data,options,(err,response)=>{
        callback(err,response)
    });

}

