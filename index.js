import express from 'express';
import { engine, create } from 'express-handlebars';
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

app.get('/', (req, res) => {
    // res.send('Main page');
    // res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.render('index');
});

app.get('/about', (req, res) => {
    // res.send('About page');
    // res.sendFile(path.join(__dirname, 'views', 'about.html'));
    res.render('about');
});

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
