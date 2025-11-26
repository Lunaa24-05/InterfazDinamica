export class Figura {
    constructor(x, y, ancho, alto) {
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
    }
    obtenerLimites() {
        return {
            izquierda: this.x,
            derecha: this.x + this.ancho,
            arriba: this.y,
            abajo: this.y + this.alto
        };
    }
}
export class Canasta extends Figura {
    constructor(canvas) {
        super(0, 0, 100, 120);
        this.canvas = canvas;
        this.imagen = new Image();
        this.imagen.src = 'recursos/canasta_png.png';
        this.imagenCargada = false;
        this.imagen.onload = () => {
            this.imagenCargada = true;
        };
        this.imagen.onerror = () => {
            console.warn('No se cargo imagen de canasta');
        };
        this.resetearPosicion();
    }

    resetearPosicion() {
        this.x = (this.canvas.width / 2) - (this.ancho / 2);
        this.y = this.canvas.height - this.alto - 10;
    }
    moverAlMouse(posX) {
        this.x = posX - (this.ancho / 2);
        if (this.x < 0) this.x = 0;
        if (this.x + this.ancho > this.canvas.width) {
            this.x = this.canvas.width - this.ancho;
        }
    }
    dibujar(ctx) {
        if (this.imagenCargada) {
            ctx.drawImage(this.imagen, this.x, this.y, this.ancho, this.alto);
        } else {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(this.x, this.y, this.ancho, this.alto);
            ctx.fillStyle = '#654321';
            ctx.fillText('Cesta', this.x + 5, this.y + 20);
        }
    }
    colisionaCon(flor) {
        const limitesCanasta = this.obtenerLimites();
        const limitesFlor = flor.obtenerLimites();

        return !(
            limitesCanasta.derecha < limitesFlor.izquierda ||
            limitesCanasta.izquierda > limitesFlor.derecha ||
            limitesCanasta.abajo < limitesFlor.arriba ||
            limitesCanasta.arriba > limitesFlor.abajo
        );
    }
}
export class Flor extends Figura {
    constructor(canvas, velocidad = 3) {
        super(0, 0, 42, 42);
        this.canvas = canvas;
        this.velocidad = velocidad;
        this.imagen = new Image();
        this.imagen.src = 'recursos/florJuego_png.png';
        this.imagenCargada = false;
        this.imagen.onload = () => {
            this.imagenCargada = true;
        };
        this.imagen.onerror = () => {
            console.warn('No se cargo imagen');
        };
        this.inicializar();
    }
    inicializar() {
        this.x = Math.random() * (this.canvas.width - this.ancho);
        this.y = -this.alto;
    }
    actualizar() {
        this.y += this.velocidad;
    }
    estaFueera() {
        return this.y > this.canvas.height;
    }
    dibujar(ctx) {
        if (this.imagenCargada) {
            ctx.drawImage(this.imagen, this.x, this.y, this.ancho, this.alto);
        } else {
            ctx.fillStyle = '#ff75b3ff';
            ctx.beginPath();
            ctx.arc(this.x + this.ancho / 2, this.y + this.alto / 2, this.ancho / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
