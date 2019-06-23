import express from "express";  
import userRouter from "./api/v1/routes/userRouter";
import adRouter from "./api/v1/routes/adRouter";
import orderRouter from "./api/v1/routes/orderRouter";
import flagRouter from "./api/v1/routes/flagRouter"; 


const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(userRouter);
app.use(adRouter);
app.use(orderRouter);
//app.use(flagRouter);





app.get("/", (req, res) =>{
    return res.status(200).json({
        status: 200,
        message: "Welcome to AutoMart!"
    });
});


app.use("*", (req, res) =>{
    return res.status(405).json({
        status: 405,
        message: "Method Not Allowed!"
    });
});


const port = process.env.PORT || 3000; 
app.listen(port);

export default app;