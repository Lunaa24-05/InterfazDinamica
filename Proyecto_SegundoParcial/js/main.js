/*
Archivo principal que importa ambos módulos y:
Inicializa la aplicación.
Carga los datos del archivo videojuegos.json mediante fetch.
Conecta el formulario con las funciones del gestor y del controlador de vista.*/

import { GestorVideojuegos } from './gestor_videojuegos.js';
import { ControladorVista } from './controlador_vista.js';
const gestor = new GestorVideojuegos(); //se crea una instancia del gestor

//se cargan los datos del archivo videojuegos.json
const controlador = new ControladorVista(gestor);

fetch('./js/videojuegos.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(videojuego => gestor.Agregar(videojuego));
        controlador.RenderizarLista();
    })
    .catch(error => console.error('Error al cargar los datos:', error));

//se inicializa 
controlador.Inicializar();