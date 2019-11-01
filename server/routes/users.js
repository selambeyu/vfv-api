const  express=require('express');
const router=express.Router();
const UserController=require('../controllers/users');
const StudentController=require('../controllers/students');
const ProfessionalController=require('../controllers/professionals');
const ArticelController=require('../controllers/articles');
const QuestionController=require('../controllers/question');
const AnswerController=require('../controllers/answer');
const checkrole=require('../config/checkRole');

const verifyToken=require('../config/auth');



router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.get('/profile',verifyToken,UserController.profile);

router.get('/student/profile',);
router.get('/student/addInfo',verifyToken);
router.get('/student/viewArticle',verifyToken,StudentController.getData);
router.get('/student/viewQuestion',verifyToken,QuestionController.getQuestion);
router.post('/student/createQuestion',verifyToken,QuestionController.createQuestion);
router.put('/student/updateQuestion/:id',verifyToken,QuestionController.updateQuestion);
router.delete('/student/deleteQuestion/:id',verifyToken,QuestionController.deleteQuestion);
router.get('/professional/viewQuestion');
router.post('/professional/answerQuestion/:id',AnswerController.answerQuestion);
router.put('/professional/updateAnswer/:id',AnswerController.updateAnswer);

router.get('/professional/viewArticel/:id',verifyToken,ProfessionalController.getData);
// router.get('/professional/profile',verifyToken,ProfessionalController.profile);





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