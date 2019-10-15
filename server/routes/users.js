const  express=require('express');
const router=express.Router();
const UserController=require('../controllers/users')



router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.get('/profile',verifyToken,UserController.profile);

// router.delete();

function verifyToken(req,res,next){
  const bearerHeader=req.headers['authorization'];
  if(typeof bearerHeader!=='undefined'){
// sprlit at thes space
const bearer=bearerHeader.split(' ');
//get tokent from array 
const bearerToken=bearer[1];
req.token=bearerToken;

next();
  }else{
    res.sendStatus(403);
  }
}

module.exports=router