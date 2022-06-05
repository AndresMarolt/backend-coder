const fs = require('fs');
const express = require('express');
const { log } = require('console');
const app = express();
const port = 8080;

class Contenedor {

    constructor(fileName) {
        this.file = fileName;
    }

    async getById(id) {
        try {
            const productsString = await fs.promises.readFile(`./${this.file}`, 'utf-8');
            const productsObj = JSON.parse(productsString);
            const searchedProd = productsObj.find(product => { return product.id == id });
            return searchedProd;
        } catch(error) {
            console.log("Hubo un error al buscar el id ingresado");
            console.log(error);
        }
    }

    async getAll() {
        try {
            const allProducts = await fs.promises.readFile(`./${this.file}`, 'utf-8');
            console.log(allProducts);
            return JSON.parse(allProducts);

        } catch(error) {
            console.log("Error al intentar obtener todos los productos");
            console.log(error);
        }
    }
}

const file = new Contenedor("productos.txt");

app.get('/productos', (req, res) => {
    file.getAll().then(r => res.send(r));
})

app.get('/productoRandom', (req, res) => {
    let randomNum = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    file.getById(randomNum).then(r => res.send(r));
})

app.listen(port, () => {
    console.log(`Escuchando a puerto ${port}`);
})