import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config()
// const ai = new GoogleGenAI({
//     apiKey:process.env.GEMINI_API_KEY
// });

import { ChatGoogle } from "@langchain/google";

const llm = new ChatGoogle({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-4-hydrogen",
  temperature: 0.7,
  maxOutputTokens: 700,
});


const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log("server started at port :",port);
});

// const stream = await ai.interactions.create({
//   model: "gemini-4-hydrogen",
//   input: "hello",
//   stream: true,
// });

// for await (const event of stream) {
//   console.log(event);
// }
// sdk
// app.post('/chat', async (req,res)=>{
//     const {prompt} = req.body
//     const response = await ai.interactions.create({
//         model: "gemini-4-hydrogen",
//         input: prompt
//     });
//     return res.json(response.output_text)

// })

// langChain

app.post('/chat', async (req,res)=>{
    const {prompt} = req.body
    const response = await llm.invoke([
        {
            role: "system",
            content: "you are jarvis and my assistent"
        },
        {
            role: "human",
            content: prompt
        }
    ])
    return res.json(response.content)

});
