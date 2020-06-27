import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';

import User from '../models/user';
import Post from '../models/post';
import { isLoggedIn } from './middlewares';

const router = express.Router();

router.post('/', async (req, res, next) => {  //회원가입
    try {
        const exUser = await User.findOne({ where: { userId: req.body.userId } });
        if (exUser) {
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const exNickname = await User.findOne({ where: { nickname: req.body.nickname } });
        if (exNickname) {
            return res.status(403).send('이미 사용중인 닉네임입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            userId: req.body.userId,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        return res.send('회원가입 완료');
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
});

router.post('/login', (req, res, next) => {  //로그인
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.message);
        }
        return req.login(user, async (loginErr) => {
            try {
                if (loginErr) {
                    return next(loginErr);
                }
                const fullUser = await User.findOne({
                    where: { id: user.id },
                    include: [{
                        model: Post,
                        as: 'BookMarked',
                        attributes: ['id', 'uuid', 'title', 'scategory', 'view', 'createdAt'],
                    }],
                    attributes: ['nickname', 'admin'],
                });
                return res.json(fullUser);
            }
            catch (e) {
                return next(e);
            }
        })
    })(req, res, next);
});
router.post('/logout', (req, res) => {  //로그아웃
    req.logout();
    if (req.session) {
        req.session.destroy((err) => {
            res.send('logout success');
        });
    }
    else {
        res.send('logout success');
    }
});

router.get('/login', async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).send('로그인 상태가 아닙니다.');
        }
        const user = await User.findOne({
            where: { id: req.user?.id },
            include: [{
                model: Post,
                as: 'BookMarked',
                attributes: ['id', 'uuid', 'title', 'scategory', 'view', 'createdAt'],
            }],
            attributes: ['nickname', 'admin'],
        });
        return res.json(user);
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
});

router.post('/bookmark/:uuid', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { uuid: req.params.uuid } });
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.addBookMarker(req.user?.id);
        const sendPost = await Post.findOne({
            where: { uuid: req.params.uuid },
            attributes: ['id', 'uuid', 'title', 'scategory', 'view', 'createdAt'],
        });
        return res.json(sendPost);
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
});
router.delete('/bookmark/:uuid', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { uuid: req.params.uuid } });
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.removeBookMarker(req.user?.id);
        const sendPost = await Post.findOne({
            where: { uuid: req.params.uuid },
            attributes: ['id', 'uuid', 'title', 'scategory', 'view', 'createdAt'],
        });
        return res.json(sendPost);
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
});

export default router;