import { Videojuego } from "./definiciones.js";
const formulario = document.querySelector("#formulario_agregar")
const contenedor_elementos = document.querySelector('#contenedor_elementos_juegos');
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
console.log(videojuegos);
//llenar con 10 elementos

//crud
//crear elementos
//leer elementos
//actualizar elementos
//eliminar elementos


//funcion flecha|
const obtener_datos_formulario = (event) => {

    console.log("funcion para obtener datos");
    const datos_formulario = new FormData(formulario);//lee el formulario y obtiene todo el formulario
    const datos = Object.fromEntries(datos_formulario.entries());//convierte en objeto

    //validar que el usuario ingrese datos mostrando un mensaje de error
    //si el usuario no ingreso nada  que la vista aparezca que ingrese datos
    //ya que este validado que se cree la tarjeta con los datos ingresados pero solo el ultimo
    //que en la lista se vea "1- nombre del juego" "2- nombre del juego"

    try{
        if(!datos.titulo || !datos.descripcion){
            throw new Error("Todos los campos son obligatorios");
    } else{
        document.querySelector('#mensaje_error').hidden = true;
        document.querySelector('#mensaje_error').textContent = '';
    }
    //se agregan los videojuegos nuevos a un arreglo de videojuego
    videojuegos.push(new Videojuego(
        videojuegos.length + 1, datos.titulo, datos.descripcion
    ));

    if(videojuegos.length >= 0){
        const ultimo_videojuego = videojuegos[videojuegos.length - 1];
        crearElementoVista(ultimo_videojuego.titulo, ultimo_videojuego.descripcion);
    }

    eliminar_videojuego(videojuego.length);
    //console.log(videojuegos);
    //const juego = new Videojuego();
    }catch(error){
        document.querySelector('#mensaje_error').hidden = false;
        document.querySelector('#mensaje_error').textContent = error.message;
    }
};

function eliminar_videojuego(id){
    //necesitamos el id del videojuego a eliminar
    const videojuego_a_eliminar = videojuegos.filter(videojuego => videojuego.id === id);
    
    try{
        if(!videojuego_a_eliminar){
          throw new Error('No se puede eliminar');
        }
        //arreglo = [1,2,3,4,5]
        //arreglo.splice(0,1); va a eliminar el 3
        //arreglo.splice (1.3); va a eliminar el 2,3,4
        //hacer metodo de borrar
        videojuegos.splice(videojuego_a_eliminar.id - 1, 1);
        console.log(videojuegos);
        //sirve para eliminar un elemento de un arreglo. indice, cantidad de elementos a eliminar
        console.log('puedo eliminar el juego');
    } catch(error){
     console.log(error);
    }
}
const crearElementoVista = (titulo_videojuego, descripcion_videojuego)=> {
    const elemento = document.createElement('div');

    elemento.classList.add("contenedor_elementos_juegos");

    const titulo = document.createElement('h1');
    titulo.textContent = titulo_videojuego;

    const descripcion = document.createElement('p');
    descripcion.textContent = descripcion_videojuego;

    const boton_editar = document.createElement('button');
    boton_editar.classList.add('editar');
    boton_editar.textContent = 'Editar';

    const boton_eliminar = document.createElement('button');
    boton_eliminar.classList.add('eliminar');
    boton_eliminar.textContent = 'Eliminar';

    elemento.appendChild(titulo);
    elemento.appendChild(descripcion);
    elemento.appendChild(boton_editar);
    elemento.appendChild(boton_eliminar);
    contenedor_elementos.appendChild(elemento);

};

document.querySelector("#boton_agregar").addEventListener('click', ()=>{
    obtener_datos_formulario();
})
//name en input es para que el FormData lo identifique