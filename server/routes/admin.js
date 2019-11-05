const express = require('express');
const router = express.Router();
const passport =require('passport');
const jwt=require('jsonwebtoken');
router.use(passport.initialize());
router.use(passport.session());
const Admin=require('../models/admin');
//const db=require('../config/db_connection');
const config=require('../config/config');
const AdminController=require('../controllers/admin')



router.get('/',AdminController.adminPage);

router.post('/register',AdminController.register);

router.post('/login',verifyToken,AdminController.login);

router.get('/profile',verifyToken,AdminController.profile);



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
module.exports = router;
