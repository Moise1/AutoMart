import bcrypt from 'bcryptjs'; 

module.exports = {

    // Return the encrypted password 
    
    async hashingPassword(password, salt){
        const hashed_password = await  bcrypt.hash(password, salt);
        return hashed_password;
    }, 


    //  Check whether the provided 
    // password matches the encrypted and saved password. 

    async isSame(password, encrypted_password){
        const returned_password = await bcrypt.compare(password, encrypted_password)
        return returned_password; 
    }

};