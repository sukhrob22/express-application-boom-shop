import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateJWTToken } from '../services/token.js';

const router = Router();
// router bizga get post so'rovlar yuborishiga padeshka qiladi

router.get('/login', (req, res) => {
    if (req.cookies.token) {
        res.redirect('/');
        return;
    }

    res.render('login', {
        title: ' Login | Suxi',
        isLogin: true,
        loginError: req.flash('loginError'),
    });
});

router.get('/register', (req, res) => {
    if (req.cookies.token) {
        res.redirect('/');
        return;
    }

    res.render('register', {
        title: 'Register | Suxi',
        isRegister: true,
        registerError: req.flash('registerError'),
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        req.flash('loginError', 'All fields is required');
        res.redirect('/login');
        return;
    }
    // console.log(req.body);
    const existUser = await User.findOne({ email });
    if (!existUser) {
        req.flash('loginError', 'User not found');
        res.redirect('/login');
        return;
    }
    // console.log(existUser);

    const isPassEqual = await bcrypt.compare(password, existUser.password);
    if (!isPassEqual) {
        req.flash('loginError', 'Password wrong');
        res.redirect('/login');
        return;
    }

    const token = generateJWTToken(existUser._id);
    res.cookie('token', token, { httpOnly: true, secure: true });
    // bu bosh sahifaga otip yubor degan yani boshqa sahifalarga ham qilsa bo'ladi
    res.redirect('/');
});

router.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        req.flash('registerError', 'All fields is required');
        res.redirect('/register');
        return;
    }

    const condidate = await User.findOne({ email });
    if (condidate) {
        req.flash('registerError', 'User already exist');
        res.redirect('/register');
        return;
    }
    // console.log(req.body); bu oraqli foyldanaluvchi kiritgan ma'lumotlarni consolda ko'ra olsak bo'ladi
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: hashedPassword,
    };

    const user = await User.create(userData);
    // console.log(user);
    const token = generateJWTToken(user._id);
    // bu orqali biz jwt tokeni browzerdagi cookiga joylaymiz
    res.cookie('token', token, { httpOnly: true, secure: true });
    // bu bosh sahifaga otip yubor degan yani boshqa sahifalarga ham qilsa bo'ladi
    res.redirect('/');
});

export default router;
