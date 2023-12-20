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

router.get('/products', async (req, res) => {
    const user = req.userId ? req.userId.toString() : null;
    const myProducts = await Product.find({ user }).populate('user').lean();

    res.render('products', {
        title: 'Products | Suxi',
        isProducts: true,
        myProducts: myProducts,
    });

    // bu yerdagi populate() bizga foydalanuvchimizni userini ma'lumotnlarni  kengaytirib beradi aynan shu idga teng bo'lgan ma'lumotlarni
    // uni ichiga o'sha Productga berilgan userni yozami
});

router.get('/add', authMiddleware, (req, res) => {
    res.render('add', {
        title: 'Add products',
        isAdd: true,
        errorAddProducts: req.flash('errorAddProducts'),
    });
});

router.get('/product/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id).populate('user').lean();

    res.render('product', {
        product: product,
    });
    // params bizga productdan keyingi idini olib beradi
});

router.get('/edit-product/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id).populate('user').lean();

    res.render('edit-product', {
        product: product,
        errorEditProducts: req.flash('errorEditProducts'),
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

router.post('/edit-product/:id', async (req, res) => {
    const { title, description, image, price } = req.body;
    const id = req.params.id;
    if (!title || !description || !image || !price) {
        req.flash('errorEditProducts', 'All fields is required');
        res.redirect(`/edit-product/${id}`);
        return;
    }

    await Product.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    res.redirect('/products');

    // bu yerdagi findByIdAndUpdate() methodmizni agar biz ma'lumotni o'zgartirsak keyin bazaga o'sha o'zgargan ma'lumonti bazaga yangilab beradi
    // unig ichidagi idimiz va yuklagan narsami va new:true bizni configurtsiyami agar buni qilmask bizni o'zgarishimi birinchi o'zgarishda emas keyingi o'zgarishda
    // o'zgaradi agar buni true qilib qo'ysak birdan o'zgaradi
});

router.post('/delete-product/:id', async (req, res) => {
    const id = req.params.id;

    await Product.findByIdAndRemove(id);
    res.redirect('/');
});

export default router;
