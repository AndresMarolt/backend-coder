class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = [libros],
        this.mascotas = [...mascotas]
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(nuevaMascota) {
        typeof nuevaMascota == "object" ?
            this.mascotas.push(...nuevaMascota)
            :
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