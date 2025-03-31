import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import {dbConnect} from './config/db.js'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors'
import path from 'path'
import UserRouter from './routes/userRoute.js'
import ProjectRouter from './routes/project.route.js'
import TasksRouter from './routes/task.route.js'
import ActivityRouter from './routes/activity.route.js'

const PORT = process.env.PORT || 3000
const __dirname = path.resolve()

dbConnect()

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.json())

// Routes
app.use('/api/users', UserRouter)
app.use('/api/projects', ProjectRouter)
app.use('/api/tasks', TasksRouter)
app.use('/api/activities', ActivityRouter)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../client/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
    })
}


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)  // Server is running on port 3000
})