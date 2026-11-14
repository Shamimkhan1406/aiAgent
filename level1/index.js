import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config()
const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});


const app = express();
const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log("server started at port :",port);
});

const stream = await ai.interactions.create({
  model: "gemini-4-hydrogen",
  input: "Explain how AI works",
  stream: true,
});

for await (const event of stream) {
  console.log(event);
}

