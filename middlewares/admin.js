import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

const adminMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('Access denied. No token provided.');
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if (decoded.role !== 'admin') {
            return res.status(403).send('Access denied. Admins only.');
        }
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

export default adminMiddleware;
