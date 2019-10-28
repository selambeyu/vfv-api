process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
const article=require('../server/routes/article');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block

/*
  * Test the /GET route
  */
  describe('/GET ariticle', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/getArticle')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });



describe('/POST article', () => {
    it('it should not POST a aritcle without field', (done) => {
        let article = {
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      chai.request(server)
          .post('/newArticle')
          .send(article)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('pages');
                res.body.errors.pages.should.have.property('kind').eql('required');
            done();
          });
    });

});

