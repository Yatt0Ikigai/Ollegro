import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import * as trpcExpress from "@trpc/server/adapters/express";
import appRouter from "./trpc/root";
import { createContext } from "./trpc/root";

dotenv.config();
const port = 8080;

const app = express();

app.use(cors({
  origin: [true, "http://localhost:3000"],
  credentials: true,
  methods: ['POST', "GET", "DELETE"]
}));


app.use(cookieParser(process.env.SECRET as string))
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
)


app.get("/", (req, res) => {
  res.send("Hello from api");
});

app.listen(port, () => {
  console.log(`✅ API listening at http://localhost:${port}`);
})





