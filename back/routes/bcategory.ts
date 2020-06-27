import express from 'express';

import Bcategory from '../models/bcategory';
import Scategory from '../models/scategory';
import { isAdminLoggedIn } from './middlewares';

const router = express.Router();

router.post('/', isAdminLoggedIn, async (req, res, next) => {
    try {
        const newBcategory = await Bcategory.create({
            name: req.body.bcategoryData,
            order: req.body.bcategoryOrder,
        });
        const sendBcategory = await Bcategory.findOne({
            where: { id: newBcategory.id },
            include: [{
                model: Scategory,
                attributes: ['name'],
            }],
            attributes: ['name'],
        })
        return res.json(sendBcategory);
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const category = await Bcategory.findAll({
            include: [{
                model: Scategory,
                attributes: ['name'],
            }],
            order: [['order', 'ASC']],
            attributes: ['name'],
        });
        return res.json(category);
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
});

router.patch('/order', isAdminLoggedIn, async (req, res, next) => {
    try {
        const bcategory1 = await Bcategory.findOne({ where: { name: req.body.bcategory1 } });
        const bcategory2 = await Bcategory.findOne({ where: { name: req.body.bcategory2 } });
        if (!bcategory1 || !bcategory2) {
            return res.status(403).send('카테고리가 존재하지 않습니다.');
        }
        const order1 = bcategory1.order;
        const order2 = bcategory2.order;
        await Bcategory.update({ order: order2 }, { where: { id: bcategory1.id } });
        await Bcategory.update({ order: order1 }, { where: { id: bcategory2.id } });
        return res.send('순서 변경 성공!');
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
});

export default router;