import chai, {
    expect
} from "chai";
import chaiHttp from "chai-http";
import app from "../../../../server";
import dummyOrder from "../dummyData/dummyOrder";
import dummyAuth from "../dummyData/dummyAuth";
import tokenMan from "../../helpers/tokenMan";


const {
    tokenizedBuyer,
} = dummyAuth;

const {
    validOrder,
    updatedOrder,
    invalidOrder, 
    invalidOrderTwo, 
    invalidOrderThree
} = dummyOrder;

const buyerToken = tokenMan.tokenizer(tokenizedBuyer);

chai.use(chaiHttp);

describe("Testing Purchase Order", () => {

    it("Should make a new  purchase order:", (done) => {

        chai
            .request(app)
            .post("/api/v1/order")
            .set("Authorization", `Bearer ${buyerToken}`)
            .send(validOrder)
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                expect(res.body.status).to.be.equal(201);
                expect(res.body.data).to.be.an("object");
                expect(res.body.message).to.deep.equal("Purchase Order Successfully Created!");
                done();
            });
    });

    it("Should not make a new  purchase order with non-existent car id:", (done) => {

        chai
            .request(app)
            .post("/api/v1/order")
            .set("Authorization", `Bearer ${buyerToken}`)
            .send(invalidOrderTwo)
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                expect(res.body.status).to.be.equal(404);
                expect(res.body.error).to.deep.equal("Car number 20 not found!");
                done();
            });
    });

    it("Should not make a new  purchase order when wrong token is provided.", (done) => {

        chai
            .request(app)
            .post("/api/v1/order")
            .set("Authorization", `Bearer ${buyerToken + "xxx"}`)
            .send(validOrder)
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                expect(res.body.status).to.be.equal(500);
                expect(res.body.error.message).to.deep.equal("invalid signature");
                done();
            });
    });

    it("Should throw an error if there's no token provided: ", (done) => {

        chai
            .request(app)
            .post("/api/v1/order")
            .set("Authorization", "")
            .send(validOrder)
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                expect(res.body.status).to.deep.equal(401);
                expect(res.body.message).to.deep.equal("Access Denied.");
                done();
            });
    });


    it("Should not create an order with wrong inputs: ", (done) => {

        chai
            .request(app)
            .post("/api/v1/order")
            .set("Authorization", `Bearer ${buyerToken}`)
            .send(invalidOrder)
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                expect(res.body.status).to.be.equal(400);
                done();
            });
    });

    it("User  update a purchase order with \"pending status\"", (done) => {
        chai
            .request(app)
            .post("/api/v1/order")
            .set("Authorization", `Bearer ${buyerToken}`)
            .send(validOrder)
            .end((err, res) => {
                let order_id = 1;
                chai
                    .request(app)
                    .patch(`/api/v1/order/${order_id}/price`)
                    .set("Authorization", `Bearer ${buyerToken}`)
                    .send(updatedOrder)
                    .end((err, res) => {
                        expect(res.body).to.be.an("object");
                        expect(res.body.status).to.be.equal(200);
                        expect(res.body.data).to.be.an("object");
                        expect(res.body.message).to.deep.equal("Order's  Price Successfully Updated!");
                    });
                done();
            });

    }); 
});
