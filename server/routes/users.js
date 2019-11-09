const  express=require('express');
const multer=require('multer');
const router=express.Router();
const UserController=require('../controllers/users');
const StudentController=require('../controllers/students');
const ProfessionalController=require('../controllers/professionals');
const TrainingCenterController=require('../controllers/trainingcenter');
const ArticelController=require('../controllers/articles');
const QuestionController=require('../controllers/question');
const AnswerController=require('../controllers/answer');
// const checkrole=require('../config/checkRole');
const ImageController=require('../controllers/image');
const verifyToken=require('../config/auth');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./upload/');
    },
    filename:function(req, file, cb){
        cb(null, file.originalname);
    }
});

  const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/jpeg' || 'image/png'){
     cb(null, true);
    }else{
        cb(null, flase);
    }
    
};
   const upload = multer({
    storage: storage,
    limits:{
    fileSize:1024 * 1024 * 5
},
fileFilter:fileFilter
});




// router.post('/upload',upload.single('image'),ImageController.upload);
/**
 * @api {post} /register  User Registration
 * @apiName RegisteUser
 * @apiGroup User
 *
 * @apiSuccess {String} usernam of the User.
 * @apiSuccess {String} role   of the User.
 * @apiSuccess {String} email   of the User.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      success:true,
 *      result:[{
 *       "username": "melkamb",
 *       "email": "melkamb3392beyu@gmail.com",
 *        "role":"student"
 *     }],
 *      "message":"User Registered successfuly"
 *     
 *
 * @apiError UserNotfound.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success":false,
 *         "result":err
 *     }
 *
 */
router.post('/register',UserController.register);

/**
 * @api {post} /login Request User information
 * @apiName loginUser
 * @apiGroup User
 * 
 * @apiParams {String } username of User
 * @apiParams {String } password of User
 *
 *  @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      success:true,
 *      token:token
 *
 *  @apiError UserNotRegistered .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success":false,
 *         "result":err
 *     }
 *     
 *

 *
 * @apiSuccess {String} token  the User.
 * @apiSuccess {String}

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
 *
 */
router.get('/profile',verifyToken,UserController.profile);

/**
 * @api {get} /student/profile Request User information
 * @apiName ProfileStudent
 * @apiGroup Student
 *
* 
 * 
 *
 * @apiSuccess {String} firstname of Student.
 * @apiSuccess {String} lastname  Lastname of thes Student.
 * @apiSuccess {String} interest  Interest of the Student.
 * @apiSuccess {String} address  address of the Student.
 *
 */
router.get('/student/getStudent',verifyToken,StudentController.getStudent);
router.get('/student/profile',verifyToken,StudentController.profile);
/**
 * @api {post} /student/addinfo Request User information
 * @apiName addStudentInfo
 * @apiGroup Student
 * 
 * @apiParams {String} firstname of The Student
 * @apiParams {String} lastname of the Student
 * @apiParams {String} addres of the student
 * @apiParams {String} interest
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      success:true,
 *      result:{
 *          "firstname":"melkam",
 *          "lastname":"beyene",
 *           "address":"addis ababa",
 *            "interest":"tech"
 * 
 *              }
 *
 *  @apiError UserNotRegistered .
 *
 * @apiErrorExample Error-Response:
 *    
 *     {
 *       "success":false,
 *         "result":err
 *     }
 *     
 *

 * @apiSuccess {String} firstname Firstname of the Student.
 * @apiSuccess {String} lastname  Lastname of the Student.
 * @apiSuccess {String} interest  Interest of the Student.
 * @apiSuccess {String} address  Address of the Stident.
 */
router.post('/student/addInfo',verifyToken,StudentController.addInfo);
/**
 * @api {put} /student/editprofile/:id Request User information
 * @apiName ProfileStudent
 * @apiGroup Student
 * @apiParams {String} id unique id.
 * @apiParams {String} firsname Students .
 * @apiParams {String} last Students .
 * @apiParams {String} addres of Students .
 * @apiParams {String} interest Students .

 *
 * @apiSuccess {String} firstname Firstname of the Student.
 * @apiSuccess {String} lastname  Lastname of the Student.
 * @apiSuccess {String} interest Interes   of the Student.
 * @apiSuccess {String} address   Adderes of the Student.
 */
router.put('/student/editprofile/:id',verifyToken,StudentController.editProfile);
/**
 * @api {get} /student/viewArticle get Articel information
 * @apiName GetArticle
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
 * @api {get}  /student/viewQuestion get question information
 * @apiName GetQuestion
 * @apiGroup Student
 *

 *
 * @apiSuccess {String} question  of the Student.
 * @apiSuccess {String} AskedBy  name  of the Student who asks question.
 * @apiSuccess {Number} createdDate   of the Question.
 *
 */
