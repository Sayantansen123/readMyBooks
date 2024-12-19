import express from "express"
import userRoute from "./route/user.route.js"
import { connectDb } from "./utils/connectionDb.js"

const app = express()

await connectDb()

app.use("/api/auth",userRoute)

app.get("/",(req,res)=>{
    res.send("hello");
})

app.listen(3000,()=>[
    console.log("server started on http://localhost:3000"),
])