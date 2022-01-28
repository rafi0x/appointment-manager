import * as dotenv from "dotenv";
import express from 'express';
import mongoose from 'mongoose'
dotenv.config();

import commonMiddleware from './middlewares/common'
import routers from './routes/index.routes'

const app: express.Application = express();

commonMiddleware(app);

app.use('/api', routers);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/appointment')
    .then(() => {
        console.log("Database connected");
        // main web server
        app.listen(process.env.PORT || '8083', () => console.log(`server on ${process.env.PORT || '8083'}`))
    })
    .catch((err) => console.log(err));


