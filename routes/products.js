import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    // res.send('Main page');
    // res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.render('index');
});

router.get('/products', (req, res) => {
    res.render('products');
});

router.get('/add', (req, res) => {
    res.render('add');
});

export default router;
