import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import { Context } from '../../root';
import { signTokens, verifyJWT } from '../../../utils/jwt';
import { redisClient } from "../../redisServer";

import { Prisma, Users } from "@prisma/client"
import { prisma } from '../../prisma';
import { refresh_token_secret } from '../../../config/default';

export const createUserHandler = async ({ email, password, firstName, lastName }: { email: string, password: string, firstName: string, lastName: string }) => {
  const user = await findUser({ email })
  if (user === null) {
    const newUser = await createUser({
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 10),
      firstName: firstName,
      lastName: firstName,
      avatar: "",
    });
    return newUser;
  } else throw new Error("User already exists");
}

export const createUser = async (input: Prisma.UsersCreateInput) => {
  return (await prisma.users.create({
    data: input,
  }) as Users)
}

export const findUser = async (
  where: Partial<Prisma.UsersWhereInput>,
  select?: Prisma.UsersSelect) => {
  return select ? await prisma.users.findFirst({ where, select }) as Users : await prisma.users.findFirst({ where }) as Users;
}

export const registerHandler = async ({
  input,
  ctx
}: {
  input: Prisma.UsersCreateInput,
  ctx: Context
}) => {
  try {
    const hashedPassword = await bcrypt.hash(input.password, 12);
    const user = await createUser({
      email: input.email.toLowerCase(),
      password: hashedPassword,
      firstName: input.firstName,
      lastName: input.lastName,
    });

    const { accessToken, refreshToken } = signTokens({ id: user.id, role: 'user' });

    try {
      ctx.res.cookie('access_token', accessToken, { httpOnly: true });
      ctx.res.cookie('refresh_token', refreshToken, { httpOnly: true });
      ctx.res.cookie('logged_in', true);

      redisClient.sAdd(user.id, refreshToken);
    } catch {
      (err: any) => {
        console.log(err);
      }
    }

    return {
      status: 'success',
      accessToken,
      id: user.id
    };
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Email already exists',
        });
      }
    }
    throw err;
  }
};

export const loginHandler = async ({ input, ctx, }: { input: { email: string, password: string }, ctx: Context }) => {
  try {
    const user = await findUser({ email: input.email }, { id: true, password: true, role: true });
    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password',
      });
    }
    const { accessToken, refreshToken } = signTokens({ id: user.id, role: user.role });

    ctx.res.cookie('access_token', accessToken, { httpOnly: true });
    ctx.res.cookie('refresh_token', refreshToken, { httpOnly: true });
    ctx.res.cookie('logged_in', true);
    if (user.role === 'admin') ctx.res.cookie('admin', true);

    redisClient.sAdd(user.id, refreshToken);

    return {
      status: 'success',
      accessToken,
 
    };
  } catch (err: any) {
    throw err;
  }
};

export const logoutHandler = async ({ ctx }: { ctx: Context }) => {
  const { payload, err, expired } = verifyJWT(ctx.req.cookies.refresh_token, refresh_token_secret);
  if (payload) {
    await redisClient.sRem(payload.id, ctx.req.cookies.refresh_token);
    ctx.res.cookie('access_token', '', { httpOnly: true, maxAge: -1 });
    ctx.res.cookie('refresh_token', '', { HttpOnly: true, maxAge: -1 });
    ctx.res.cookie('logged_in', '', { maxAge: -1, });
    ctx.res.cookie('admin', '', { maxAge: -1, });
  }
  return {
    status: 'success'
  }
};