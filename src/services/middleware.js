import {User} from '../models/user.js';

export async function checkSession(uuid) {
    try {
        const user = await User.findOne({ sessionId: uuid });
        return user;
    } catch (error) {
        return null;
    }
}


export async function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        const user = await checkSession(token);
        if (!user) {
            // If no user is found for the UUID, send Unauthorized response
            return res.status(401).json({ message: 'Unauthorized: Invalid UUID or User not found' });
        }
        req.userId = user?._id;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}