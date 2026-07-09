import { Hono } from "hono";

import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "./generated/prisma/client";
import { sign, verify } from "hono/jwt";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// app.post("/api/v1/blog/*", async (c, next) => {
//   // get the header
//   // verify the header
//   // header correct, then proceed
//   // if not then 403 code

//   const header = c.req.header("Authorization") || "";
//   const token = header.split(" ")[1];

//   // @ts-ignore
//   const response = await verify(token, c.env.JWT_SECRET);
//   if (response.id) {
//     next();
//   } else {
//     c.status(403);
//     return c.json({ error: "unauthorized" });
//   }
// });

app.use("/api/v1/blog/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";
  const token = header.split(" ")[1];

  if (!token) {
    return c.json({ error: "unauthorized" }, 403);
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET, "HS256");
    await next();
  } catch (err) {
    return c.json({ error: "unauthorized" }, 403);
  }
});

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

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

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

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

app.post("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

app.put("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("Hello Hono!");
});
export default app;
