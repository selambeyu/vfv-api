var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/express', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/view',function(req,res,next){
  res.render('blank-page',{title:'Adminlte'});
});
router.get('/',function(req,res,next){
  res.render('login',{title:"login"})
})
module.exports = router;
