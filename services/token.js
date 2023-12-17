import jwt from 'jsonwebtoken';

const generateJWTToken = (userId) => {
    // bu yerda sign bizga yangi jwt generate qilib beradi
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    return accessToken;
};

export { generateJWTToken };
