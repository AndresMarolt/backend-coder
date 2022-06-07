const { log } = require('console');

const port = 8080;
const express = require('express');
const app = express();

const productos = [
    {
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg",
        "id": 1
    },
    {
        "title": "Calculadora",
        "price": 234.56,
        "thumbnail": "https://i.blogs.es/362ab0/calc/1366_2000.jpg",
        "id": 2
    },
    {
        "title": "Globo terráqueo",
        "price": 345.67,
        "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_987640-MLA31076893570_062019-O.jpg",
        "id": 3
    }
]

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/productos', (req, res) => {
    res.json(productos);
})

app.get('/api/productos/:id', (req, res) => {
    const id = Number(req.params.id);
    if(isNaN(Number(id))) {
        return res.json({ error: "El parámetro no es un número" });
    }
    
    const filteredProd = productos.filter(producto => {
        return producto.id === Number(id);
    })

    if(!filteredProd.length) {
        res.status(404).json({error: "El contenido solicitado no existe"})
    }

    res.json(filteredProd);
})

app.post('/api/productos', (req, res) => {
    const { producto } = req.body;
    producto.id = productos[productos.length - 1].id + 1;
    productos.push(producto);

    res.sendStatus(201);
})

app.post('/api/productos/:id', (req, res) => {
    const {title, price, thumbnail} = req.body
    const product = productos.filter(producto => {
        return producto.id === Number(req.params.id)
    })

    product.title = title;
    product.price = price;
    product.thumbnail = thumbnail;

    productos.push(product);
})

app.listen(port, err => {
    if(err) {
        console.log(`Error al iniciar el servidor: ${err}`);
    } else {
        console.log(`Escuchando puerto ${port}`);
    }
})