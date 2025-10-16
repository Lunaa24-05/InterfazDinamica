export class Videojuego{
    constructor(id, titulo, descripcion){
        this.id = id,
        this.titulo = titulo,
        this.descripcion = descripcion
    }
    mostrarDatos(){
        console.log('Juego: ', this.titulo, ', con el id: ', this.id,
            ', se trata de ', this.descripcion);
    }
}