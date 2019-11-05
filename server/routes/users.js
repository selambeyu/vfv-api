const  express=require('express');
const router=express.Router();
const UserController=require('../controllers/users');
const StudentController=require('../controllers/students');
const ProfessionalController=require('../controllers/professionals');
const TrainingCenterController=require('../controllers/trainingcenter');
const ArticelController=require('../controllers/articles');
const QuestionController=require('../controllers/question');
const AnswerController=require('../controllers/answer');
const checkrole=require('../config/checkRole');

const verifyToken=require('../config/auth');


/**
 * @api {post} /register Request User information
 * @apiName Registerser
 * @apiGroup User
 *
 * @apiSuccess {String} username Firstname of the User.
 * @apiSuccess {String} email  Lastname of the User.
 * @apiSuccess {String} role  Lastname of the User.
 *@apiSuccess {String} password  Lastname of the User.
 */
router.post('/register',UserController.register);

/**
 * @api {post} /login Request User information
 * @apiName loginUser
 * @apiGroup User
 *

 *
 * @apiSuccess {String} token Firstname of the User.

 */
router.post('/login',UserController.login);
/**
 * @api {get} /profile Request Student information
 * @apiName GetProfile
 * @apiGroup User
 *
 * 
 * 

 *
 * @apiSuccess {String} username Firstname of the User.
 * @apiSuccess {String} email  Lastname of the User.
 * @apiSuccess {String} role  Lastname of the User.
 *@apiSuccess {String} password  Lastname of the User.
 */
router.get('/profile',verifyToken,UserController.profile);

/**
 * @api {get} /student/profile Request User information
 * @apiName ProfileStudent
 * @apiGroup Student
 *
*  @apiParam {String} firsname Students .
 *@apiParam {String} firsname Students .
 * @apiParam {String} city of Students .
 * @apiParam {String} bio Students .
 * 
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} role  Lastname of the User.
 *@apiSuccess {String} password  Lastname of the User.
 */

router.get('/student/profile',verifyToken,StudentController.profile);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Student
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.post('/student/addInfo',verifyToken,StudentController.addInfo);
/**
 * @api {put} /student/editprofile/:id Request User information
 * @apiName ProfileStudent
 * @apiGroup Student
 * @apiParam {String} id unique id.
 *@apiParam {String} firsname Students .
 *@apiParam {String} firsname Students .
 * @apiParam {String} city of Students .
 * @apiParam {String} bio Students .

 *
 * @apiSuccess {String} firstname Firstname of the Student.
 * @apiSuccess {String} lastname  Lastname of the Student.
 * @apiSuccess {String} bio   of the Student.
 *@apiSuccess {String} city   the Student.
 */
router.put('/student/editprofile/:id',verifyToken,StudentController.editProfile);
/**
 * @api {get} /student/viewArticle Request User information
 * @apiName ViewArticle
 * @apiGroup Student
 *
* 
 * @apiSuccess {String} author  of the Article.
 * @apiSuccess {String} title  of the Article.
 * @apiSuccess {String} content  of the Article.
 *
 */

router.get('/student/viewArticle',verifyToken,ArticelController.getArticle);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName GetQuestion
 * @apiGroup Student
 *

 *
 * @apiSuccess {String} quetion  of the Student.
 * @apiSuccess {String} AskedBy  name  of the Student who asks question.
 * @apiSuccess {Number} createdDate   of the Question.
 *
 */
router.get('/student/viewQuestion',verifyToken,QuestionController.getQuestion);
/**
 * @api {post} /student/addinfo Request Question information
 * @apiName PostQuestion
 * @apiGroup Student
 * 
 * @apiParam {String} question of Students .
 * 
 *

 *
 * @apiSuccess {String} Question  of the Student.
 * @apiSuccess {String} Akedby   Student.
 * 
 */
router.post('/student/createQuestion',verifyToken,QuestionController.createQuestion);

/**
 * @api {put} /student/updateQuestion/:id Request question information
 * @apiName ProfileStudent
 * @apiGroup Student
 *
*@apiParam {String } id of the question
*@apiParam {Strin } question of the student
 *
 * @apiSuccess {String} Question of the Student.
 * @apiSuccess {bollean} succes=true  Success message.
 * 
 */
router.put('/student/updateQuestion/:id',verifyToken,QuestionController.updateQuestion);

/**
 * @api {delete} /student/deleteQuestion Request Question information
 * @apiName ProfileStudent
 * @apiGroup Student
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.delete('/student/deleteQuestion/:id',verifyToken,QuestionController.deleteQuestion);

/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Student
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.get('/student/ArticleByAuthor/:author',verifyToken,ArticelController.getByauthor);

/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Student
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.get('/student/ArticleByTitle/:title',verifyToken,ArticelController.getByTitle);

/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Student
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.get('/student/gettrainingcenter/:companyName',verifyToken,TrainingCenterController.getTrainingcenterByName);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Student
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.get('/student/gettrainingceneter',verifyToken,TrainingCenterController.getTrainingcenter);


/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */

router.get('/professional/profile',verifyToken,ProfessionalController.profile);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.post('/professional/addInfo',verifyToken,ProfessionalController.addInfo);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.put('/professional/editProfile',verifyToken,ProfessionalController.editProfile);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.post('/professional/addArticle',verifyToken,ArticelController.addArticle);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.get('/professional/viewArticle',verifyToken,ArticelController.getArticle);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.put('/professional/editArticle',verifyToken,ArticelController.editArticle);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.delete('/professional/deleteArticle',verifyToken,ArticelController.deleteArticle);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.get('/professional/viewQuestion',verifyToken,QuestionController.getQuestion);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.get('/professional/viewArticel',verifyToken,ArticelController.getArticle);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.get('/professional/articleByAuthor/:author',verifyToken,ArticelController.getByauthor);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.get('/professional/articleByTitle/:title',verifyToken,ArticelController.getByTitle);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
// router.get('/professional/profile',verifyToken,ProfessionalController.profile);

/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.get('/professional/viewAnswer',verifyToken,AnswerController.viewAnswer);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.post('/professional/answerQuestion/:id',verifyToken,AnswerController.answerQuestion);

/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.put('/professional/updateAnswer/:id',verifyToken,AnswerController.updateAnswer);

/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */

 /**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
// router.delete('/professional/deleteAnswer/:id',verifyToken,AnswerController);

router.get('/professional/getTrainingcenter/:companyName',verifyToken,TrainingCenterController.getTrainingcenterByName);

/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.get('/professional/getTrainingcenter',verifyToken,TrainingCenterController.getTrainingcenter);






/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup TrainingCenter
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */

router.get('/trainingcenter/profile',verifyToken,TrainingCenterController.profile);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup TrainingCenter
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.get('/trainingcenter/:companyName',verifyToken,TrainingCenterController.getTrainingcenterByName);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup TrainingCenter
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.post('/trainingcenter/addInfo',verifyToken,TrainingCenterController.addInfo);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup TrainingCenter
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */
router.put('/trainigcenter/editProfile',verifyToken,TrainingCenterController.editProfile);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName ProfileStudent
 * @apiGroup TrainingCenter
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} bio  Lastname of the User.
 *@apiSuccess {String} city  Lastname of the User.
 */

// router.delete('/trainingcenter/deleteprofile',verifyToken,TrainingCenterController)








module.exports=router