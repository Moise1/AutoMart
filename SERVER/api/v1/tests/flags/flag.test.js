import chai, {
    expect
} from "chai";
import chaiHttp from "chai-http";
import app from "../../../../server";
import dummyFlag from "../dummyData/dummyFlag";
import dummyAuth from "../dummyData/dummyAuth";
import tokenMan from "../../helpers/tokenMan";

chai.use(chaiHttp);

const {
    validFlagOne, 
    validFlagTwo
} = dummyFlag;
const {
    tokenizedSeller,
    validLogin
} = dummyAuth;

const userToken = tokenMan.tokenizer(tokenizedSeller);



describe('Fraud Report Tests', () => {

    it('Should not create a new fraud report without user token', (done) => {

        chai
            .request(app)
            .post('/api/v1/flag')
            .set('Authorization', `Bearer `)
            .send(validFlagOne)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.be.equal(401);
                expect(res.body.message).to.deep.equal('Access Denied.');
                done();
            })
    });

    it('Should not create a new fraud report with an invalid user token', (done) => {

        chai
            .request(app)
            .post('/api/v1/flag')
            .set('Authorization', `Bearer ${userToken + 'xxx'}`)
            .send(validFlagOne)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.be.equal(500);
                expect(res.body.error.message).to.deep.equal('invalid signature');
                done();
            })
    });

    it('Should create a new fraud report', (done) => {

        chai
            .request(app)
            .post('/api/v1/flag')
            .set('Authorization', `Bearer ${userToken}`)
            .send(validFlagOne)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.be.equal(201);
                expect(res.body.data).to.be.an('object');
                expect(res.body.message).to.deep.equal('Fraud Report Created!');
                done();
            })
    });

    it('Should not flag a non-existent car', (done) => {

        chai
            .request(app)
            .post('/api/v1/flag')
            .set('Authorization', `Bearer ${userToken}`)
            .send(validFlagTwo)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.be.equal(404);
                expect(res.body.error).to.deep.equal(`Sorry, car number ${validFlagTwo.car_id} not found!`);
                done();
            })
    }); 

    
})