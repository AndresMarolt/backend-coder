const { log } = require('console');
const fs = require('fs');

class Product {
    constructor(title, price, stock) {
        this.title = title,
        this.price = price,
        this.stock = stock
    }
}

class Contenedor {

    constructor(fileName) {
        this.file = fileName;
    }

    async save(obj) {
        try {
            const fileExists = false;
            if(fs.open(`./${this.file}`, 'r', (err, f) => {
                console.log("EXISTE");
            }));
            let productsString = await fs.promises.readFile(`./${this.file}`, 'utf-8');       // Lee lo que haya en el archivo si este ya existe
            let productsObj = JSON.parse(productsString);                                     
            let ids = productsObj.map(product => {                                            // Crea un array que contiene los ids de todos los productos
                return product.id;
            })
            if(ids.some(el => el !== null)) {
                const maxId = Math.max(...ids);                                                     // Busca el id más alto
                const newId = maxId+1;                                                              // El id del producto agregado será el máximo id + 1
                obj.id = newId;                                                                     // Se le asigna el nuevo id al nuevo producto
            } else {
                obj.id = 1;
            }
            productsObj.push(obj);
            productsString = JSON.stringify(productsObj);
            await fs.promises.writeFile(`./${this.file}`, productsString);
            return obj.id;

        } catch(error) {                    // Si no existe un archivo con el nombre indicado se arroja error al intentar leerlo y se pasa al catch, donde se lo crea
            console.log(error);
            /* let productsArray = [];
            let id = 1;
            obj.id = id;
            productsArray.push(obj);
            productsArray = JSON.stringify(productsArray);
            await fs.promises.writeFile(`./${this.file}`, productsArray); */
        }
    }

    async getById(id) {
        try {
            const productsString = await fs.promises.readFile(`./${this.file}`, 'utf-8');
            const productsObj = JSON.parse(productsString);
            const searchedProd = productsObj.find(product => { return product.id == id });
            return searchedProd;
        } catch {
            console.log("Hubo un error al buscar el id ingresado");
        }
    }

    async getAll() {
        try {
            const allProducts = await fs.promises.readFile(`./${this.file}`, 'utf-8');
            return JSON.parse(allProducts);

        } catch(error) {
            console.log("Error al intentar obtener todos los productos");
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const productsString = await fs.promises.readFile(`./${this.file}`, 'utf-8');
            let productsObj = JSON.parse(productsString);
            const newArray = productsObj.filter(prod => prod.id != id);
            productsObj = JSON.stringify(newArray);
            await fs.promises.writeFile(`./${this.file}`, productsObj);

        } catch(error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.readFile(`./${this.file}`, 'utf-8');
            await fs.promises.writeFile(`./${this.file}`, "");
        } catch(error) {
            console.log(error);
        }
    }
}

const prod1 = new Product("Camiseta", 9500, 5);
const prod2 = new Product("Short", 7000, 7);
const prod3 = new Product("Remera", 6000, 7);
const prod4 = new Product("Remera", 5000, 7);
const prod5 = new Product("Buzo", 10000, 7);

const file = new Contenedor("productos.txt");


file.save(prod1);

// file.getById(1)
//     .then(res => console.log(res));

// file.getAll()
//     .then(res => console.log(res));

// file.deleteById(1);

// file.deleteAll();
