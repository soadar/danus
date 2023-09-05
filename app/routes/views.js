import { Router } from "express";
import AlbumManager from "../DAO/mongodb/album.dao.js";
const albumDao = new AlbumManager();

import ProductManager from "../DAO/mongodb/product.dao.js";
const productDao = new ProductManager();

import MessageManager from "../DAO/mongodb/message.dao.js";
const messageDao = new MessageManager();

const router = Router();

router.get('/', async (req, res) => {
    //res.json({ msg: "hola" });
    res.render("portal");
});

router.get('/productos', async (req, res) => {
    const { products } = req.query;
    if (!products) {
        const data = await albumDao.getAll();
        res.render("productos", {
            data
        });
    } else {
        const data = await productDao.searchAlbum(products);
        if (data.length) {
            res.render("productos", {
                data
            });
        } else {
            const data = await productDao.searchProd(products);
            res.render("productos", {
                data
            });
        }
    }
});

router.get('/contacto', async (req, res) => {
    res.render("contacto");
});

router.post('/contacto', async (req, res) => {
    const { name, tel, message } = req.body;
    if (name && tel && message) {
        await messageDao.create({ name, tel, message });
    }
    res.render("contacto");
});

router.get('/mensajes', async (req, res) => {
    const mensajes = await messageDao.getAll();
    res.render("mensajes", {
        mensajes
    });

});

router.get('/crearAlbum', async (req, res) => {
    res.render("crearAlbum");
});

router.post('/crearAlbum', async (req, res) => {
    const { title, image } = req.body;
    await albumDao.create({ title, thumbnails: image });
    res.render("crearAlbum");
});

router.get('/crearProducto', async (req, res) => {
    const albums = await albumDao.getAll();
    var nombres = albums.map((x) => {
        return x.title;
    });
    res.render("crearProducto", {
        nombres
    });
});

router.post('/crearProducto', async (req, res) => {
    const { name, image, album } = req.body;
    const title = `${album}_${name}`
    await productDao.create({ title, thumbnails: image });
    res.render("crearProducto");
});

router.get('/editProducto', async (req, res) => {
    const { id } = req.query;
    let data = await productDao.getById(id);
    if (data) {
        data = data.toJSON();
        const albums = await albumDao.getAll();
        var nombres = albums.map((x) => {
            return x.title;
        });

        res.render("editProducto", { data, nombres });
    } else {
        data = await albumDao.getById(id);
        if (data) {
            data = data.toJSON();
            res.render("editProducto", { data });
        }
    }
});

router.post('/editProducto', async (req, res) => {
    const { id } = req.query;
    if (req.body.album) {
        await productDao.update(id, req.body)
    } else {
        const album = await albumDao.getById(id)
        const albumViejo = album.title;
        const albumNuevo = req.body.title;
        await productDao.updateMany({ album: albumViejo }, { album: albumNuevo })
        await albumDao.update(id, req.body)
    }
    res.redirect("/productos")
});

export default router;