router.get('/student/viewQuestion',verifyToken,QuestionController.getQuestion);
/**
 * @api {post} /student/createQuestion add Question information
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
 * @api {put} /student/updateQuestion/:id update question information
 * @apiName updateQuestion
 * @apiGroup Student
 *
* @apiParams {String } id of the question
* @apiParams {String } question of the student
 *
 * @apiSuccess {String} Question of the Student.
 * @apiSuccess {bollean} succes=true  Success message.
 * 
 */
router.put('/student/updateQuestion/:id',verifyToken,QuestionController.updateQuestion);

/**
 * @api {delete} /student/deleteQuestion Delete Question information
 * @apiName deleteQuestion 
 * @apiGroup Student
 *
@apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      success:true,
 *      "message":"Deleted"
 *
 *  @apiError QuestionNOtDeleted
 *
 * @apiErrorExample Error-Response:
 *    
 *     {
 *       "success":false,
 *         "result":err
 *     }
 *     
 *
 *
 * 
 */
router.delete('/student/deleteQuestion/:id',verifyToken,QuestionController.deleteQuestion);

/**
 * @api {get} /student/ArticleByAuthor/:author fo Request User information
 * @apiName getArticleByAuthor
 * @apiGroup Student
 *
* @apiParams {String} author of the Article.
 *
 * @apiSuccess {String} title  of the Article.
 * @apiSuccess {String} content   of the Article.
 * 
 */
router.get('/student/ArticleByAuthor/:author',verifyToken,ArticelController.getByauthor);

/**
 * @api {get} /student/ArticleByTitle/:title Request User information
 * @apiName GetArticleByTitle
 * @apiGroup Student
 *
* @apiParams {String} title of the article
 *
 * @apiSuccess {String} author of the Ariticle.
 * @apiSuccess {String} content  of the Article.
 * 
 */
router.get('/student/ArticleByTitle/:title',verifyToken,ArticelController.getByTitle);

/**
 * @api {get} /student/gettrainingcenter/:companyName get Trainigcenter information
 * @apiName GetrainingByCompanyName
 * @apiGroup Student
 *

 *
 * @apiSuccess {String} address Addres of the Trainigcenter.
 * @apiSuccess {String} location  location of the Trainigcenter.
 * @apiSuccess {String} courses  Course of the Trainigcenter.
 *
 */
router.get('/student/gettrainingcenter/:companyName',verifyToken,TrainingCenterController.getTrainingcenterByName);
/**
 * @api {get} student/gettrainingceneter Request Trainingcenter information
 * @apiName GetTrainingcenter
 * @apiGroup Student
 *
 *
 * @apiSuccess {String} companyName  of the Trainigcenter.
 * @apiSuccess {String} city   of the Trainigcenter.
 * @apiSuccess {String} compayDescription   of the Trainingcenter.
 * @apiSuccess {String} trainingType   of the Trainigcenter.
 */
router.get('/student/gettrainingceneter',verifyToken,TrainingCenterController.getTrainingcenter);


/**
 * @api {get} /professional/profile Request Professional information
 * @apiName ProfessionalProfile
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} professionType  Lastname of the User.
 * @apiSuccess {String} professionType  Lastname of the User.
 * @apiSuccess {String} college Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} highschool  Lastname of the User.
 *
 */

router.get('/professional/profile',verifyToken,ProfessionalController.profile);
/**
 * @api {post} /professional/addInfo Request User information
 * @apiName ProfileStudent
 * @apiGroup Professional
 *
* @apiParams {String} firstname of the professional
* @apiParams {String} lastname of the professional
* @apiParams {String} professionType of the professional
* @apiParams {String} address of the professional
* @apiParams {String} college of the professional
* @apiParams {String} WorkPlace of the professional
                    
 * @apiSuccess {String} firstname  of the professionl.
 * @apiSuccess {String} lastname   of the professional.
 * @apiSuccess {String} professionType   of the professional.
 * @apiSuccess {String} college   of the professional.
 * @apiSuccess {String} WorkPlace   of the professional.
 
 */
router.post('/professional/addInfo',verifyToken,ProfessionalController.addInfo);
/**
 * @api {put} //professional/editProfile/:id Update professional information
 * @apiName professionalProfile
 * @apiGroup Professional
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      success:true,
 *      "message":"udpdated"
 *
 *  @apiError profileNotEdited
 *
 * @apiErrorExample Error-Response:
 *    
 *     {
 *       "success":false,
 *         "result":err
 *     }
 *     
 *
 *
 * 
 */
