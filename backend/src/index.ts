import { Hono } from "hono";

import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "./generated/prisma/client";
import { sign, verify } from "hono/jwt";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.route("api/v1/user", userRouter);
app.route("api/v1/blog", blogRouter);

export default app;
