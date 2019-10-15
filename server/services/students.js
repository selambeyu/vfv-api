//const mongoose=require('mongoose');
const Student=require('../models/students');

module.exports.addStudentInfo=function(data,callback){
    Student.create(data).then((response)=>{
        callback(null,response);
    },(error)=>{
        callback(error,null);
    })
}

module.exports.updateStudentProfile=function(query,data,options,callback){
    Student.findOneAndUpdate(query,data,options,(err,response)=>{
        callback(err,response)
    });

}

