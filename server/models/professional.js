const mongoose=require('mongoose');

const ProfessionalSchema=mongoose.Schema({
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

    }
});

module.exports=mongoose.model('ProfessionalSchema',ProfessionalSchema);