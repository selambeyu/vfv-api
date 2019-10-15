const mongoose=require('mongoose');

const TrainingCenterSchema=mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    compayDescription:{
        type:String,

    },
    trainingType:{
        type:String
    }
})

module.exports=mongoose.model('TrainingCenterSchema',TrainingCenterSchema)