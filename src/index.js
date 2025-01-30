//require("dotenv").config({path: '/.env'});
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({
    path: './.env'
})

// stop the server running on port 8000
//sudo lsof -i :8000
//sudo kill -9 <PID>


connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})












// import express from "express";

// const app = express();

// (async()=>{
//     try {
//         const db = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.error("error",error);
//             throw error
//         });
//         app.listen(process.env.PORT , () => console.log(`Server is running on port ${process.env.PORT}`));    
        
//     } catch (error) {
//         console.error(error);
//     }
// })()