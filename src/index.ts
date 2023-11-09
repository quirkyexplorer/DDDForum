import express, {Request, Response} from 'express';
const userRouter = require('./controllers/users');
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);

const PORT = 3000;
let http = app.listen(PORT, () => {
  console.log(`Sever running in port ${PORT}`);
})

export { http }