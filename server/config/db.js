import mongoose from 'mongoose';

const connection = {isConnected: null}

export const dbConnect  = async() => {
    try {
        if(connection.isConnected) {
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Couldn't connect to Mongodb database:", error);
    }
}