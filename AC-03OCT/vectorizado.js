class Punto {
    #x; // Atributo privado para la coordenada x
    #y; // Atributo privado para la coordenada y

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x; // Método para acceder a la coordenada x
    }

    getY() {
        return this.#y; // Método para acceder a la coordenada y
    }

    static vector(p1, p2) {
        return new Punto(p2.getX() - p1.getX(), p2.getY() - p1.getY()); // Genera un vector entre dos puntos
    }

    static productoCruzado(p1, p2) {
        return (p1.getX() * p2.getY()) - (p1.getY() * p2.getX()); // Calcula el producto cruzado
    }

    static distancia(p1, p2) {
        return Math.sqrt(Math.pow(p2.getX() - p1.getX(), 2) + Math.pow(p2.getY() - p1.getY(), 2)); // Calcula la distancia entre dos puntos
    }

    static anguloPolar(punto, centro) {
        return Math.atan2(punto.getY() - centro.getY(), punto.getX() - centro.getX()); // Calcula el ángulo polar de un punto respecto a un centro
    }
}

function generarPuntosAleatorios(cantidad, ancho, alto) {
    let puntos = [];
    for (let i = 0; i < cantidad; i++) {
        let x = Math.floor(Math.random() * ancho); // Genera una coordenada x aleatoria
        let y = Math.floor(Math.random() * alto); // Genera una coordenada y aleatoria
        puntos.push(new Punto(x, y)); // Crea un nuevo punto y lo agrega a la lista
    }
    return puntos; // Devuelve la lista de puntos generados
}

function calcularCentroide(puntos) {
    let sumX = 0, sumY = 0;
    puntos.forEach(punto => {
        sumX += punto.getX(); // Suma todas las coordenadas x
        sumY += punto.getY(); // Suma todas las coordenadas y
    });
    return new Punto(sumX / puntos.length, sumY / puntos.length); // Devuelve el centroide como un nuevo punto
}

function ordenarPuntos(puntos) {
    const centroide = calcularCentroide(puntos); // Calcula el centroide
    return puntos.sort((a, b) => Punto.anguloPolar(a, centroide) - Punto.anguloPolar(b, centroide)); // Ordena los puntos por su ángulo polar
}

function dibujarPoligono(puntos) {
    const svgCanvas = document.getElementById('svgCanvas'); // Obtiene el elemento SVG
    
    let poligono = document.createElementNS("http://www.w3.org/2000/svg", "polygon"); // Crea un nuevo elemento de polígono
    let puntosPoligono = puntos.map(punto => `${punto.getX()},${punto.getY()}`).join(" "); // Crea una cadena con las coordenadas de los puntos
    
    poligono.setAttribute("points", puntosPoligono); // Establece los puntos del polígono
    poligono.setAttribute("fill", "none"); // Sin relleno
    poligono.setAttribute("stroke", "black"); // Color del borde
    
    svgCanvas.appendChild(poligono); // Agrega el polígono al canvas SVG

    const tipoPoligono = esConvexo(puntos) ? "Convexo" : "Cóncavo"; // Determina si el polígono es convexo o cóncavo
    
    document.getElementById('tipoPoligono').innerText = `El polígono es: ${tipoPoligono}`; // Muestra el tipo de polígono en la interfaz
}

function esConvexo(puntos) {
    let signo = null; // Almacena el signo del producto cruzado
    let esConvexo = true; // Inicializa la variable que indica si es convexo
    const numPuntos = puntos.length; // Número de puntos en el polígono

    for (let i = 0; i < numPuntos; i++) {
        const p0 = puntos[i]; // Punto actual
        const p1 = puntos[(i + 1) % numPuntos]; // Siguiente punto
        const p2 = puntos[(i + 2) % numPuntos]; // Punto siguiente al siguiente

        const vector1 = Punto.vector(p0, p1); // Vector del punto actual al siguiente
        const vector2 = Punto.vector(p1, p2); // Vector del siguiente al siguiente siguiente
        const cruz = Punto.productoCruzado(vector1, vector2); // Producto cruzado

        if (cruz !== 0) {
            if (signo === null) {
                signo = Math.sign(cruz); // Establece el signo inicial
            } else if (signo !== Math.sign(cruz)) {
                esConvexo = false; // Cambia a cóncavo si el signo cambia
                break;
            }
        }
    }

    return esConvexo; // Devuelve si el polígono es convexo
}

// Generar puntos aleatorios, ordenarlos y dibujar el polígono
const puntosAleatorios = generarPuntosAleatorios(5, 500, 500); // Genera 5 puntos aleatorios
const puntosOrdenados = ordenarPuntos(puntosAleatorios); // Ordena los puntos
dibujarPoligono(puntosOrdenados); // Dibuja el polígono