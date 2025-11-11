class Figura {
    constructor(inicio_x, inicio_y, fin_x, fin_y, color_linea, color_relleno, grozor_linea) {
        this.inicio_x = inicio_x;
        this.inicio_y = inicio_y;
        this.fin_x = fin_x;
        this.fin_y = fin_y;
        this.posicion_x = Math.min(inicio_x, fin_x);
        this.posicion_y = Math.min(inicio_y, fin_y);
        this.color_linea = color_linea;
        this.color_relleno = color_relleno;
        this.grozor_linea = grozor_linea;
    }
}

export class Cuadrado extends Figura {
    constructor(inicio_x, inicio_y, fin_x, fin_y, color_linea, color_relleno, grozor_linea) {
        super(inicio_x, inicio_y, fin_x, fin_y, color_linea, color_relleno, grozor_linea);
        this.ancho = Math.abs(fin_x - inicio_x);
        this.alto = Math.abs(fin_y - inicio_y);
    }

    dibujar(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grozor_linea;
        ctx.fillStyle = this.color_relleno;

        ctx.fillRect(this.posicion_x, this.posicion_y, this.ancho, this.alto);
        ctx.strokeRect(this.posicion_x, this.posicion_y, this.ancho, this.alto);
    }
}

export class Circulo extends Figura {
    constructor(inicio_x, inicio_y, fin_x, fin_y, color_linea, color_relleno, grozor_linea) {
        super(inicio_x, inicio_y, fin_x, fin_y, color_linea, color_relleno, grozor_linea);
        this.radio = Math.sqrt((fin_x - inicio_x) ** 2 + (fin_y - inicio_y) ** 2);
    }

    dibujar(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grozor_linea;
        ctx.fillStyle = this.color_relleno;

        ctx.arc(this.inicio_x, this.inicio_y, this.radio, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}
export class Corazon extends Figura { 
    constructor(inicio_x, inicio_y, fin_x, fin_y, color_linea, color_relleno, grozor_linea) {
        super(inicio_x, inicio_y, fin_x, fin_y, color_linea, color_relleno, grozor_linea);
        this.ancho = Math.abs(fin_x - inicio_x);
        this.alto = Math.abs(fin_y - inicio_y);
    }

    dibujar(ctx) {
    const x = this.posicion_x;
    const y = this.posicion_y;
    const width = this.ancho;
    const height = this.alto;

    ctx.beginPath();
    ctx.strokeStyle = this.color_linea;
    ctx.lineWidth = this.grozor_linea;
    ctx.fillStyle = this.color_relleno;

    // Inicia en el centro inferior
    ctx.moveTo(x + width / 2, y + height);

    // Lado izquierdo
    ctx.bezierCurveTo(
        x - width * 0.1, y + height * 0.75,
        x, y + height * 0.25,
        x + width / 2, y + height * 0.4
    );

    // Lado derecho
    ctx.bezierCurveTo(
        x + width, y + height * 0.25,
        x + width * 1.1, y + height * 0.75,
        x + width / 2, y + height
    );

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    }

}


export class Linea extends Figura {
    constructor(inicio_x, inicio_y, fin_x, fin_y, color_linea, grozor_linea) {
        super(inicio_x, inicio_y, fin_x, fin_y, color_linea, null, grozor_linea);
    }

    dibujar(ctx) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grozor_linea;

        ctx.moveTo(this.inicio_x, this.inicio_y);
        ctx.lineTo(this.fin_x, this.fin_y);
        ctx.stroke();
    }
}
export class Sticker{
    constructor(posicion_x, posicion_y, url_imagen){
        this.posicion_x = posicion_x;
        this.posicion_y = posicion_y;

        this.imagen = new Image();
        this.imagen.src = url_imagen;
    }
    dibujar(ctx){
        ctx.beginPath();
        ctx.drawImage(this.imagen, 0, 0, this.imagen.width, this.imagen.height, this.posicion_x, this.posicion_y,
            this.imagen.width / 2, this.imagen.height / 2
        );
    }
}

export class Trazo {
    constructor(puntos, color_linea = 'black', grozor_linea = 2) {
        this.puntos = puntos; // array de {x, y}
        this.color_linea = color_linea;
        this.grozor_linea = grozor_linea;
    }

    dibujar(ctx) {
        if (this.puntos.length < 2) return;
        
        ctx.beginPath();
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grozor_linea;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.moveTo(this.puntos[0].x, this.puntos[0].y);
        for (let i = 1; i < this.puntos.length; i++) {
            ctx.lineTo(this.puntos[i].x, this.puntos[i].y);
        }
        ctx.stroke();
    }
}

