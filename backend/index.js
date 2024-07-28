// import express from "express";
// import { createServer } from "node:http";

// import { fileURLToPath } from "node:url";
// import { dirname ,join } from "node:path";

// import { Server } from "socket.io";



// const app = express()
// const server = createServer(app)
// const io = new Server(server)

// const __dirname = dirname(fileURLToPath(import.meta.url));

// app.get('/',(req,res)=>{
//     res.sendFile(join(__dirname,'/public/index.html'))
// })

// io.on('connection',(socket)=>{
//     console.log("A user is connected");

//     socket.on('Chat-message',(msg)=>{
//         io.emit("Chat-message" , msg);
//     })
// })

// server.listen(3000,()=>{
//     console.log("server running on port 3000");
// }) 
//

import express from 'express'
import cors from 'cors'
import axios from 'axios';

const app = express()
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try{
    const r = await axios.put(
        "https://api.chatengine.io/users/",
        {"username" : username , "secret" : username , "first_name": username},
        {headers : {"private-key" : "9ce24d4c-47ae-4557-86b2-df200b7f8d11"}}
    )
    return res.status(r.status).json(r.data);
  }
  catch(e){
    return res.status(e.response.status).json(e.response.data);

  }
  return res.json({ username: username, secret: "sha256..." });
});

app.listen(3000,()=>{
    console.log("server running");
})