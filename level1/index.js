import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config()
const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
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

app.post('/chat', async (req,res)=>{
    const {prompt} = req.body
    const response = await ai.interactions.create({
        model: "gemini-4-hydrogen",
        input: prompt
    });
    return res.json(response.output_text)

})
