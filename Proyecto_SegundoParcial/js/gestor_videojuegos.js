/*Contiene la clase GestorVideojuegos, encargada de gestionar la lista (CRUD completo).

Métodos requeridos:
obtenerLista()
obtenerPorId(id)
agregar(videojuego)
actualizar(id, nuevosDatos)
eliminar(id)
Debe manejar errores mediante try...catch.

Incluir validaciones cuando:
Los campos estén vacíos.
No se encuentre el videojuego.
No se logre realizar una acción.La lista no esté inicializada. 

Cada videojuego debe mostrarse en una tarjeta que contenga:
Título
Descripción
Plataforma
Botones de Editar y Eliminar (ambos deben funcionar).
Al editar o eliminar, la lista debe actualizarse dinámicamente sin recargar la página.

Formulario
Debe permitir agregar un nuevo videojuego con los campos:
Título
Descripción
Plataforma
Si los campos están vacíos, debe mostrarse un mensaje de error visual.
*/
 

export class GestorVideojuegos {
    constructor() {
        this.videojuegos = [];
        this.nextId = 1; // asignar id unico
    }
    ObtenerLista() {
        return this.videojuegos;
    }
    ObtenerPorId(id) {
        const videojuego = this.videojuegos.find(vj => vj.id === id);
        if (!videojuego) {
            throw new Error(`Videojuego con ID ${id} no encontrado.`);
        }
        return videojuego;
    }
    //agregar un nuevo videojuego
    Agregar(videojuego) {
        try {
            if (!videojuego.titulo || !videojuego.descripcion || !videojuego.plataforma) {
                throw new Error("Todos los campos son obligatorios.");
            }   
            videojuego.id = this.nextId++;
            this.videojuegos.push(videojuego);
        } catch (error) {
            console.error("Error al agregar videojuego:", error.message);
            throw error;
        }
    }
    //actualizar los datos de un videojuego
    Actualizar(id, nuevosDatos) {
        try {
            const index = this.videojuegos.findIndex(vj => vj.id === id);
            if (index === -1) {
                throw new Error(`Videojuego con ID ${id} no encontrado.`);
            }
            if (!nuevosDatos.titulo || !nuevosDatos.descripcion || !nuevosDatos.plataforma) {
                throw new Error("Todos los campos son obligatorios.");
            }
            this.videojuegos[index] = { id, ...nuevosDatos };
        } catch (error) {
            console.error("Error al actualizar videojuego:", error.message);
            throw error;
        }   
    }
    //eliminar un videojuego
    Eliminar(id) {
        try {   
            const index = this.videojuegos.findIndex(vj => vj.id === id);
            if (index === -1) {
                throw new Error(`Videojuego con ID ${id} no encontrado.`);
            }
            this.videojuegos.splice(index, 1);
        } catch (error) {
            console.error("Error al eliminar videojuego:", error.message);
            throw error;
        }
    }
}