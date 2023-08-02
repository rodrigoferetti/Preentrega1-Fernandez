class Prenda {
    constructor(prenda, talle, color) {
        this.prenda = prenda;
        this.talle = talle;
        this.color = color;
    }
}

const articulos = [
    { nombre: 'Remera', precio: 400 },
    { nombre: 'Pantalón', precio: 650 },
    { nombre: 'Calzado', precio: 800 },
    { nombre: 'Campera', precio: 900 }
];

let precioTotalSinDescuento = 0;
let prendasSeleccionadas = [];

const opcionesArticulos = document.getElementById('opcionesArticulos');
const prendaForm = document.getElementById('prendaForm');
const prendaContainer = document.getElementById('prendaContainer');
const filtrarBtn = document.getElementById('filtrarBtn');
const finalizarCompraBtn = document.getElementById('finalizarCompraBtn');

articulos.forEach(({ nombre, precio }) => {
    const opcion = document.createElement('p');
    opcion.textContent = `${nombre} - $${precio}`;
    opcionesArticulos.appendChild(opcion);
});

prendaForm.addEventListener('submit', event => {
    event.preventDefault();

    const prendaInput = document.getElementById('prenda');
    const talleInput = document.getElementById('talle');
    const colorInput = document.getElementById('color');

    const prenda = prendaInput.value.toLowerCase(); 
    const talle = talleInput.value;
    const color = colorInput.value;

    const articuloExistente = articulos.find(item => item.nombre.toLowerCase() === prenda);

    if (articuloExistente) {
        prendasSeleccionadas.push(new Prenda(articuloExistente.nombre, talle, color));
    } else {
        Swal.fire({
            title: 'Prenda no disponible',
            text: 'La prenda seleccionada no está disponible. Por favor elige una prenda de la lista.',
            icon: 'error'
        });
    }

    prendaInput.value = '';
    talleInput.value = '';
    colorInput.value = '';

    mostrarPrendasSeleccionadas();
});

filtrarBtn.addEventListener('click', () => {
    const talleInput = prompt("Ingrese el talle para filtrar:") || ""; 
    filtrarPorTalle(talleInput);
});

function guardarPrendasSeleccionadas() {
    localStorage.setItem('prendas', JSON.stringify(prendasSeleccionadas));
}

function cargarPrendasSeleccionadas() {
    const prendasGuardadas = localStorage.getItem('prendas');
    if (prendasGuardadas) {
        prendasSeleccionadas = JSON.parse(prendasGuardadas);
    }
}

function calcularPrecioFinal() {
    precioTotalSinDescuento = 0;
    prendasSeleccionadas.forEach(prenda => {
        const articuloExistente = articulos.find(item => item.nombre.toLowerCase() === prenda.prenda.toLowerCase());
        if (articuloExistente) {
            precioTotalSinDescuento += articuloExistente.precio;
        }
    });

    let precioFinal = precioTotalSinDescuento;
    if (precioTotalSinDescuento > 1000) {
        const descuento = precioTotalSinDescuento * 0.2;
        precioFinal = precioTotalSinDescuento - descuento;
    }

    return precioFinal;
}

function mostrarPrendasSeleccionadas() {
    prendaContainer.innerHTML = "Prendas seleccionadas:<br>";

    prendasSeleccionadas.forEach((prenda, index) => {
        const { talle, color } = prenda;
        const prendaElement = document.createElement('p');
        prendaElement.textContent = `Prenda ${index + 1}: Talle: ${talle}, Color: ${color}`;
        prendaContainer.appendChild(prendaElement);
    });

    const precioFinal = calcularPrecioFinal();
    const precioElement = document.createElement('p');
    precioElement.textContent = `Precio total: $${precioFinal.toFixed(2)}`;
    prendaContainer.appendChild(precioElement);
}

function filtrarPorTalle(talle) {
    const prendasFiltradas = prendasSeleccionadas.filter(prenda => prenda.talle.toLowerCase() === talle.toLowerCase());

    prendasFiltradas.length > 0
        ? Swal.fire({
            title: `Prendas filtradas por talle ${talle}:`,
            text: prendasFiltradas.map((prenda, i) => `Prenda ${i + 1}: Talle: ${prenda.talle}, Color: ${prenda.color}`).join('\n'),
            icon: 'info'
        })
        : Swal.fire({
            title: 'Sin resultados',
            text: 'No hay prendas con el talle especificado.',
            icon: 'warning'
        });
}

cargarPrendasSeleccionadas();
mostrarPrendasSeleccionadas();

finalizarCompraBtn.addEventListener('click', () => {
    Swal.fire({
        title: '¡Gracias por tu Compra!',
        text: 'Tu compra está en camino',
        icon: 'success'
    });
    console.log('Prendas seleccionadas:');
    prendasSeleccionadas.forEach((prenda, index) => {
        console.log(`Prenda ${index + 1}: ${JSON.stringify(prenda)}`);
    });
    const precioFinal = calcularPrecioFinal();
    console.log('Precio total: $' + precioFinal.toFixed(2));
    prendasSeleccionadas = [];
    guardarPrendasSeleccionadas();
    mostrarPrendasSeleccionadas();
});