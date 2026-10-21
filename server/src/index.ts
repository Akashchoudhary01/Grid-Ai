import "dotenv/config";
import express from 'express';
const app = express();

const PORT = process.env.PORT;
app.get("/" , (req , res)=>{
    res.send("Hello LLM");
})
app.listen(PORT , ()=>{
    console.log(`App is Live at localhost:${PORT}`)
})