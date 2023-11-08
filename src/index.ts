import express, {Request, Response} from 'express';
import { createUser, getUserByEmail, editUser } from './controllers/userController';

import cors from 'cors';


const app = express();


app.use(express.json());
app.use(cors());

//create a new user 

app.post('/users/new', async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user'});
  }
});

// app.get('/users', async (req: Request, res: Response) => {
//   try {
//     const users = await getAll();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch users'});
//   }
// });

app.post('/users/edit/:userId', async(req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    // if (userId !== req.user.id) {
    //   res.status(403).json({ error: 'Unauthorized', data: undefined, success: false });
    //   return;
    // }

    const updatedUser = await editUser(userId, req.body);
    res.status(201).json(updatedUser);  
  } catch (error) {
    // if (typeof error === 'string') {
    //   if (error === 'User not found') {
    //     res.status(404).json({ error: 'User not found', data: undefined, success: false });
    //   } else if (error === 'Username conflict') {
    //     res.status(409).json({ error: 'UsernameAlreadyTaken', data: undefined, success: false });
    //   } else if (error === 'Username conflict') {
    //     res.status(409).json({ error: 'EmailAlreadyTaken', data: undefined, success: false });
    //   } 
    // }
    // else {
    //   console.log(error);
    //   res.status(500).json({ error: 'Failed to edit user', success: false });
    // }
      console.log(error);
  }
});

app.get('/users', async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    console.log('email', email);
    const user = await getUserByEmail(email);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sever running in port ${PORT}`);
})