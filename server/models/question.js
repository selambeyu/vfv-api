const mongoose=require('mongoose');

const QuestionSchema=mongoose.Schema({
    question:{
        type:String
    },
    answer:{
        type:String
    }
  
});

module.exports=mongoose.model('question',QuestionSchema);