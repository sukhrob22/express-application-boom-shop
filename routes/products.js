import { Router } from 'express';
import Product from '../models/Product.js';
import authMiddleware from '../middleware/auth.js';
import userMiddleware from '../middleware/user.js';
const router = Router();

router.get('/', async (req, res) => {
    // bu yerdagi find() methodimiz mongodbdagi productning hamma ma'lumotlarni olib beradi
    // lean degan method bizga kelgan ma'lumotni json farmatga o'girishga yordam beradi
    const products = await Product.find().lean();

    // res.send('Main page');
    // res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.render('index', {
        title: 'Boom shop | Suxi',
        products: products.reverse(),
        userId: req.userId ? req.userId.toString() : null,
        // reverse() method bizga  yangi qo'shilganlarni boshidan qo'yib beradi
    });
});

router.get('/products', (req, res) => {
    res.render('products', {
        title: 'Products | Suxi',
        isProducts: true,
    });
});

router.get('/add', authMiddleware, (req, res) => {
    res.render('add', {
        title: 'Add products',
        isAdd: true,
        errorAddProducts: req.flash('errorAddProducts'),
    });
});

router.post('/add-product', userMiddleware, async (req, res) => {
    // console.log(req.body);
    const { title, description, image, price } = req.body;
    if (!title || !description || !image || !price) {
        req.flash('errorAddProducts', 'All fields is required');
        res.redirect('/add');
        return;
    }

    await Product.create({ ...req.body, user: req.userId });
    // console.log(products);

    res.redirect('/');
});

export default router;
