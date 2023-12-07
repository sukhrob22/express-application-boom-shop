import { dir } from 'console';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// bu yo'lar orqali biz dirnameni pathdan chiqarib olamiz bunday qilmasak dirname chiqmaydi bzini faylarimiz module struktufada bo'lganiligi uchun
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.get('/', (req, res) => {
    // res.send('Main page');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
    // res.send('About page');
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
