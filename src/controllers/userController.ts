import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(userData: any) {
  try {
    const user = await prisma.user.create({ data: userData });
    return user;
  } catch (err) {
    console.log(err);
  }
}

export async function editUser(userId: number, userData: any) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      }
    });
    // console.log('inside userId', userId);
    // if (!existingUser) {
    //   throw new Error('User not found');
    // }

    // if (userData.username && userData.username === existingUser.username) {
    //   throw new Error('Username conflict');
    // } 

    // if (userData.email && userData.email === existingUser.email) {
    //   throw new Error('email conflict');
    // } 

    // else {const user = await prisma.user.update({
    //     where: {
    //       id: userId,
    //     },
    //     data: userData
    //   });
    //   return user;
    // }
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: userData
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserByEmail(email: string) {
  
  try {
    const user = await prisma.user.findUnique({where: { email }});
    console.log(user, 'this is user');
  return user;
  } catch (error) {
    console.log(error);
  }
}

// export async function getAll() {
//   try {
//     const users = await prisma.user.findMany();
//     return users;
//   } catch (err) {
//     console.log(err);
//   }
// }