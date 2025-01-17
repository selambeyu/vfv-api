const mongoose=require('mongoose');

const ArticleSchema=mongoose.Schema({
    author:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true,
        
    },
    comment:{
        type:String,

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

module.exports=mongoose.model('Article',ArticleSchema);