router.put('/professional/editProfile/:id',verifyToken,ProfessionalController.editProfile);
/**
 * @api {post} //professional/addArticle post Article information
 * @apiName AddArticle
 * @apiGroup Professional
 * 
 * 
 * @apiParams {String} title of the article
 * @apiParams {String} Content of the article


 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      success:true,
 *      "message":"created"
 *
 *  @apiError articleNotCreated
 *
 * @apiErrorExample Error-Response:
 *    
 *     {
 *       "success":false,
 *         "result":err
 *     }
 *
 * @apiSuccess {String} title  of the Article.
 * @apiSuccess {String} content   of the Article.
 * 
 */
router.post('/professional/addArticle',verifyToken,ArticelController.addArticle);
/**
 * @api {get} /professional/viewArticle Request Article information
 * @apiName Arricle
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} title  of the Article.
 * @apiSuccess {String} content   of the Article.
 * @apiSuccess {String} author   of the Artilc.
 * @apiSuccess {Date} createDat   of the Article.
 */
router.get('/professional/viewArticle',verifyToken,ArticelController.getArticle);
/**
 * @api {put} /professional/editArticle/:id Update Article information
 * @apiName AricleInfor
 * @apiGroup Professional
 *

 * @apiSuccess {String} title  of the Article.
 * @apiSuccess {String} content   of the Article.
 * 
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      success:true,
 *      "message":"updated"
 *
 *  @apiError articleNotupdated
 *
 * @apiErrorExample Error-Response:
 *    
 *     {
 *       "success":false,
 *         "result":err
 *     }
 *
 *
 * 
 */
router.put('/professional/editArticle/:id',verifyToken,ArticelController.editArticle);
/**
 * @api {post} /professional/deleteArticle/:id Delet Article information
 * @apiName DeleteAricle
 * @apiGroup Professional
 *
@apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      success:true,
 *      "message":"deleted"
 *
 *  @apiError articleDelete
 *
 * @apiErrorExample Error-Response:
 *    
 *     {
 *       "success":false,
 *         "result":err
 *     }
 *
 *
 * 
 */
router.delete('/professional/deleteArticle/:id',verifyToken,ArticelController.deleteArticle);
/**
 * @api {get} /professional/viewQuestion Request question information
 * @apiName viewQuestion
 * @apiGroup Professional
 *
*
 *
 * @apiSuccess {String} Question  of the Student.
 * @apiSuccess {String} askedBy   Student.
 *
 */
router.get('/professional/viewQuestion',verifyToken,QuestionController.getQuestion);
/**
 * @api {post} /professional/viewArticel Request Artilcle information
 * @apiName viewAriticle
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} title  of the Aricle.
 * @apiSuccess {String} author   of the Article.
 * @apiSuccess {String} content   of the Article.
 *
 */
router.get('/professional/viewArticel',verifyToken,ArticelController.getArticle);
/**
 * @api {post} /professional/articleByAuthor/:author Request Article information
 * @apiName getAricleByAuthor
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} title  of the Question.
 * @apiSuccess {String} content   of the Article.
 * @apiSuccess {String} author   of the Article.
 * 
 */
router.get('/professional/articleByAuthor/:author',verifyToken,ArticelController.getByauthor);
/**
 * @api {post} /professional/articleByTitle/:title Request Article information
 * @apiName getAricleBytitle
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} author of the Article.
 * @apiSuccess {String} title   of the Artilce.
 * @apiSuccess {String} content   of the Article.
 *
 */
router.get('/professional/articleByTitle/:title',verifyToken,ArticelController.getByTitle);

// router.get('/professional/profile',verifyToken,ProfessionalController.profile);

/**
 * @api {get} /professional/viewAnswer Request answer information
 * @apiName viewAnswer
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} answer Firstname of the User.
 * @apiSuccess {String} answeredBy  Lastname of the User.
 *
 */
router.get('/professional/viewAnswer',verifyToken,AnswerController.viewAnswer);
/**
 * @api {post} /professional/answerQuestion/:id post answer 
 * @apiName answerQuestion
 * @apiGroup Professional
 * 
 * 
 * @apiParams {String} Answer  
 * @apiParams {String} Id of the question  

 *
 * @apiSuccess {String} Answer of the Professional.
 * @apiSuccess {String} answeredBy  the Professional.
 * 
 */
router.post('/professional/answerQuestion/:id',verifyToken,AnswerController.answerQuestion);

