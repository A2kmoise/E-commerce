import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';
import productsRouter from './routes/products.routes';
import ordersRouter from './routes/order.routes';
import cartRouter from './routes/cart.routes';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/cart', cartRouter);


app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT}`);
});