import pool from './index';

pool.on('connect', () => {
   
  });
        
 const tables =`
            CREATE TABLE IF NOT EXISTS users(
             id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY, 
             first_name  VARCHAR(50) NOT NULL, 
             last_name  VARCHAR(50) NOT NULL, 
             email VARCHAR(250) NOT NULL, 
             address VARCHAR(50) NOT NULL, 
             password VARCHAR(250) NOT NULL, 
             is_admin BOOL NOT NULL);

             CREATE TABLE IF NOT EXISTS ads(
                car_id BIGSERIAL UNIQUE  NOT NULL PRIMARY KEY, 
                owner  INTEGER REFERENCES users(id) NOT NULL, 
                manufacturer  VARCHAR(50) NOT NULL, 
                body_type VARCHAR(50) NOT NULL, 
                model VARCHAR(50) NOT NULL, 
                state VARCHAR(50) NOT NULL, 
                status VARCHAR(50), 
                price FLOAT NOT NULL, 
                created_on DATE NOT NULL, 
                modified_on DATE);
            
                CREATE TABLE IF NOT EXISTS orders(
                    order_id BIGSERIAL  UNIQUE  NOT NULL, 
                    buyer  INTEGER REFERENCES users(id) NOT NULL, 
                    car_id BIGINT REFERENCES ads(car_id),
                    price_offered FLOAT NOT NULL,
                    new_price_offered FLOAT, 
                    status VARCHAR(50),
                    created_on DATE NOT NULL, 
                    modified_on DATE);`;

    pool.query(tables)
            .then((res) => {

            })
            .catch((err) => {
                console.log(err);
            });


module.exports= pool;