import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        // bu yerda bunday qilganimiz sababi schema.types.objectId bizga mongodbdagi objectId ni topib beradi va o'sha yerdagi hamma ma'lumotni olib beradi
        // ref qilib esa qayergani malumotlanri olishini yo'naltiramiz
    },
    { timestamps: true }
);
// bu yerda schemamiz obj dan keyin option qabul qiladi, biz bu yerga timestamps optionni bergamiz bu bizga
//ma'lumotlarimizni bazaga yuborganda birdan creat bo'lgan va update bo'lgan sana vaqtlarni ham qo'shib beradi bu biz uchun muxum

const Product = model('Product', ProductSchema);

export default Product;
