const  express=require('express');
const router=express.Router();
const UserController=require('../controllers/users');
const checkAuth=require('../config/checkAuth');



router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.get('/profile',checkAuth,UserController.profile);

// router.delete();



module.exports=router