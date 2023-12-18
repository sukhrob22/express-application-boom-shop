import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async function (req, res, next) {
    if (!req.cookies.token) {
        next();
        // res.redirect('/login');
        return;
    }

    const token = req.cookies.token;
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.userId);

    req.userId = user._id;
    // console.log(user);
    // bu yerda biz jwt.verify orqali biz tokenimizni ochib olamiz va bu orqali paylodimizni olib olsak bo'ladi
    // console.log(decode);
    next();
}
