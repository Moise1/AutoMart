export default {
    validSignUp: {
        first_name: 'germaine', 
        last_name: 'mugeni', 
        email: 'germaine@gmail.com', 
        password: 'maine123',
        address: 'kigali'

    }, 
    invalidSignUp: {
        first_name: 'germaine', 
        last_name: 'mugeni', 
        email: 'germaine@gmail.com', 
        password: 'maine123',
        address: 'kigali',
        is_buyer: 'false', 
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
    },
    tokenizedSeller: {
        id: 2, 
        email: 'germaine@gmail.com',
        is_admin: false, 
    }, 
    tokenizedBuyer: {
        id: 3, 
        email: 'olivier@gmail.com',
        is_admin: false, 
    }
}