import express from 'express';  
import userRouter from './api/v1/routes/userRouter';
import adRouter from './api/v1/routes/adRouter';

const app = express();
 
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(userRouter);
app.use(adRouter);



app.get('/', (req, res) =>{
    return res.status(200).json({
        message: 'Welcome to AutoMart'
    });
});


app.use('*', (req, res) =>{
    return res.status(400).json({
        status: 400,
        message: 'Wrong Url or HTTP Request!'
    });
});


const port = process.env.PORT || 3000; 
app.listen(port);

export default app;