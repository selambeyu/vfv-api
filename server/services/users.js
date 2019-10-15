const User=require('../models/users');


module.exports.getUserById=function(id,callback){
    User.findById(id,callback );
}

// find user by its username

module.exports.getUserByUsername=function(username,callback){
    const query={
        username:username
    }
    User.findOne(query,callback)
}

//to register the user

module.exports.addUser=function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err)return err;
            newUser.password=hash;
            newUser.save(callback)
        });
    });
}


module.exports.comparePassword=function(password,hash,callback){
    bcrypt.compare(password,hash,(err,isMatch)=>{
        if(err)throw err;
        callback(null,isMatch);
    });
}