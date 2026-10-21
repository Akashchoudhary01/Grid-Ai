import "dotenv/config";
import express from 'express';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
const app = express();

app.all('/api/auth/{*any}', toNodeHandler(auth));

const PORT = process.env.PORT;
app.get("/" , (req , res)=>{
    res.send("Hello LLM");
})
app.listen(PORT , ()=>{
    console.log(`App is Live at localhost:${PORT}`)
})