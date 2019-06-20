// import chai, {
//     expect
// } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../../../../server';
// import dummyFlag from '../dummyData/dummyFlag';
// import dummyAuth from '../dummyData/dummyAuth';
// import tokenMan from '../../helpers/tokenMan';


// const {
//     tokenizedBuyer,
// } = dummyAuth;

// const {
//     validFlag
// } = dummyFlag;

// const user = tokenMan.tokenizer(tokenizedBuyer);

// chai.use(chaiHttp);

// describe('Testing Fraud Flagging', () => {

//     it('Should create a new fraud reporting flag: ', (done) => {

//         chai
//             .request(app)
//             .post('/api/v1/flag')
//             .set('Authorization', `Bearer ${user}`)
//             .send(validFlag)
//             .end((err, res) => {
//                 expect(res.body).to.be.an('object');
//                 expect(res.body.status).to.be.equal(201);
//                 expect(res.body.data).to.be.an('object');
//                 expect(res.body.message).to.deep.equal('Fraud Report Created!');
//                 done();
//             })
//     });
// })
