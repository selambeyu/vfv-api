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
    },
    educationLevel:{
        type:String,
        required:true
    },
    bio:{
        type:String
    },
    region:{
        type:String
    },
    zone:{
        type:String
    },
    werda:{
        type:String
    }
});

module.exports=mongoose.model('StudentSchema',StudentSchema);