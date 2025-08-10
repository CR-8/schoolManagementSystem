import mysql2 from "mysql2" 
import express from "express"
import dotenv from "dotenv"
import schoolRoutes from "./routes/schools.js"

dotenv.config();

const app = express();

app.use(express.json());

const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
    if(err){
        console.error("Error Connecting to Database : ",err);
        process.exit(1);
    }
    else {
        console.log("Connection to Database Successfull .")
    }
})

app.use("/schools", schoolRoutes);

app.use("/health", (req,res) => {
    res.json({
        status : "OK" ,
        timestamp: new Date().toISOString(),
        database: "Connected"
    });
});

app.use("/" , (req , res) => {
    res.json({ message: "Welcome to the School Management API" });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


export {db};