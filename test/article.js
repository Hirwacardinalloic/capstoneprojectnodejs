process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Article = require('../models/Article');
let token='';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

/*
  * Test the /POST route
  */
 
//parent block
describe('/Article routes testing',()=>{

    describe('/GET PUBLISHED ARTICLES', () => {
        it('it should GET all the published articles', (done) => {
          chai.request(server)
              .get('/api/article/published')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array'); 
                    done();   
              });
               
        });
    });
        
    describe('/GET UNPUBLISHED ARTICLES', ()=>{
        it('it should GET all the unpublished articles', (done) => {
            const validCred= {
                "email": "cardinaloichirwa@gmail.com",
                "password": "man.united"
            }
            chai.request(server).post('/api/auth/login')
                .send(validCred)
                .then((loginResponse)=>{
                    //add token
                    token= 'Bearer ' + loginResponse.body.token;
                    chai.request(server)
                        .get('/api/article/unpublished')
                        .set('Authorization', token)
                        .end((err, res)=>{
                            res.should.have.status(200);
                            res.body.should.be.a('array');
    
                            done();
                        });
                        
    
                });
            
                
                
          });
    
    });
    describe('/POST article title validation', () => {
        it('it should not POST an article if there is no title', (done) => {
            let article = {
                content: "J.R.R. Tolkien"
                
            }
          chai.request(server)
              .post('/api/article/')
              .set('Authorization', token)
              .send(article)
              .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('articleTitle');
                    res.body.errors.articleTitle.should.have.property('kind').eql('required');
                
                    done();
              });
             
        });
    
        it('it should not POST an article if there is no content', (done) => {
            let article = {
                articleTitle: "This is an article"
                
            }
          chai.request(server)
              .post('/api/article/')
              .set('Authorization', token)
              .send(article)
              .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('content');
                    res.body.errors.content.should.have.property('kind').eql('required');
                    done();
              });
              
        });
        it('it should post an article ', (done)=>{
            let article = {
                articleTitle: "This is an article",
                content: "J.R.R. Tolkien"
            }
    
            chai.request(server)
                .post('/api/article/')
                .set('Authorization', token)
                .send(article)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');

                    done();
                });
                
         });
    });

    describe('/PUT/:id article', () => {
        it('it should UPDATE an article given the id', (done) => {
            let article = new Article({ articleTitle: "The Lord of the Rings", content: "J.R.R. Tolkien"});
            article.save((err, article) => {
                  chai.request(server)
                  .put('/api/article/' + article._id)
                  .set('Authorization', token)
                  .send({articleTitle: "The Chronicles of Narnia", content: "C.S. Lewis",publicationStatus: true})
                  .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                  });
            });
            
        });
    });
        
    describe('/GET/:id article', () => {
        let article = new Article({ articleTitle: "The Lord of the Rings", content: "J.R.R. Tolkien"});
        let id;
        article.save().then(data=>{
            id= data._id
        });
        
        it('it should GET an article by the given id', (done) => {
        
             chai.request(server)
              .get('/api/article/' + id)
              .send(article)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    
                    done();
              });

           
    
        });
        it('it should not GET an article by a wrong id', (done) => {
        let fake_id = 'aaaaaa';
            chai.request(server)
             .get('/api/article/' + fake_id)
             .send(article)
             .end((err, res) => {
                   res.should.have.status(404);
                   res.body.should.be.a('object');
                   
                   done();
             });

          
   
       });
    });
    describe('/DELETE/:id article', () => {
        it("it shouldn't DELETE an article if you are not logged in", (done) => {
            let article = new Article({ articleTitle: "The Lord of the Rings", content: "J.R.R. Tolkien"});
            article.save((err, article) => {
                  chai.request(server)
                  .delete('/api/article/' + article._id)
                  .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.be.a('object');
                        res.body.should.have.property("message");
    
                        done();
                  });
                  
            });
            
        });
        it("It should delete an article when you are logged in",(done)=>{
            let article = new Article({ articleTitle: "The Lord of the Rings", content: "J.R.R. Tolkien"});
            article.save((err, article) => {
                  chai.request(server)
                  .delete('/api/article/'+ article._id)
                  .set('Authorization', token)
                  .end((err, res)=>{
                      res.should.have.status(200);
                      res.body.should.be.a('object');

                      done();
                  });
           });
        });

    });
});
