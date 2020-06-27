import express from 'express';

import Scategory from '../models/scategory';
import Bcategory from '../models/bcategory';
import { isAdminLoggedIn } from './middlewares';

const router = express.Router();

router.post('/', isAdminLoggedIn, async (req, res, next) => {
    try {
        const newBcategory = await Bcategory.findOne({
            where: { name: req.body.bcategory },
        });
        const newScategory = await Scategory.create({
            name: req.body.scategoryData,
            order: req.body.order,
            BcategoryId: newBcategory.id,
        });
        await newBcategory.addScategory(newScategory);
        const sendScategory = await Scategory.findOne({
            where: { id: newScategory.id },
            attributes: ['name'],
        });
        return res.json(sendScategory);
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/', async (req, res, next) => {  //scategory들 가져오기
    try {
        const scategories = await Scategory.findAll({
            attributes: ['name'],
            order: [['createdAt', 'DESC']],
        });
        return res.json(scategories);
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
});

// router.patch('/order', isAdminLoggedIn, async (req, res, next) => {
//     try {
//         const scategory1 = await Scategory.findOne({ where: { name: req.body.scategory1 } });
//         const scategory2 = await Scategory.findOne({ where: { name: req.body.scategory2 } });
//         if (!scategory1 || !scategory2) {
//             return res.status(403).send('카테고리가 존재하지 않습니다.');
//         }
//         const order1 = scategory1.order;
//         const order2 = scategory2.order;
//         await Scategory.update({ order: order2 }, { where: { id: scategory1.id } });
//         await Scategory.update({ order: order1 }, { where: { id: scategory2.id } });
//         return res.send('순서 변경 성공!');
//     } 
//     catch (e) {
//         console.error(e);
//         return next(e);
//     }
// });

export default router;