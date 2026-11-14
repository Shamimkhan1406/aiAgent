import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { ChatGroq } from "@langchain/groq"
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

const llmGroq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    // other params...
})


const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server started at port :", port);
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

app.post('/chat/gemini', async (req, res) => {
    const { prompt } = req.body
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

app.post('/chat/groq', async (req, res) => {
    const { prompt } = req.body
    const aiMsg = await llmGroq.invoke([
        {
            role: "system",
            content: "You are a helpful assistant that translates English to Bengali. Translate the user sentence.",
        },
        { role: "user", content: prompt },
    ])
    return res.json(aiMsg.content)

});

