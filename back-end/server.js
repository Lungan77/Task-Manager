import Express from 'express';
import Dotenv from 'dotenv';
import ConnectDb from './config/connectionDb.js';
import route from './routes/task.js';
import Userroute from './routes/user.js';
import cors from 'cors';


const PORT = process.env.PORT || 5000;
Dotenv.config();

const app = Express();
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
)

app.use(Express.json());
app.use(Express.urlencoded({extended: false}));

ConnectDb();
app.use('/tasks', route);
app.use('/users', Userroute);
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));