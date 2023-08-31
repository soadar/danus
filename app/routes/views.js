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
    //res.sendFile('app/views/index.html', { root: '.' })
    //res.sendFile(__dirname + "/views/index.html");
    res.render("portal");
});

router.get('/productos', async (req, res) => {
    const { products } = req.query;
    if (!products) {
        const albums = await albumDao.getAll();
        res.render("productos", {
            albums
        });
    } else {
        const albums = await productDao.search(products);

        albums.forEach(album => {
            const name = album.title.split('_')
            album.title = name[1]
        })

        res.render("productos", {
            albums
        });
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

    const mensaje = await messageDao.getById('64ed4ec27aefd9a5bdc249b1')
    //console.log(mensaje._id.getTimestamp());
    //console.log(mensaje.createdAt.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric' }));
    //console.log(mensaje.createdAt.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }));

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

export default router;