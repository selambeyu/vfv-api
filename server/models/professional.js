const mongoose=require('mongoose');

const ProfessionalSchema=mongoose.Schema({
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
    professionType:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    workPlace:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    highschool:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,

    },
    isVerified:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model('Professional',ProfessionalSchema);