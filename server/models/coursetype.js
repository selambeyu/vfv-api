const mongoose=require('mongoose');

const CourseTypeSchema=mongoose.Schema({
    courseType:{
        type:String,
        requred:true
    },
    courseDescription:{
        type:String
    }
})

module.exports=mongoose.model('CourseTypeSchema',CourseTypeSchema);