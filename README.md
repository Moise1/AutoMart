[![Coverage Status](https://coveralls.io/repos/github/Moise1/AutoMart/badge.svg?branch=develop)](https://coveralls.io/github/Moise1/AutoMart?branch=develop)
[![Build Status](https://travis-ci.com/Moise1/AutoMart.svg?branch=develop)](https://travis-ci.com/Moise1/AutoMart)
[![Maintainability](https://api.codeclimate.com/v1/badges/f127564517d3a59e3b7c/maintainability)](https://codeclimate.com/github/Moise1/AutoMart/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f127564517d3a59e3b7c/test_coverage)](https://codeclimate.com/github/Moise1/AutoMart/test_coverage)
# AutoMart 

## Get Started 

[AutoMart](https://moise1.github.io/AutoMart/UI/)  is an online marketplace for automobiles of diverse makes, model or body type.

Access AutoMart's API from [Heroku](https://moise-automart.herokuapp.com/).

###  Required features for user: 

* User(buyer or seller)  can sign up .<br/>
* User(buyer or seller) can sign in.<br/>
* User(seller) can create a car sale ad<br/>
* User(seller) can get a single car sale ad<br/>
* User(seller) can edit the price/status of  a single car sale ad<br/>
* User(buyer) can make a car purchase order<br/>
* User(buyer) can update a the price of a purchase order<br/>


###  Required features for admin: 

* Admin  can view all available or sold cars<br/>
* Admin  can delete a specific car sale ad<br/>



### Prerequisites 
You must have the following tools installed in order to run this project: <br/>

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git): A distributed version control tool 
* [NodeJS](https://nodejs.org/en/): A  JavaScript runtime environment<br/>
* [Express](https://expressjs.com/): A web application framework for NodeJS <br/>
* [ESLint](https://eslint.org/): A JavaScript linting library <br/>
* [Airbnb](https://github.com/airbnb/javascript): A populr style guide<br/>
* [Mocha](https://mochajs.org/) or [Jasmine](https://jasmine.github.io/): Testing frameworks

### A glance at API-endpoints 

#### User authentication endpoints.


| HTTP Verb     | Endpoint      | Role | Authorized Entity  |
| ------------- | ------------- | ------ |          ----------- |
| POST  | /api/v1/auth/signup  |    User sign up             | User
| POST  | /api/v1/auth/signin  |  User login             | User


#### Seller's  activities endpoints

| HTTP Verb     | Endpoint      | Role | Authorized Entity  |
| ------------- | ------------- | ------ |          ----------- |
| POST  | /api/v1/car  |    seller post a car sale ad             | User(seller)
| GET  | /api/v1/car/car_id  |  seller get a specific car sale ad           | User(seller)
| PATCH  | /api/v1/car/:car_id/price  |  seller update the price a specific car sale ad           | User(seller)
| GET  | /api/v1/car/:car_id/status  |  seller update the status a specific car sale ad           | User(seller)


### Buyer's  activities endpoints.


| HTTP Verb     | Endpoint      | Role | Authorized Entity  |
| ------------- | ------------- | ------ |          ----------- |
| POST  | /api/v1/order  |    Buyer makes a purchase order             | User(buyer)
| PATCH  | /api/v1/:order_id/price |  Buyer update the price of a purchase order            | User(buyer)


#### Admin's  activities endpoints 

| HTTP Verb     | Endpoint      | Role | Authorized Entity  |
| ------------- | ------------- | ------ |          ----------- |
| GET   | /api/v1/car |   View a list of all available and sold cars | Admin
| DELETE   | /api/v1/car/:car_id |  Delete a single car sale ad|Admin 


To get the code in this repo and customize it to suit your needs, do the following:<br/> 

```
git clone https://github.com/Moise1/AutoMart.git
cd AutoMart
npm install

```
### Important scripts 

Start developer server 

`npm start`

Run tests 

`npm test`

### Author 

[Moise1](https://github.com/Moise1)
