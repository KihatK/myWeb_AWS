import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';

import { sequelize } from './models';
import passportConfig from './passport';
import userAPIRouter from './routes/user';
import postsAPIRouter from './routes/posts';
import postAPIRouter from './routes/post';
import bcategoryAPIRouter from './routes/bcategory';
import scategoryAPIRouter from './routes/scategory';

const prod = process.env.NODE_ENV === 'production';
dotenv.config();
const app = express();
sequelize.sync()
    .then(() => {
        console.log('database connecting success');
    })
    .catch((e: Error) => {
        console.error(e);
    });
passportConfig();

let sessionMiddleWare = session({
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        httpOnly: true,
        secure: true,
        domain: process.env.NODE_ENV === 'production' && '.kihat.cf',
    },
    secret: process.env.COOKIE_SECRET!,
    name: 'v)g*3',
})

if (prod) {
    app.set('trust proxy', 1);
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'));
    app.use(cors({
        origin: ['https://kihat.cf'],
        credentials: true,
    }));
}
else {
    app.use(morgan('dev'));
    app.use(cors({
        origin: true,
        credentials: true,
    }));
    sessionMiddleWare = session({
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
        },
        secret: process.env.COOKIE_SECRET!,
        name: 'v)g*3',
    });
}
app.use(express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleWare);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/bcategory', bcategoryAPIRouter);
app.use('/api/scategory', scategoryAPIRouter);

app.listen(3065, () => {
    console.log(`Server is running on port 80`);
});