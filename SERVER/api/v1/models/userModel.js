import db from "../db/dbIndex";
import hasher from "../helpers/password";


class AppUser {

    async create(req){

        const  { first_name, last_name, email, address, password } = req;

        const encrypted_password = await hasher.hashingPassword(password, 10);

        const new_user = {
            first_name, 
            last_name, 
            email: email.toLowerCase(), 
            encrypted_password, 
            address: address,  
            is_admin: false,
        };


        const queryText = "INSERT INTO users(first_name, last_name, email, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING*";

        const values = [
            new_user.first_name,
            new_user.last_name,
            new_user.email,
            encrypted_password,
            new_user.address,
            new_user.is_admin,
        ];
        const queryResult = await db.query(queryText, values); 
        return queryResult;
    }


    async allUsers(){
        const queryText = "SELECT * FROM users"; 
        const queryResult = await db.query(queryText); 
        return queryResult; 

    } 

    async findMail(email){
        const queryText = "SELECT * FROM users WHERE email=$1";
        const mailResult = email.toLowerCase();
        const mailData = await db.query(queryText, [mailResult]);
        return mailData;
    }

    async findUser(id){
        const queryText = "SELECT * FROM users WHERE id=$1";
        const queryResult = await db.query(queryText, [id]);
        return queryResult; 
    }

    // Admin update user's admin status. 

    async updateUser(id, input) {
        const {
            rows
        } = await this.findUser(id);
        const is_admin = input.is_admin;

        const queryText = "UPDATE users SET is_admin=$1 WHERE id=$2 RETURNING *";
        const queryResult = await db.query(queryText, [is_admin, rows[0].id]);
        return queryResult;
    }

}


export default new AppUser;