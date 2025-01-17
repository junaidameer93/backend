//require("dotenv").config({path: '/.env'});
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";

dotenv.config({path: '/.env'}); 

connectDB().then(() => {
    const app = express();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    }
    );
}).catch((error) => console.error(error));












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