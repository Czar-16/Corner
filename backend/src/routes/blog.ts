import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../generated/prisma/client";
import { sign, verify } from "hono/jwt";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

type Variables = {
  userId: string;
};

export const blogRouter = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";
  const token = header.split(" ")[1];

  if (!token) {
    return c.json({ error: "unauthorized" }, 401);
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET, "HS256");
    c.set("userId", payload.id as string);
    await next();
  } catch (err) {
    return c.json({ error: "unauthorized" }, 401);
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const userId = c.get("userId");

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    return c.json({ id: blog.id }, 201);
  } catch (error) {
    return c.json({ error: "failed to create blog" }, 500);
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const userId = c.get("userId");

    const existing = await prisma.post.findUnique({
      where: { id: body.id },
    });

    if (!existing) {
      return c.json({ error: "blog not found" }, 404);
    }

    if (existing.authorId !== userId) {
      return c.json({ error: "forbidden" }, 403);
    }

    const blog = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ id: blog.id });
  } catch (error) {
    return c.json({ error: "failed to update blog" }, 500);
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany();
    return c.json({ blogs });
  } catch (error) {
    return c.json({ error: "failed to fetch blogs" }, 500);
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");
    const blog = await prisma.post.findFirst({
      where: { id },
    });

    if (!blog) {
      return c.json({ error: "blog not found" }, 404);
    }

    return c.json({ blog });
  } catch (error) {
    return c.json({ error: "failed to get the blog post" }, 500);
  }
});
