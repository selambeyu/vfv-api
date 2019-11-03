const multer=require('multer');
  
var Storage=multer.diskStorage({
    destination:"./publics/uploads/",
    filename:(req,file,cb)=>{
        cb(null,filename.fieldname+"-"+Date.now()+path.extname(file.originalname));
    }
})

module.exports.upload=multer({
    storage:Storage
}).single('file');