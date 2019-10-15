const Article=require('../models/articel');


module.exports.addArticle=function(newArticle,callback){
    newArticle.save(callback);

}
exports.createArticle = function (newArticle, callback) {
    Article.create(newArticle).then((response) => {
        callback(null, response);
    }, (error) => {
        callback(error, null);
    });
};
module.exports.postArticle=function(){

}

module.exports.updateArticleById=function(id,data,callback){
Article.findByIdAndUpdate({_id:id},data,(err,response)=>{
    callback(err,response);
})
}

module.exports.updateArticleByTitle=function(query,data,options,callback){
    Article.findOneAndUpdate(query,data,options,(err,response)=>{
        callback(err,response);
    });
}



module.exports.getAllArticl=function(query,callback){
Article.findOne(query,callback);
}



module.exports.deleteArticlByTitle=function(query,callback){
    Article.deleteOne(query,callback);

}

