import { Circulo, Cuadrado, Linea, Sticker, Trazo, Corazon} from "./figuras.js";
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let trazoIniciado = false;
const figuras = [];
let figura = null;
let opcion = 'pincel';
let colorLinea = "#000000";
let colorRelleno = "#ff0000";
let grosorLinea = 2;
let urlSticker = null;
let puntosTrazo = []; // para guardar puntos del trazo libre del pincel
let posicionesCursor = {
    iniciales : {
        x: "",
        y: ""
    },
    actuales:{
        x:"",
        y:"",
    },
    finales : {
        x:"",
        y:""
    }
}
document.querySelector("#boton_pincel").addEventListener('click', (event)=>{
    opcion = "pincel";
});
document.querySelector("#boton_borrar").addEventListener('click', (event)=>{
    opcion = "borrar";
});
document.querySelector("#boton_cuadrado").addEventListener('click', (event)=>{
    opcion = "cuadrado";
});
document.querySelector("#boton_circulo").addEventListener('click', (event)=>{
    opcion = "circulo";
});
document.querySelector("#boton_corazon").addEventListener('click', (event)=>{
    opcion = "corazon";
});
document.querySelector("#boton_linea").addEventListener('click', (event)=>{
    opcion = "linea";
});
document.querySelector("#boton_limpiar").addEventListener('click', (event)=>{
    figuras.length = [];
    ctx.clearRect(0,0, canvas.width, canvas.height);
    renderizarFiguras();
});
document.querySelector("#boton_deshacer").addEventListener('click', (event)=>{
    figuras.pop();
    ctx.clearRect(0,0, canvas.width, canvas.height);
    renderizarFiguras();
});
document.querySelector("#boton_cargar_imagen").addEventListener('change', (event)=>{
    cargarImagen(event);
});
document.querySelector("#boton_sticker").addEventListener('click', () => {
    opcion = 'sticker';
});
document.querySelector("#color_linea").addEventListener("input", e => {
  colorLinea = e.target.value;
});
document.querySelector("#color_relleno").addEventListener("input", e => {
  colorRelleno = e.target.value;
});
document.querySelector("#grosor_linea").addEventListener("input", e => {
  grosorLinea = parseInt(e.target.value);
});

