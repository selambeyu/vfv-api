const  express=require('express');
const router=express.Router();
const UserController=require('../controllers/users');
const StudentController=require('../controllers/students')
const verifyToken=require('../config/auth');



router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.get('/profile',verifyToken,UserController.profile);

router.get('/student/profile',);
router.get('/student/addInfo',verifyToken);
router.get('/student/viewArticle',verifyToken,StudentController.getData);


// router.delete();

// function verifyToken(req,res,next){
//   const bearerHeader=req.headers['authorization'];
//   if(typeof bearerHeader!=='undefined'){
// // sprlit at thes space
// const bearer=bearerHeader.split(' ');
// //get tokent from array 
// const bearerToken=bearer[1];
// req.token=bearerToken;

// next();
//   }else{
//     res.sendStatus(403);
//   }
// }


// function isProfessional(req,res,next){
//     jwt.verify(req.token,config.secret,(err,authData)=>{
//       if(authData.user.role==='professional'){
//           res.json({
//               message:"profesional",
//               authData
//           });
// next();

//       }else{
//           res.sendStatus(403);
//       }
//       })

// }

module.exports=router