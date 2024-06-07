import nedb from 'nedb-promises';

const db = new nedb({ filename: 'users.db', autoload: true });

const createUser = async (user) => {
    const newUser = await db.insert(user);
    return newUser;
}

const findUser = async (username) => {
    const user = await db.findOne({ username : username });
    return user;
}

export { createUser, findUser }