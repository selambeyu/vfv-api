const ArticleController=require('../controllers/articles');
const express=require('express');
const router=express.Router();


router.post('/newArticle',ArticleController.create);
router.put('/updateArticle',ArticleController.update);
// router.get('/getArticle',ArticleController.)
router.delete('/deleteArticle',ArticleController.delete);

module.exports=router