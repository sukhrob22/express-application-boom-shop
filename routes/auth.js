import { Router } from 'express';
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

export default router;
