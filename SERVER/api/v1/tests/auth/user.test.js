import chai, {
    expect
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../server';
import dummyAuth from '../dummyData/dummyAuth';

const {
    validSignUp,
    invalidSignUp, 
    validLogin, 
    invalidLogin
} = dummyAuth

chai.use(chaiHttp);


describe('User Authentication:', () => {
    describe('Home Page', () => {
        it('Should display "Welcome to AutoMart"', (done) => {

            chai
                .request(app)
                .get('/')
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.status).to.be.equal(200);
                    expect(res.body.message).to.deep.equal('Welcome to AutoMart!');
                    done();
                })
        });

        it('Should warn a user when the url path is wrong', (done) => {
            chai
                .request(app)
                .get('/fxd/hy')
                .end((err, res) => {
                    expect(res.body.status).to.be.eql(400);
                    expect(res.body.message).to.be.eql('Wrong Url or HTTP Request!');
                    done();
                });
        })
    });

    it('Should sign up a new user', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send(validSignUp)
            .end((err, res) => {
                // console.log('Sign up',res.body);
                expect(res.body.status).to.be.eql(201);
                expect(res.body).to.be.an('object'); 
                expect(res.body.data).to.be.an('object'); 
                expect(res.body.message).to.deep.equal('Successfully Signed Up!');
                done();
            });
    })

    it('Should not sign up a new user',  (done) => {
         chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send(invalidSignUp)
            .catch(err => err.message)
            .then(res => {
                expect(res.status).to.be.equal(400);
            })
            done();

    });

    it('Should log in the existing user', (done)=>{
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(validLogin)
            .end((err, res) => {
                // console.log('log in:', res.body);
                expect(res.body.status).to.be.eql(200);
                expect(res.body).to.be.an('object'); 
                expect(res.body.data).to.be.an('array'); 
                expect(res.body.message).to.deep.equal('Successfully Signed In!');
                done();
            });
    })
    it('Should not log in the existing user', (done)=>{
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(invalidLogin)
            .end((err, res) => {
                // console.log('Don\'t log in', res.body);
                expect(res.body.status).to.be.eql(401);
                expect(res.body).to.be.an('object'); 
                expect(res.body.error).to.deep.equal('Invalid Password');
                done();
            });
    })
})