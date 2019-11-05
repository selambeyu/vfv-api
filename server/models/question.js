const mongoose=require('mongoose');

const QuestionSchema=mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    
    askedBy:{
        type:String,
        unique:true
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

module.exports=mongoose.model('Question',QuestionSchema);