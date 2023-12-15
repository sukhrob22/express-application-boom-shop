export default function (req, res, next) {
    // console.log(req.cookies.token);
    const isAuth = req.cookies.token ? true : false;
    // bu yerda next bizga o'zidan keyin qolgan kodlarni ishlab ketishiga yordam
    //  beradi agar buni beramsak middlewar ishlaydida lekin undan keyingi kodlar ishlamaydi
    res.locals.token = isAuth;
    next();
}
