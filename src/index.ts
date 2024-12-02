import express from 'express';
import http from "http";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressRateLimit from 'express-rate-limit';
import  { dbConnect ,dbDisconnect} from './DBConfig/db.config';
import session from 'express-session';
import dotenv from 'dotenv';
import Server  from 'socket.io';
import userRouter from './routes/user.route';
import ideaRouter from './routes/idea.route';
import prototypeRouter from './routes/prototype.route';
import evalRouter from './routes/evaluation.route';
import { swaggerUi,swaggerDocs } from './swagger';


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server.Server(server, { cors: { origin: "*" } });
dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false
}));

app.use(expressRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.send('Server is running');
});
app.use('/api/users', userRouter);
app.use('/api/ideas', ideaRouter);
app.use('/api/prototypes', prototypeRouter);
app.use('/api/evaluations', evalRouter);


const serverListen = server.listen(process.env.PORT ||3000, () => {
    console.log('Server is running on port 3000');
});

export { io }
export default serverListen;