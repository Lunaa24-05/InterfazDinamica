import { convertir_de_JSON_a_Objeto, convertir_de_Objeto_a_JSON } from "./ayudas.js";
import { Videojuego } from "./definiciones.js";
import { GestorVideojuegos } from "./gestorVideojuegos.js";

//el main se va a encargar de inicializar la aplicacion
//inicializa las funciones

let videojuegos = [
    new Videojuego(1, 'The Legend of Zelda', 'Aventura y exploracion'),
    new Videojuego(2, 'God of War', 'Accion y mitologia nordica'),
    new Videojuego(3, 'Red Dead Redemption 2', 'Accion y aventura'),
    new Videojuego(4, 'The Witcher 3: Wild Hunt', 'RPG y fantasia'),
    new Videojuego(5, 'Minecraft', 'Construccion y supervivencia'),
    new Videojuego(6, 'Fortnite', 'Battle royale y construccion'),
    new Videojuego(7, 'Overwatch', 'Shooter en equipo y habilidades unicas'),
    new Videojuego(8, 'Dark Souls III', 'RPG y accion'),
    new Videojuego(9, 'Hades', 'Roguelike y mitologia griega'),
    new Videojuego(10, 'Celeste', 'Plataformas y superacion personal')
]; 

//agregar 10 elementos mas  y pedirle a una IA que este arreglo lo vuelva un archivo JSON
//20 en total

const gestorVideojuegos = new GestorVideojuegos();
gestorVideojuegos.CargarListaVideojuegos(convertir_de_JSON_a_Objeto('js/videojuegos.json'));

//gestorVideojuegos.AgregarNuevoVideojuego(new Videojuego(11, 'ejemplo', 'descripcion ejemplo'));

//gestorVideojuegos.ActualizarDatosVideojuego(7, new Videojuego(11, 'ejemplo actualizado', 'descripcion ejemplo actualizada'));

//console.log(convertir_de_JSON_a_Objeto('js/videojuegos.json'));
//console.log(convertir_de_Objeto_a_JSON(videojuegos));

gestorVideojuegos.ObtenerVideojuegoPorId(2);

//crear sus metodos para crear toda la lista de videojuegos

gestorVideojuegos.EliminarVideojuegoPorID(3);

function crearListaVideojuegos(){
    gestorVideojuegos.listaVideojuegos.forEach(elemento => {
        crearElementoLista(elemento.titulo, elemento.descripcion);
    });
}

//sincronizar las funciones del gestor de videojuegos con los botones que ya se agregaron en la vista
//agregar, actualizar y eliminar

crearListaVideojuegos();