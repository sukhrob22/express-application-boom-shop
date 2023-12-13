import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = Router();
// router bizga get post so'rovlar yuborishiga padeshka qiladi

router.get('/login', (req, res) => {
    res.render('login', {
        title: ' Login | Suxi',
        isLogin: true,
    });
});

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register | Suxi',
        isRegister: true,
    });
});

router.post('/login', async (req, res) => {
    // console.log(req.body);
    const existUser = await User.findOne({ email: req.body.email });
    if (!existUser) {
        console.log('User not found');
        return;
    }
    // console.log(existUser);

    const isPassEqual = await bcrypt.compare(
        req.body.password,
        existUser.password
    );
    if (!isPassEqual) {
        console.log('Password wrong');
        return;
    }
    // bu bosh sahifaga otip yubor degan yani boshqa sahifalarga ham qilsa bo'ladi
    res.redirect('/');
});

router.post('/register', async (req, res) => {
    // console.log(req.body); bu oraqli foyldanaluvchi kiritgan ma'lumotlarni consolda ko'ra olsak bo'ladi
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
    };

    const user = await User.create(userData);
    console.log(user);
    // console.log(req.body);
    // bu bosh sahifaga otip yubor degan yani boshqa sahifalarga ham qilsa bo'ladi
    res.redirect('/');
});

export default router;
