import { Server } from 'http'
import app from './app';
import mongoose from 'mongoose';
const dotenv = require('dotenv').config()

let server: Server;
const PORT = 5000;

async function main() {
    try {
        await mongoose.connect(`${process.env.DB_URI}`);
        console.log('connected to the mongodb server');
        server = app.listen(PORT, () => {
            console.log(`app is listening at post ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
};

main();