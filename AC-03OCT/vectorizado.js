class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }
}

// Genera puntos aleatorios
function generarPuntosAleatorios(n, maxX, maxY) {
    const puntos = [];
    for (let i = 0; i < n; i++) {
        const x = Math.floor(Math.random() * maxX);
        const y = Math.floor(Math.random() * maxY);
        puntos.push(new Punto(x, y));
    }
    return puntos;
}

// Calcula el centroide
function calcularCentroide(puntos) {
    let xSum = 0, ySum = 0;
    puntos.forEach(punto => {
        xSum += punto.getX();
        ySum += punto.getY();
    });
    return new Punto(xSum / puntos.length, ySum / puntos.length);
}

// Ordena puntos alrededor del centroide
function ordenarPuntos(puntos) {
    const centroide = calcularCentroide(puntos);
    return puntos.sort((a, b) => {
        const angleA = Math.atan2(a.getY() - centroide.getY(), a.getX() - centroide.getX());
        const angleB = Math.atan2(b.getY() - centroide.getY(), b.getX() - centroide.getX());
        return angleA - angleB;
    });
}

// Dibuja el polígono en SVG
function dibujarPoligono(svg, puntos) {
    let pathData = `M ${puntos[0].getX()} ${puntos[0].getY()} `;
    for (let i = 1; i < puntos.length; i++) {
        pathData += `L ${puntos[i].getX()} ${puntos[i].getY()} `;
    }
    pathData += 'Z'; // Cierra el polígono

    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "path");
    polygon.setAttribute("d", pathData);
    polygon.setAttribute("fill", "rgba(0, 150, 255, 0.5)");
    polygon.setAttribute("stroke", "black");
    svg.appendChild(polygon);
}

// Determina si el polígono es cóncavo o convexo
function esConvexo(puntos) {
    let signo = 0;
    const n = puntos.length;

    for (let i = 0; i < n; i++) {
        const dx1 = puntos[(i + 2) % n].getX() - puntos[(i + 1) % n].getX();
        const dy1 = puntos[(i + 2) % n].getY() - puntos[(i + 1) % n].getY();
        const dx2 = puntos[i].getX() - puntos[(i + 1) % n].getX();
        const dy2 = puntos[i].getY() - puntos[(i + 1) % n].getY();
        const cruz = dx1 * dy2 - dy1 * dx2;

        if (cruz !== 0) {
            const nuevoSigno = cruz > 0 ? 1 : -1;
            if (signo === 0) {
                signo = nuevoSigno;
            } else if (signo !== nuevoSigno) {
                return false; // Cóncavo
            }
        }
    }
    return true; // Convexo
}

const svg = document.getElementById('svg');

const puntos = generarPuntosAleatorios(5, svg.width.baseVal.value, svg.height.baseVal.value);
const puntosOrdenados = ordenarPuntos(puntos);
dibujarPoligono(svg, puntosOrdenados);

const tipo = esConvexo(puntosOrdenados) ? "Convexo" : "Cóncavo";
console.log(`El polígono es: ${tipo}`);