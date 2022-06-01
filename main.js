const { log } = require('console');
const fs = require('fs');

let id = 0;

const objeto = {
    title: "Camiseta NBA Evan Mobley",
    price: 9500,
    stock: 5
}

const objeto2 = {
    title: "Camiseta NBA Jayson Tatum",
    price: 9500,
    stock: 5
}

class Contenedor {

    constructor(fileName) {
        this.file = fileName;
    }

    async save(obj) {
        try {
            const products = await JSON.parse(fs.promises.readFile(`./${this.file}`, 'utf-8'));
            obj.id = id;
            const allProducts = [...products];
            allProducts.push(obj)
            allProducts.push
            id++;
            await fs.promises.appendFile(`./${this.file}`, allProducts + "\n");
        } catch(error) {
            console.log("Error al guardar producto");
            console.log(error);
        }
        return id;
    }

    getById(id) {

    }

    async getAll() {
        try {
            const allProducts = await fs.promises.readFile(`./${this.file}`, 'utf-8');
            return allProducts;

        } catch(error) {
            console.log("Error al intentar obtener todos los productos");
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            let allProducts = await fs.promises.readFile(`./${this.file}`, 'utf-8');
            console.log(allProducts);
            allProducts = await JSON.parse(allProducts);

            console.log(allProducts);

            allProducts = allProducts.filter(prod => prod.id != id);

            allProducts = JSON.stringify(allProducts);

            await fs.promises.writeFile(`./${this.file}`, allProducts);

        } catch(error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.file}`, "");
        } catch(error) {
            console.log(error);
        }
    }
}

const file = new Contenedor("productos.txt");


file.save(objeto);