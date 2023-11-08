import { PrismaClient } from '@prisma/client';
const userRouter = require('express').Router();
const prisma = new PrismaClient();
import { Request, Response } from 'express';
import * as Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
});

userRouter.post('/new', async (req: Request, res: Response) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'ValidationError',
        data: null,
        success: false,
        message: error.details[0].message,
      });
    }
    const { email, username, firstName, lastName, password } = req.body;

    // Check if the username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      // If the username is already taken, return a 409 status code
      return res.status(409).json({
        error: 'UsernameAlreadyTaken',
        data: null,
        success: false,
      });
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return res.status(409).json({
        error: 'EmailAlreadyTaken',
        data: null,
        success: false,
      });
    }
  
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        firstName,
        lastName,
        password, 
      },
    });

    res.status(200).json({
      error: undefined,
      data: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      success: true,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

userRouter.post('/edit/:userId', async(req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const { email, username, firstName, lastName, password } = req.body;
    console.log('user', userId);
    // Find the user by userId
    const existingUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!existingUser) {
      return res.status(404).json({
        error: 'UserNotFound',
        data: null,
        success: false,
        message: 'User not found',
      });
    }

    // Check if at least one field to update is provided
    if (!email && !username && !firstName && !lastName && !password) {
      return res.status(400).json({
        error: 'ValidationError',
        data: null,
        success: false,
        message: 'At least one field to update should be provided',
      });
    }

    if (username) {
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUsername) {
        // If the username is already taken, return a 409 status code
        return res.status(409).json({
          error: 'UsernameAlreadyTaken',
          data: null,
          success: false,
        });
      }
    }
      
    if(email) {
        const existingEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingEmail) {
        return res.status(409).json({
          error: 'EmailAlreadyTaken',
          data: null,
          success: false,
        });
      }
    } 

    // Update the user's information
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        username,
        firstName,
        lastName,
        password,
      },
    });

    res.status(200).json({
      error: undefined,
      data: updatedUser,
      success: true,
    });
  } catch (error) {
    
      console.log(error);
  }
});

userRouter.get('/', async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;

    if (email) {
      // If an email is provided, find the user by email
      const user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      // If no email is provided, fetch all users
      const users = await prisma.user.findMany();
      res.json(users);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

module.exports = userRouter;