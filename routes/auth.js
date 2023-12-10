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

router.post('/login', (req, res) => {
    console.log(req.body);
    // bu bosh sahifaga otip yubor degan yani boshqa sahifalarga ham qilsa bo'ladi
    res.redirect('/');
});

export default router;
