// Clase Punto con encapsulamiento
class Punto {
    #x; // Atributo privado
    #y; // Atributo privado

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    // Métodos getters para acceder a los valores privados
    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    // Método para convertir el punto a un string en formato para SVG
    toString() {
        return `${this.#x},${this.#y}`;
    }
}

// Clase Linea con encapsulamiento
class Linea {
    #punto1; // Atributo privado
    #punto2; // Atributo privado

    constructor(punto1, punto2) {
        this.#punto1 = punto1;
        this.#punto2 = punto2;
    }

    // Método para crear la línea en SVG
    dibujar() {
        const linea = crearElementoSVG('line', {
            x1: this.#punto1.getX(),
            y1: this.#punto1.getY(),
            x2: this.#punto2.getX(),
            y2: this.#punto2.getY(),
            stroke: 'black'
        });
        document.getElementById('svg').appendChild(linea);
    }
}

// Clase Circunferencia con encapsulamiento
class Circunferencia {
    #centro; // Atributo privado
    #radio;  // Atributo privado

    constructor(centro, radio) {
        this.#centro = centro;
        this.#radio = radio;
    }

    // Método para crear la circunferencia en SVG
    dibujar() {
        const circunferencia = crearElementoSVG('circle', {
            cx: this.#centro.getX(),
            cy: this.#centro.getY(),
            r: this.#radio,
            stroke: 'blue',
            'stroke-width': 2,
            fill: 'none'
        });
        document.getElementById('svg').appendChild(circunferencia);
    }
}

// Clase Elipse con encapsulamiento
class Elipse {
    #centro;  // Atributo privado
    #radioX;  // Atributo privado
    #radioY;  // Atributo privado

    constructor(centro, radioX, radioY) {
        this.#centro = centro;
        this.#radioX = radioX;
        this.#radioY = radioY;
    }

    // Método para crear la elipse en SVG
    dibujar() {
        const elipse = crearElementoSVG('ellipse', {
            cx: this.#centro.getX(),
            cy: this.#centro.getY(),
            rx: this.#radioX,
            ry: this.#radioY,
            stroke: 'green',
            'stroke-width': 2,
            fill: 'none'
        });
        document.getElementById('svg').appendChild(elipse);
    }
}

// Función para crear un elemento SVG
function crearElementoSVG(tipo, atributos) {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', tipo);
    for (let attr in atributos) {
        elem.setAttribute(attr, atributos[attr]);
    }
    return elem;
}

// Ejemplo de uso, siempre utilizando objetos Punto
const punto1 = new Punto(50, 50);
const punto2 = new Punto(200, 200);
const centroCircunferencia = new Punto(300, 100);
const centroElipse = new Punto(400, 300);

// Crear y dibujar una línea
const linea = new Linea(punto1, punto2);
linea.dibujar();

// Crear y dibujar una circunferencia
const circunferencia = new Circunferencia(centroCircunferencia, 50);
circunferencia.dibujar();

// Crear y dibujar una elipse
const elipse = new Elipse(centroElipse, 80, 50);
elipse.dibujar();
