function actualizarCampos() {
    const sistema = document.getElementById('coordenadas').value;
    const inputsDiv = document.getElementById('coordenadas-inputs');
    inputsDiv.innerHTML = '';

    if (sistema === 'cartesianas') {
        inputsDiv.innerHTML += `
            <label for="x">Coordenada X:</label>
            <input type="number" id="x" name="x">
            <br><br>
            <label for="y">Coordenada Y:</label>
            <input type="number" id="y" name="y">
        `;
    } else if (sistema === 'polares') {
        inputsDiv.innerHTML += `
            <label for="radio">Radio:</label>
            <input type="number" id="radio" name="radio">
            <br><br>
            <label for="angulo">Ángulo (en grados):</label>
            <input type="number" id="angulo" name="angulo">
        `;
    }
}

function dibujar() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const figura = document.getElementById('figura').value;
    const sistema = document.getElementById('coordenadas').value;
    let x, y;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (sistema === 'cartesianas') {
        x = parseFloat(document.getElementById('x').value);
        y = parseFloat(document.getElementById('y').value);
    } else if (sistema === 'polares') {
        const radio = parseFloat(document.getElementById('radio').value);
        const angulo = parseFloat(document.getElementById('angulo').value) * Math.PI / 180;
        x = radio * Math.cos(angulo);
        y = radio * Math.sin(angulo);
    }

    ctx.beginPath();

    switch (figura) {
        case 'circulo':
            ctx.arc(x + 200, y + 200, 50, 0, 2 * Math.PI);
            break;
        case 'cuadrado':
            ctx.rect(x + 150, y + 150, 100, 100);
            break;
        case 'triangulo':
            ctx.moveTo(x + 200, y + 150);
            ctx.lineTo(x + 150, y + 250);
            ctx.lineTo(x + 250, y + 250);
            ctx.closePath();
            break;
    }

    ctx.stroke();
}

document.getElementById('coordenadas').addEventListener('change', actualizarCampos);
actualizarCampos(); // Inicializa los campos según el sistema de coordenadas por defecto
