process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
const Article=require('../server/models/articel');
//Require the dev-dependencies
const request=require('supertest');


const app=require('../app');
const con =require('../server/config/db_connection');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block

/*
  * Test the /GET route
  */
  


  it ("Should Fecth all the Comments", (done)=>{
    chai.request(app)
        .get("/api/article/getArticle")
        .end((err, result)=>{
            result.should.have.status(200);
            // console.log ("Got",result.body.data.length, " docs")
            console.log ("Result Body:", result.body);
            
            // done()
        })
})



// describe('/POST article', () => {
//     it('it should not POST a aritcle without field', (done) => {
//         const articel=new Article({
//           title: "The Lord of the Rings",
//          author: "J.R.R. Tolkien",
//           content: "Lorem ipsum dolor sit amet, consectetur"
//         });
//         articel.save
//       chai.request(app)
//           .post('/api/article/newArticle')
//           .send({ "title": "The Lord of the Rings",
//          " author": "J.R.R. Tolkien",
//           "content": "Lorem ipsum dolor sit amet, consectetur"})
//           .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('errors');
//                 res.body.errors.should.have.property('pages');
//                 res.body.errors.pages.should.have.property('kind').eql('required');
//             done();
//           });
//     });

// });

it('it should post newu article', (done) => {
  //var question_id = mongoose.Types.ObjectId('5db473baa55d8b36c41b7fd4');
  let articel=new Article({
    title: "The Lord of the Rings",
   author: "J.R.R. Tolkien",
    content: "Lorem ipsum dolor sit amet, consectetur"
  });

  articel.save((err, articel) => {
      
        chai.request(app)
        .post("/api/article/newArticle")
        .send(articel)
        .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');	
                      // res.body.should.have.property('message').eql('Comment added successfully');
                      // res.body.should.have.property('status').eql('success');
                      req.body.should.have.property('_id');
                      req.body.should.have.property('author');
                      req.body.should.have.property('content'); 
                      req.body.should.have.property('title');
                      // res.body.comment.should.have.property('created_at');
          // done()
        });
  });
});
