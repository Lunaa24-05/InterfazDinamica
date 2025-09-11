var tituloh = document.getElementById("titulo-h");
var titulocat = document.getElementById("titulo-cat");
const dibujo = document.querySelector("#img_dibujo");
const flores = document.querySelector("#img_flores");
const flores2 = document.querySelector("#img_flores2");
var textoh = document.getElementById("texto-h");
var textocat = document.getElementById("texto-cat");
const dibujo2 = document.querySelector("#img_dibujo2");

window.addEventListener("scroll",(event)=>{
    console.log(event);
    dibujo.style.bottom = window.scrollY * 1 + "px";
    flores.style.bottom = window.scrollY * -1 + "px";
    flores2.style.bottom = window.scrollY * -1 + "px";
    tituloh.style.left = window.scrollY * 2 + "px";
    textoh.style.left = window.scrollY * 2 + "px";
    titulocat.style.left = window.scrollY * -2 + "px";
    textocat.style.left = window.scrollY * -2 + "px";
    dibujo2.style.bottom = window.scrollY * 1 + "px";
})