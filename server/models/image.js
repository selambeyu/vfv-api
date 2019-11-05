const mongoos=require('mongoose');
const ImageModel=mongoos.Schema({
    image:{
        type:String
    }
})

module.exports=mongoos.model('image',ImageModel);