import pool from "./index";

pool.on("connect", () => {
    // console.log('Tables dropped!')
  });

        const removeTables = 
        "DROP TABLE IF EXISTS users, ads, orders, flags CASCADE;";

         pool.query(removeTables)
         .then((res) => {

         })
         .catch((err) => {
             console.log(err);
         });


export default pool;