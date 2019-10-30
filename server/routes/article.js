const ArticleController=require('../controllers/articles');
const express=require('express');
const router=express.Router();
const Role=require('../config/role')
const checkrole=require('../config/checkRole')
const verifyToken=require('../config/auth');


router.post('/newArticle',checkrole(["professional"]),ArticleController.create);
router.put('/updateArticle',ArticleController.update);
router.get('/getArticle',verifyToken,ArticleController.getData)
router.get('/getauthor',ArticleController.getByauthor);
router.delete('/deleteArticle',ArticleController.delete);

module.exports=router