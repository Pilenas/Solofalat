import { Router } from "express";
import { menu } from "../config/data.js";

const router = Router();

router.get('/', (req, res) => {
    const { id, title } = req.query;
    let filteredMenu = menu;
    if(title){
        filteredMenu = filteredMenu.filter(menu => menu.title === title);
    }
    if(id){
        filteredMenu = filteredMenu.filter(menu => menu.id === id);
    }
    res.json(filteredMenu);
});

router.get('/titles', (req, res) => {
    const titles = [];
    menu.menu.forEach(menu => {
        if(!titles.includes(menu.title)){
            titles.push(menu.title);
        }
    })
    res.json(titles);
});

export default router;



