import { Router } from 'express';
import { createUser, findUser } from '../services/auth.js';
import validate from '../middlewares/validate.js';

const router = Router();

router.post('/register', validate, async (req, res) => {
    const user = await findUser(req.body.username);
    if(user) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = await createUser(req.body);
    const response = {
        success : true,
        status : 201,
        message : 'User created successfully',
        data : newUser
    }
    res.json(response);
});

router.post('/login', validate, async (req, res) => {
    const user = await findUser(req.body.username);
    if(!user) {
        return res.status(400).json({ error: 'User does not exist' }); 
    } else if(user.password !== req.body.password) {
        return res.status(400).json({ error: 'Invalid password' }); 
    }

    global.user = user;
    const response = {
        success : true,
        status : 200,
        message : 'User logged in successfully',
        data : user
    }

    res.json(response);
});

router.post('/logout', (req, res) => {
    global.user = null;
    const response = {
        success : true,
        status : 200,
        message : 'User logged out successfully'
    }

    res.json(response);
});

export default router;