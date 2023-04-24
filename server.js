import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import {DB} from './database-conection/DB.js'
import userRoutes from './routes/userRoutes.js'


const app = express();
dotenv.config();
//DB-Connection
 DB();

//middleware
app.use(cors({
    origin:['http://localhost:3000', "https://crud-mern-app.orender.com"]
}));
app.use(morgan("dev"));
app.use(express.json());

//router middlewere
app.use("/api", userRoutes)
const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})