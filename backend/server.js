import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import productRoutes from './routes/product.route.js'
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}))



if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
}

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(`/api/products`, productRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server Started at", PORT);
    });
}).catch(err => {
    console.error('Failed to connect to the database', err);
    process.exit(1);
})
