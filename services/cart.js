import nedb from 'nedb-promises';

const database = new nedb({ filename: 'services/cart.db', autoload: true });

// Add new coffee to cart
async function addItemToCart(item) {
    try {
        return await database.insert(item);
    } catch (error) {
        console.error(error);
    }
}

// GET all coffees from cart and calculate total price
async function getCartItems() {
    try {
        const items = await database.find({});
        const total = items.reduce((sum, item) => sum + item.price, 0);
        return { items, total };
    } catch (error) {
        console.error(error);
    }
}

export { addItemToCart, getCartItems };
