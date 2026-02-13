import { Hono } from "hono";
import { cors } from "hono/cors";
import { getEnv } from "./config/environment";

const env = getEnv();

const app = new Hono();

app.use(
  "*",
  cors({
    origin: env.cors.origin,
    allowHeaders: env.cors.allowHeaders ?? undefined,
    allowMethods: env.cors.allowMethods ?? undefined,
    exposeHeaders: env.cors.exposeHeaders ?? undefined,
    maxAge: env.cors.maxAge ?? undefined,
    credentials: env.cors.credentials ?? undefined,
  }),
);

app.onError((err, c) => {
  return c.text(`${err}`, 500);
});

app.get("/", (c) => {
  return c.json({ msg: "Hello Hono!" });
});

export default app;
