const mongoose=require('mongoose');

const TrainingCenterSchema=mongoose.Schema({
    useId:{
        type:String,
        unique:true
    },
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

module.exports=mongoose.model('TrainingCenter',TrainingCenterSchema)