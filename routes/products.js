import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    // res.send('Main page');
    // res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.render('index', {
        title: 'Boom shop | Suxi',
        // token: true,
    });
});

router.get('/products', (req, res) => {
    res.render('products', {
        title: 'Products | Suxi',
        isProducts: true,
        // token: true,
    });
});

router.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add | Suxi',
        isAdd: true,
        // token: true,
    });
});

router.post('/add-products', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

export default router;
