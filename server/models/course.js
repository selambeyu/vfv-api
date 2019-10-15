const mongoose=require('mongoose');

const CourseSchema=mongoose.Schema({
    coursTitle:{
        type:String,
        require:true
    },
    courseDescription:{
        type:String
    },
    trainigcenterName:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('CourseSchema',CourseSchema);