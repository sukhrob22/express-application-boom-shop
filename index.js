import express from 'express';
import { engine, create } from 'express-handlebars';
import AuthRoutes from './routes/auth.js';
import PoductsRoutes from './routes/products.js';
// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';

// bu yo'lar orqali biz dirnameni pathdan chiqarib olamiz bunday qilmasak dirname chiqmaydi bzini faylarimiz module struktufada bo'lganiligi uchun
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();

const hbs = create({
    // bu orqali biz handlebars qilib uzun yozmaymizda o'niga hbs qilib yozib qo'ysak bo'ladi main.handlebars ni o'rniga main.hbs
    defaultLayout: 'main',
    extname: 'hbs',
});

// bu 3 qator kod bilan o'zimizning divijogimizni yuklab oldik ya'ni handlebarsni
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// bu use desak qandaydir extra method obj yo func ishlatayotgan bo'lamiz, biz middlewarsni get so'rovdagi callbackfuncdan oldin ham qo'ysak bo'ladi
//  keyun o'sha so'rovdan oldin ham qo'ysak bo'ladi use dek
// bu bizlarni middlewarlarimiz
app.use(AuthRoutes);
app.use(PoductsRoutes);

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