canvas.addEventListener('mousedown',(event)=>{
    trazoIniciado = true;
    posicionesCursor.iniciales = registrarPosicionCursor(event);
    if (opcion === 'pincel') {
        puntosTrazo = [posicionesCursor.iniciales]; // inicializar con el primer punto
    }
    /*console.log('Se hizo click', registrarPosicionCursor(event));
    posicionesCursor.iniciales = registrarPosicionCursor(event);*/
    //const lienzo = new Linea(posicionesCursor.iniciales.x, posicionCursor.iniciales.y,)
});
canvas.addEventListener('mousemove',(event)=>{
    //Hacer un switch para cada funcion del menu: pincel, borrar, cuadrado, circulo
    //console.log('el cursor esta sobre el canvas', registrarPosicionCursor(event));
    posicionesCursor.actuales = registrarPosicionCursor(event);

    if (trazoIniciado) {

        console.log('opcion seleccionada', opcion);
        switch (opcion) {
            case 'pincel':
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.strokeStyle = colorLinea;
                ctx.lineWidth = grosorLinea;
                ctx.beginPath();
                ctx.moveTo(posicionesCursor.iniciales.x, posicionesCursor.iniciales.y);
                ctx.lineTo(posicionesCursor.actuales.x, posicionesCursor.actuales.y);
                ctx.stroke();
                puntosTrazo.push(posicionesCursor.actuales); // agregar punto al trazo
                posicionesCursor.iniciales = posicionesCursor.actuales;
                break;
            case 'borrar':
                case 'borrar':
                    const tamaño = grosorLinea * 5;
                    ctx.save();
                    ctx.globalCompositeOperation = "destination-out";
                    ctx.beginPath();
                    ctx.arc(event.offsetX, event.offsetY, tamaño / 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                break;
            case 'cuadrado':
                figura = new Cuadrado(posicionesCursor.iniciales.x, posicionesCursor.iniciales.y,
                    posicionesCursor.actuales.x, posicionesCursor.actuales.y, colorLinea, colorRelleno, grosorLinea);
                break;
            case 'circulo':
                figura = new Circulo(posicionesCursor.iniciales.x, posicionesCursor.iniciales.y,
                    posicionesCursor.actuales.x, posicionesCursor.actuales.y, colorLinea, colorRelleno, grosorLinea);
                break;
            case 'corazon':
                figura = new Corazon(posicionesCursor.iniciales.x, posicionesCursor.iniciales.y,
                    posicionesCursor.actuales.x, posicionesCursor.actuales.y, colorLinea, colorRelleno, grosorLinea);
                break;
            case 'linea':
                figura = new Linea(posicionesCursor.iniciales.x, posicionesCursor.iniciales.y,
                    posicionesCursor.actuales.x, posicionesCursor.actuales.y, colorLinea, grosorLinea);
                break;
            case 'sticker':
                break;
            default:
                break;
        }
        if (figura && opcion !== 'pincel') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            renderizarFiguras();
            figura.dibujar(ctx);
            figura = null;
        }
    }
});
canvas.addEventListener('mouseup', (event) => {
    posicionesCursor.finales = registrarPosicionCursor(event);
 
    switch (opcion) {
        case 'pincel':
            if (puntosTrazo.length > 1) {
                figura = new Trazo(puntosTrazo, colorLinea, grosorLinea);
            }
            puntosTrazo = [];
            break;
        case 'borrar':
            break;
        case 'cuadrado':
            figura = new Cuadrado(posicionesCursor.iniciales.x, posicionesCursor.iniciales.y,
                posicionesCursor.finales.x, posicionesCursor.finales.y, colorLinea, colorRelleno, grosorLinea);
            break;
        case 'circulo':
            figura = new Circulo(posicionesCursor.iniciales.x, posicionesCursor.iniciales.y,
                posicionesCursor.finales.x, posicionesCursor.finales.y, colorLinea, colorRelleno, grosorLinea);
            break;
        case 'corazon':
            figura = new Corazon(posicionesCursor.iniciales.x, posicionesCursor.iniciales.y,
                posicionesCursor.finales.x, posicionesCursor.finales.y, colorLinea, colorRelleno, grosorLinea);
            break;
        case 'linea':
            figura = new Linea(posicionesCursor.iniciales.x, posicionesCursor.iniciales.y,
                posicionesCursor.finales.x, posicionesCursor.finales.y, colorLinea, grosorLinea);
            break;
        case "deshacer":
                finalizar(event);
                break;
        case 'sticker':
            if(!urlSticker) return;
            figura = new Sticker(posicionesCursor.finales.x, posicionesCursor.finales.y, urlSticker);
            break;
        default:
            break;
    }
 
    if (figura != null)
        figuras.push(figura);
 
     trazoIniciado = false;
     return; // <- no redibuja, no borra el borrado
});
  

function registrarPosicionCursor(event){
    const posicion = {x: event.offsetX, y: event.offsetY};
    return posicion;
}
function obtenerPosicionCursor(event){
    if(trazoIniciado){
        console.log(event.offsetX, " - ", event.offsetY);
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 10;
        ctx.fillStyle = "black";
        ctx.strokeRect(event.offsetX, event.offsetY, 10, 10); //contorno
        ctx.fillRect(event.offsetX, event.offsetY, 10, 10); //relleno
    }
}
/*function iniciar(event){
    console.log(event.offsetX, " - ", event.offsetY);
    trazoIniciado = true;
}
function finalizar(event){
    console.log(event.offsetX, " - ", event.offsetY);
    trazoIniciado = false;
}*/ 
function renderizarFiguras(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // limpiar canvas
    if(figuras.length > 0){
        figuras.forEach(figura => {
            figura.dibujar(ctx);
        });
    }
}
function cargarImagen(event){
    if(event.target.files[0]){
        if(event.target.files[0].type === "image/png"){
            const lector = new FileReader();
            lector.onload = (event) => {
                urlSticker= event.target.result;
                console.log(urlSticker);
                document.getElementById("boton_cargar_imagen").style.backgroundImage = "url(" + urlSticker + ")";

                lector.readAsDataURL(event.target.files[0]);
            }
        }
    }
}