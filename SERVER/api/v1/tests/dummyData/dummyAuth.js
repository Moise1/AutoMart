export default {
    validSignUp: {
        first_name: 'germaine', 
        last_name: 'mugeni', 
        email: 'germaine@gmail.com', 
        password: 'maine123',
        address: 'kigali',
        is_buyer: 'false', 
        is_seller: 'true'

    }, 
    invalidSignUp: {
        first_name: 'germaine', 
        last_name: 'mugeni', 
        email: 'germaine@gmail.com', 
        password: 'maine123',
        address: 'kigali',
        is_buyer: 'false', 
    }, 
    validSignUpTwo: {

    },
    validLogin: {
        email: 'germaine@gmail.com', 
        password: 'maine123'
    }, 
    invalidLogin: {
        email: 'germaine@gmail.com', 
        password:'mane123'
    }, 
    tokenizedAdmin: {
        id: 1, 
        email: 'john@gmail.com', 
        is_admin: true,
        is_buyer: false, 
        is_seller: false
    },
    tokenizedSeller: {
        id: 2, 
        email: 'germaine@gmail.com',
        is_admin: false, 
        is_buyer: false, 
        is_seller: true
    }, 
    tokenizedBuyer: {
        id: 3, 
        email: 'olivier@gmail.com',
        is_admin: false, 
        is_buyer: true, 
        is_seller: true
    }
}