process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Login user',()=>{
    it('It should not login a user with an invalid email',(done)=>{
        chai.request(server)
            .post('/api/auth/login')
            .send({email: "test@gmail.com", password: "man.united"})
            .end((err, res)=>{
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done();
            });



        
    })
    it('It should not login a user with an invalid password', (done)=>{
        chai.request(server)
            .post('/api/auth/login')
            .send({email: "cardinaloichirwa@gmail.com", password: "man..united"})
            .end((err, res)=>{
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done();
            });


        
    });
    it('It should login a user with a valid email and password', (done)=>{

        chai.request(server)
            .post('/api/auth/login')
            .send({email: "cardinaloichirwa@gmail.com", password: "man.united"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('user');
                res.body.should.have.property('token');
                done();
            });
        
    });
});