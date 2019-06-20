import chai, {
    expect
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../server';
import dummyAd from '../dummyData/dummyAd';
import dummyAuth from '../dummyData/dummyAuth';
import tokenMan from '../../helpers/tokenMan';

const {
    validSignUp,
    validLogin,
    tokenizedAdmin,
    tokenizedSeller,
    tokenizedBuyer
} = dummyAuth;

let sellerToken = tokenMan.tokenizer(tokenizedSeller);
let adminToken = tokenMan.tokenizer(tokenizedAdmin)
let buyerToken = tokenMan.tokenizer(tokenizedBuyer);

const {
    validAdOne,
    validAdTwo, 
    invalidAdOne
} = dummyAd;

chai.use(chaiHttp);

describe('Car Sale Ad Test', () => {


    it('Should successfully sign up a new user', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send(validSignUp)
            .end((err, res) => {
                expect(res.body.status).to.be.eql(201);
                expect(res.body).to.be.an('object'); 
                expect(res.body.data).to.be.an('object'); 
                expect(res.body.message).to.deep.equal('Successfully Signed Up!');
                done();
            })
    }); 

    it('Should create a car sale ad', (done) => {
        chai
            .request(app)
            .post('/api/v1/car')
            .set('Authorization', `Bearer ${sellerToken}`)
            .send(validAdOne)
            .end((err, res) => {
                expect(res.body).to.be.an('object'); 
                expect(res.body.status).to.be.equal(201); 
                expect(res.body.data).to.be.an('object'); 
                expect(res.body.message).to.deep.equal('Car sale successfully created!');
                done();
            })
    }); 

    it('Should not create car sale ad without manufacturer', (done) => {
        chai
            .request(app)
            .post('/api/v1/car')
            .set('Authorization', `Bearer ${sellerToken}`)
            .send(invalidAdOne)
            .end((err, res) => {
                expect(res.body).to.be.an('object'); 
                expect(res.body.status).to.be.equal(400); 
                done();
            })
    }); 
    
    it('Should deny user access if no token provided', (done)=>{
        chai
        .request(app)
        .post('/api/v1/car')
        .set('Authorization', '')
        .send(validAdOne)
        .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(401);
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.deep.equal('Access Denied.');
            done();

        })
    })

    it('Should throw an error for an invalid signature', (done)=>{
        chai
        .request(app)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${sellerToken + 'xxx'}`)
        .send(validAdOne)
        .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(500);
            expect(res.body.error.message).to.deep.equal('invalid signature');
            done();

        })
    });

    it('Buyer should get one car sale ad', (done)=>{

        let car_id = 1;
        chai
        .request(app)
        .get(`/api/v1/car/${car_id}`)
        .set('Authorization', `Bearer ${sellerToken}`)
        .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(200);
            expect(res.body.data).to.be.an('object');
            expect(res.body.message).to.deep.equal('Congs, here\'s your result!');
            done();

        })
    });

    it('Admin should get all car sale ads', (done)=>{
        chai
        .request(app)
        .get('/api/v1/car')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(200);
            expect(res.body.data).to.be.an('array');
            expect(res.body.message).to.deep.equal('Here are all the cars!');
            done();

        })
    })

    it('It should not return available cars', (done)=>{
        chai
        .request(app)
        .get('/api/v1/car?status=available')
        .set('Authorization', `Bearer ${buyerToken}`)
        .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(500);
            done();

        })
    })

    it('Admin should not retrieve all car sale ads without token', (done)=>{
        chai
        .request(app)
        .get('/api/v1/car')
        .set('Authorization', '')
        .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(401);
            expect(res.body.message).to.deep.equal('Access Denied.');
            done();

        })
    })

    it('Admin should not retrieve all car sale ads with wrong token signature', (done)=>{
        chai
        .request(app)
        .get('/api/v1/car')
        .set('Authorization', `Bearer ${adminToken + 'xxx'}` )
        .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(500);
            expect(res.body.error.message).to.deep.equal('invalid signature');
            done();

        })
    })


    it('Should update the status a car sale ad', (done)=>{
        chai
        .request(app)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${sellerToken}`)
        .send(validAdOne)
        .end((err,res) => {
            let car_id = 1;
            chai
                .request(app)
                .patch(`/api/v1/car/${car_id}`)
                .set('Authorization', `Bearer ${sellerToken}`)
                .send(validAdTwo)
                .end((err, res) => {
                    expect(res.body).to.be.an('object'); 
                    expect(res.body.status).to.be.equal(200); 
                    expect(res.body.data).to.be.an('object'); 
                    expect(res.body.message).to.deep.equal('The Ad\'s  successfully updated!')
                    done();
                })

        })
    });

    it('Should delete a specific  car sale ad', (done)=>{
        chai
        .request(app)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${sellerToken}`)
        .send(validAdOne)
        .end(() => {
           
            let car_id = 1;
            chai
        .request(app)
        .delete(`/api/v1/car/${car_id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validAdTwo)
        .end((err, res) => {
           expect(res.body).to.be.an('object'); 
           expect(res.body.status).to.be.equal(200);  
           expect(res.body.data).to.deep.equal(`Car sale ad number ${car_id} successfully deleted!`);
        done();
        })

        })
    });
})
