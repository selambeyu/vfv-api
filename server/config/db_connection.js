var mongoose=require('mongoose');
const config=require('./config');
// var URL=process.env.URL || 'mongodb://localhost/vfv_db';
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);


mongoose.connect(config.database,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true 
});


var db = mongoose.connection;

db.on('error',()=>{
    console.error('Erroo occured in db connection')
});


db.on('open',()=>{
    console.log("Db connection established successfully")
});
module.exports=db;