const mongoose=require('mongoose');

const StudentSchema=mongoose.Schema({
    userId:{
        type:String,
        unique:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    interest:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Student',StudentSchema);