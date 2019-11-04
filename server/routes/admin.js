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


/**
 * @api {get} /  Request Admin information
 * @apiName GetAdmin
 * @apiGroup Admin
 *

 *
 * 
 *@apiSuccess {String}   username of the Admin.
 */
router.get('/',AdminController.adminPage);
/**
 * @api {post} /register Request Admin information
 * @apiName RegisterAdmin
 * @apiGroup Admin
 *

 *
 * @apiSuccess {String} username Firstname of the Admin.
 * @apiSuccess {String} email  Lastname of the Admin.
 * @apiSuccess {String} password  Lastname of the Admin.
 *
 */
router.post('/register',AdminController.register);
/**
 * @api {post} /login Request Admin information
 * @apiName login
 * @apiGroup Admin
 *

 *
 * @apiSuccess {String} Token  of the Admin.
 * 
 */
router.post('/login',verifyToken,AdminController.login);
/**
 * @api {post} /profile Request Admin information
 * @apiName profileAdmin
 * @apiGroup Admin
 *

 *
 * @apiSuccess {String} username Firstname of the Admin.
 * @apiSuccess {String} email  Lastname of the Admin.
 *
 */
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
