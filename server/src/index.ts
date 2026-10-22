import "dotenv/config";
import express from 'express';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
import { registerRoutes } from "./router";
import { errorHandler } from "./middleware/error-handler.middleware";
const app = express();
const clientUrl = process.env.CLIENT_URL ?? "http://localhost:3000";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client"
import {functions} from './inngest/index'
app.use(
    cors({
        origin: clientUrl,
        credentials: true,
    }),
);
app.all('/api/auth/{*any}', toNodeHandler(auth));

const PORT = process.env.PORT;
app.get("/" , (req , res)=>{
    res.send("Hello LLM");
})

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

registerRoutes(app);

app.use(errorHandler)
app.listen(PORT , ()=>{
    console.log(`App is Live at localhost:${PORT}`)
})