/**
 * @api {put} /professional/updateAnswer/:id' Update ansewer information
 * @apiName UpdataeAnswer
 * @apiGroup Professional
 *

* @apiParams {id} the id of the answer which is unique

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      success:true,
 *      "message":"Updated"
 *
 *  @apiError Answerupdated
 *
 * @apiErrorExample Error-Response:
 *    
 *     {
 *       "success":false,
 *         "result":err
 *     }
 *
 *
 * @apiSuccess {String} answer  of the Professional.
 *
 */
router.put('/professional/updateAnswer/:id',verifyToken,AnswerController.updateAnswer);



 /**
 * @api {get} /professional/getTrainingcenter/:companyName Trainingcenter information
 * @apiName getTrainingCenterBycompanyName
 * @apiGroup Professional
 *
 *
 *
 * @apiSuccess {String} companyName  of the Trainingcenter.
 * @apiSuccess {String} logo   of the Trainningcenter
 * @apiSuccess {String} city   of the Trainigcenter.
 * @apiSuccess {String} compayDescription   of the Trainigcenter.
 * @apiSuccess {String} trainingType   of the Trainingcenter.
 */
// router.delete('/professional/deleteAnswer/:id',verifyToken,AnswerController);

router.get('/professional/getTrainingcenter/:companyName',verifyToken,TrainingCenterController.getTrainingcenterByName);

/**
 * @api {post} /professional/getTrainingcenter Request User information
 * @apiName GetTrainingcenter
 * @apiGroup Professional
 *

 *
 * @apiSuccess {String} companyName  of the Trainingcenter.
 * @apiSuccess {String} logo   of the Trainningcenter
 * @apiSuccess {String} city   of the Trainigcenter.
 * @apiSuccess {String} compayDescription   of the Trainigcenter.
 * @apiSuccess {String} trainingType   of the Trainingcenter.
 */
router.get('/professional/getTrainingcenter',verifyToken,TrainingCenterController.getTrainingcenter);
/**
 * @api {post} /trainingcenter/profile Trainigcentr information
 * @apiName TrainigcentrProfile
 * @apiGroup TrainingCenter
 *

 *
 * @apiSuccess {String} companyName  of the Trainingcenter.
 * @apiSuccess {String} logo   of the Trainningcenter
 * @apiSuccess {String} city   of the Trainigcenter.
 * @apiSuccess {String} compayDescription   of the Trainigcenter.
 * @apiSuccess {String} trainingType   of the Trainingcenter.
 */

router.get('/trainingcenter/profile',verifyToken,TrainingCenterController.profile);
/**
 * @api {post} /trainingcenter/:companyName Request User information
 * @apiName getTrainingcentrbycompanyname
 * @apiGroup TrainingCenter
 *

 *
 * @apiSuccess {String} companyName  of the Trainingcenter.
 * @apiSuccess {String} logo   of the Trainningcenter
 * @apiSuccess {String} city   of the Trainigcenter.
 * @apiSuccess {String} compayDescription   of the Trainigcenter.
 * @apiSuccess {String} trainingType   of the Trainingcenter.
 */
router.get('/trainingcenter/:companyName',verifyToken,TrainingCenterController.getTrainingcenterByName);
/**
 * @api {post} /trainingcenter/addInfo Request User information
 * @apiName addProfileInfoTrainingcenter
 * @apiGroup TrainingCenter
 *
* @apiParams {String} companyName  of the Trainingcenter.
 * @apiParams {String} logo   of the Trainningcenter
 * @apiParams {String} city   of the Trainigcenter.
 * @apiParams {String} compayDescription   of the Trainigcenter.
 * @apiParams {String} trainingType   of the Trainingcenter.

 *

 *
 * @apiSuccess {String} companyName  of the Trainingcenter.
 * @apiSuccess {String} logo   of the Trainningcenter
 * @apiSuccess {String} city   of the Trainigcenter.
 * @apiSuccess {String} compayDescription   of the Trainigcenter.
 * @apiSuccess {String} trainingType   of the Trainingcenter.
 */
router.post('/trainingcenter/addInfo',verifyToken,TrainingCenterController.addInfo);
/**
 * @api {post} /trainigcenter/editProfile Request User information
 * @apiName ProfileStudent
 * @apiGroup TrainingCenter
 *
* @apiParams {String} Id  of the Trainingcenter.
 *
 * @apiSuccess {String} companyName  of the Trainingcenter.
 * @apiSuccess {String} logo   of the Trainningcenter
 * @apiSuccess {String} city   of the Trainigcenter.
 * @apiSuccess {String} compayDescription   of the Trainigcenter.
 * @apiSuccess {String} trainingType   of the Trainingcenter.
 */
router.put('/trainigcenter/editProfile',verifyToken,TrainingCenterController.editProfile);


module.exports=router