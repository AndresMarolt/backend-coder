/* const express = require('express')
const app = express();
const port = 5000;


app.get('/', (req, res) => {
    res.status(200).send('Hola soy home');
})

app.get('/publicaciones', (req, res) => {
    res.send('Hola soy ruta publicaciones')
})

app.listen(port, () => {
    console.log(`Servidor escuchando puerto ${port}`);
}) */

const express = require('express');
const app = express();
const port = 8080;

let visitas = 0;

app.use((req, res, next) => {           // FUNCION MIDDLEWARE
    visitas++;
    next();
})

app.get('/', (req, res) => {
    res.send('<h1 style=color:blue >Bienvenidos al servidor Express!</h1>')
})

app.get('/visitas', (req, res) => {
    res.send(`El servidor tuvo ${visitas} visitas`)
})

app.get('/fyh', (req, res) => {
    const today = new Date().get;
    res.send(today);
})

app.listen(port, () => {
    console.log(`Servidor escuchando puerto ${port}`);
})