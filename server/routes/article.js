const ArticleController=require('../controllers/articles');
const express=require('express');
const router=express.Router();


router.post('/newArticle',ArticleController.create);
router.put('/updateArticle',ArticleController.update);
router.get('/getArticle',ArticleController.getData)
router.get('/getauthor',ArticleController.getByauthor);
router.delete('/deleteArticle',ArticleController.delete);

module.exports=router