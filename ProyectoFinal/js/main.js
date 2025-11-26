import { guardarHistorial } from "./sesion.js";
import { Canasta, Flor } from "./figuras.js";
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let juegoEnCurso = false;
let puntaje = 0;
let usuario = 'Invitado';
let canasta = null;
let flores = [];
let rafId = null;
let contadorFlores = 0;
const intervaloFlores = 30; //para crear flores
let velocidadFloresBase = 3;
let velocidadIntervalId = null;

document.querySelector('#boton_empezar').addEventListener('click', iniciarJuego);
document.querySelector('#boton-reiniciar').addEventListener('click', reiniciarJuego);

canvas.addEventListener('mousemove', (event) => {
    if (juegoEnCurso && canasta) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        canasta.moverAlMouse(x);
    }
});
function iniciarJuego() {
    if (!juegoEnCurso) {
        juegoEnCurso = true;
        puntaje = 0;
        flores = [];
        contadorFlores = 0;

        //incrementar velocidad
        velocidadFloresBase = 3;
        if (velocidadIntervalId) clearInterval(velocidadIntervalId);
        velocidadIntervalId = setInterval(()=>{
            velocidadFloresBase += 1; 
            for(const f of flores) f.velocidad = velocidadFloresBase;
            console.log('Aumentada velocidad de las flores a', velocidadFloresBase);
        }, 6000);

        //crear nueva canasta
        canasta = new Canasta(canvas);

        //iniciar bucle
        if (!rafId) gameLoop();

        console.log('Juego iniciado');
    }
}
function reiniciarJuego() {
    juegoEnCurso = false;
    puntaje = 0;
    flores = [];
    contadorFlores = 0;
    canasta = null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('puntaje').textContent = puntaje;

    // detener bucle
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
    if (velocidadIntervalId) { clearInterval(velocidadIntervalId); velocidadIntervalId = null; }

    console.log('Juego reiniciado');
}
function terminarJuego() {
    juegoEnCurso = false;
    console.log('Juego terminado - ¡Perdió una flor!');
    // para uardar historial
    try{ guardarHistorial(puntaje); }catch(e){ console.warn('No se pudo guardar historial', e); }
    alert(`Juego Terminado\nPuntaje final: ${puntaje}`);
    
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
    if (velocidadIntervalId) { clearInterval(velocidadIntervalId); velocidadIntervalId = null; }
}
function generarFlor() {
    const flor = new Flor(canvas, velocidadFloresBase);
    flores.push(flor);
}
//bucle y actualizacion
function gameLoop() {
    rafId = requestAnimationFrame(gameLoop);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (juegoEnCurso) {
        //crear flores
        contadorFlores++;
        if (contadorFlores >= intervaloFlores) {
            generarFlor();
            contadorFlores = 0;
        }
        //actualizar y dibujar flores
        for (let i = flores.length - 1; i >= 0; i--) {
            const flor = flores[i];

            //posicion actualizada
            flor.actualizar();

            //dibujar flor
            flor.dibujar(ctx);

            //detecta la colision
            if (canasta && canasta.colisionaCon(flor)) {
                //flor atrapada
                flores.splice(i, 1);
                puntaje += 10;
                document.getElementById('puntaje').textContent = puntaje;
                console.log(`¡Flor atrapada! Puntaje: ${puntaje}`);
            } else if (flor.estaFueera()) {
                //cuando no atrapa una flor
                terminarJuego();
            }
        }
        //dibujar canasta
        if (canasta) {
            canasta.dibujar(ctx);
        }
    }
}