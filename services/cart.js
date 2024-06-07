import nedb from 'nedb-promises';

const database = new nedb({ filename : 'services/cart.db', autoload : true });

// Add new coffee to cart
async function addItemToCart(item) {
    try {
        return await database.insert(item);
    } catch(error) {
        console.error(error);
    }
}

// GET all coffees from cart
async function getCartItems() {
    try {
        const coffees = await database.find({});
        return coffees;
    } catch(error) {
        console.error(error);
    }
}

// DELETE specific coffee from cart
async function removeItemFromCart(id) {
    try {
       return await database.remove({ id : parseInt(id) }, {});
    } catch(error) {
        console.error(error);
    }
}

export { addItemToCart, getCartItems, removeItemFromCart };