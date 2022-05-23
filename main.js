class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = [libros],
        this.mascotas = [mascotas]
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(nuevaMascota) {
        this.mascotas.push(nuevaMascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        const nuevoLibro = {nombre: nombre, autor: autor};
        this.libros.push(nuevoLibro);
    }

    getBookNames() {
        const bookNames = this.libros.map(libro => libro.nombre)

        return bookNames;
    }
}


const user = new Usuario("Andrés", "Marolt", {nombre: "Tom Sawyer", autor: "Mark Twain"}, "Sasha");
user.addBook("Corazón", "Edmundo de Amicis")

console.log(user.getBookNames());