import express from "express"
import userRoute from "./route/user.route.js"
import { connectDb } from "./utils/connectionDb.js"
import cookieParser from "cookie-parser"

const app = express()

await connectDb()

app.use(express.json());//to parse json data in req.body
app.use(express.urlencoded({extended: false})); // to parse from data in the req body
app.use(cookieParser())


app.use("/api/auth",userRoute)

app.get("/",(req,res)=>{
    res.send("hello");
})

app.listen(3000,()=>[
    console.log("server started on http://localhost:3000"),
])