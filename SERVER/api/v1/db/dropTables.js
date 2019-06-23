import pool from "./index";

pool.on("connect", () => {
    // console.log('Now Our Auto-Mart app is connected to the Database successfully!')
  });

        const removeTables = 
        "DROP TABLE IF EXISTS users, ads, orders CASCADE;";

         pool.query(removeTables)
         .then((res) => {

         })
         .catch((err) => {
             console.log(err);
         });


export default pool;