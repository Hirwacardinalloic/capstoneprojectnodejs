process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Comments = require('../models/Comments');
let token='';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

//parent block
describe('/Get Comments', ()=>{
    it('It should get all article comment provided', done=>{
        const articleId = '5fcbbd5cb1a7d716b08fc650';
        chai.request(server)
            .get('/api/comments/'+ articleId)
            .end((err, res)=>{
                res.should.have.status(200);
                res.should.be.a('object');

                done();
                
            });

    });
    it('It should not post a comment without a article identifier', done=>{
        let comment = new Comments({
            commentSender: 'loic',
            senderEmail: 'loic@gmail.com',
            comment: 'some comment'
        });
        chai.request(server)
            .post('/api/comments/')
            .send(comment)
            .end((err, res)=>{
                res.should.have.status(422);
                res.should.be.a('object');

                done();
            });

    }); 
    it('It should not post an article without a sender email', done=>{
        let comment = new Comments({
            articleIdentifier: '5fcbbd5cb1a7d716b08fc650',
            commentSender: 'loic',
            comment: 'some comment'
        });
        chai.request(server)
            .post('/api/comments/')
            .send(comment)
            .end((err, res)=>{
                res.should.have.status(422);
                res.should.be.a('object');
                done();
            });

       
    }); 
    it('It should not post a comment without a sender name', done=>{
        let comment = new Comments({
            articleIdentifier: '5fcbbd5cb1a7d716b08fc650',
            senderEmail: 'loic@gmail.com',
            comment: 'some comment'
        });
        chai.request(server)
            .post('/api/comments/')
            .send(comment)
            .end((err, res)=>{
                res.should.have.status(422);
                res.should.be.a('object');

                done();
            });



        
    }); 
    it('It should not post a comment without a comment content', done=>{
        let comment = new Comments({
            articleIdentifier: '5fcbbd5cb1a7d716b08fc650',
            commentSender: 'loic',
            senderEmail: 'loic@gmail.com'
        });
        chai.request(server)
            .post('/api/comments/')
            .send(comment)
            .end((err, res)=>{
                res.should.have.status(422);
                res.should.be.a('object');

                done();
            });

        
    }); 
    it('It should post comment', done=>{
        let comment = new Comments({
            articleIdentifier: '5fcbbd5cb1a7d716b08fc650',
            commentSender: 'loic',
            senderEmail: 'loic@gmail.com',
            comment: 'some comment'
        });
        chai.request(server)
            .post('/api/comments/')
            .send(comment)
            .end((err, res)=>{
                res.should.have.status(200);
                res.should.be.a('object');

                done();
            });



       
    });        


});