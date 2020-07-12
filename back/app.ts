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

if (prod) {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'));
    app.use(cors({
        origin: ['http://kihat.cf'],
        credentials: true,
    }));
}
else {
    app.use(morgan('dev'));
    app.use(cors({
        origin: true,
        credentials: true,
    }));
}
app.use(express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: process.env.NODE_ENV === 'production' && '.kihat.cf',
    },
    secret: process.env.COOKIE_SECRET!,
    name: 'v)g*3',
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/bcategory', bcategoryAPIRouter);
app.use('/api/scategory', scategoryAPIRouter);

app.listen(80, () => {
    console.log(`Server is running on port 80`);
});