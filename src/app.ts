import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import otprouter from './routes/otp.routes';
import smsRouter from './routes/sms.routes';
import userRouter from './routes/user.routes';
import productsRouter from './routes/products.routes';
import ordersRouter from './routes/order.routes';
import cartRouter from './routes/cart.routes';
import swaggerDocument from '../swagger/swagger.json';
import swaggerUi from 'swagger-ui-express';
import swaggerJSdoc from 'swagger-jsdoc';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user/sms', smsRouter);
app.use('/user/otp', otprouter);
app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/cart', cartRouter);



app.use ('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT}`);
});