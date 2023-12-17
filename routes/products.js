import { Router } from 'express';
import Product from '../models/Product.js';
const router = Router();

router.get('/', (req, res) => {
    // res.send('Main page');
    // res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.render('index', {
        title: 'Boom shop | Suxi',
    });
});

router.get('/products', (req, res) => {
    res.render('products', {
        title: 'Products | Suxi',
        isProducts: true,
    });
});

router.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add | Suxi',
        isAdd: true,
    });
});

router.post('/add-product', async (req, res) => {
    // console.log(req.body);
    const { title, description, image, price } = req.body;
    const products = await Product.create(req.body);

    res.redirect('/');
});

export default router;
