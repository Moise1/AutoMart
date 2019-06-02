import chai, {
    expect
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../server';
import dummyOrder from '../dummyData/dummyOrder';
import dummyAuth from '../dummyData/dummyAuth';
import tokenMan from '../../helpers/tokenMan';


const {
    tokenizedBuyer,
} = dummyAuth;

const {
    validOrder,
    updatedOrder
} = dummyOrder;

const buyerToken = tokenMan.tokenizer(tokenizedBuyer);

chai.use(chaiHttp);

describe('Testing Purchase Order', () => {

    it('Should make a new  purchase order: ', (done) => {

        chai
            .request(app)
            .post('/api/v1/order')
            .set('Authorization', `Bearer ${buyerToken}`)
            .send(validOrder)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.be.equal(201);
                expect(res.body.data).to.be.an('array');
                expect(res.body.message).to.deep.equal('Purchase Order Successfully Created!');
                done();
            })
    });

    it('User  update a purchase order with "pending status"', (done) => {
        chai
            .request(app)
            .post('/api/v1/order')
            .set('Authorization', `Bearer ${buyerToken}`)
            .send(validOrder)
            .end((err, res) => {
                let car_id = 2;
                chai
                    .request(app)
                    .patch(`/api/v1/order/${car_id}/price`)
                    .set('Authorization', `Bearer ${buyerToken}`)
                    .send(updatedOrder)
                    .end((err, res) => {
                        expect(res.body).to.be.an('object'); 
                        expect(res.body.status).to.be.equal(200); 
                        expect(res.body.data).to.be.an('array');
                        expect(res.body.message).to.deep.equal('Order\'s  Price Successfully Updated!');
                    })
                done();
            })

    })
})
