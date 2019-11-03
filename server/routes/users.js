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
router.get('/student/addInfo',verifyToken,StudentController.addInfo);
router.put('/student/editprofile',verifyToken,StudentController.editProfile);
router.get('/student/viewArticle',verifyToken,StudentController.getData);
router.get('/student/viewQuestion',verifyToken,QuestionController.getQuestion);
router.post('/student/createQuestion',verifyToken,QuestionController.createQuestion);
router.put('/student/updateQuestion/:id',verifyToken,QuestionController.updateQuestion);
router.delete('/student/deleteQuestion/:id',verifyToken,QuestionController.deleteQuestion);

router.post('/professional/addInfo',verifyToken,ProfessionalController.addInfo);
router.put('/professional/editProfile',verifyToken,ProfessionalController.editProfile);
router.post('/professional/addArticle',verifyToken,ArticelController.addArticle)
router.get('/professional/viewArticle',verifyToken,ArticelController.getArticle);
router.put('/professional/editArticle',verifyToken,ArticelController.editArticle);
router.delete('/professional/deleteArticle',verifyToken,ArticelController.deleteArticle)
router.get('/professional/viewQuestion',verifyToken,QuestionController.getQuestion);
router.get('/professional/viewArticel/:id',verifyToken,ProfessionalController.getData);
// router.get('/professional/profile',verifyToken,ProfessionalController.profile);
router.get('/professional/viewAnswer',verifyToken,AnswerController.viewAnswer);
router.post('/professional/answerQuestion/:id',verifyToken,AnswerController.answerQuestion);
router.put('/professional/updateAnswer/:id',verifyToken,AnswerController.updateAnswer);
// router.delete('/professional/deleteAnswer/:id',verifyToken,AnswerController)







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