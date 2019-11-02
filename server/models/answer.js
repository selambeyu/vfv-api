const mongoose=require('mongoose');

const AnswerSchema=mongoose.Schema({
    
    questionAnswer:{
        type:String
    },
    answeredBy:{
        type:String,
        unique:true
    },
    question_Id:{
        type:String

    },
    createAt:{
        type:Date,
        default:Date.now
    },
    modified:{
        type:Date,
        default:Date.now
    }
    
  
});

module.exports=mongoose.model('Answer',AnswerSchema);