import { Hono } from "hono";

import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../generated/prisma/client";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@czar16/common";
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        message: "Inputs not correct",
      });
    }
    // TODO: hash password
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt: token });
  } catch (err) {
    return c.json({ error: "signup failed" }, 500);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        message: "Inputs not correct",
      });
    }
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user || user.password !== body.password) {
      return c.json({ error: "Invalid credentials" }, 403);
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (err) {
    return c.json({ error: "signin failed" }, 500);
  }
});
