const articulos = [
  { nombre: 'Remera', precio: 400 },
  { nombre: 'Pantalon', precio: 650 },
  { nombre: 'Calzado', precio: 800 },
  { nombre: 'Campera', precio: 900 }
];

let precioTotalSinDescuento = 0;
let prendasSeleccionadas = [];

const opcionesArticulos = document.getElementById('opcionesArticulos');
const prendaForm = document.getElementById('prendaForm');
const prendaContainer = document.getElementById('prendaContainer');
const filtrarBtn = document.getElementById('filtrarBtn');

// Mostrar opciones de artículos disponibles
for (let i = 0; i < articulos.length; i++) {
  const opcion = document.createElement('p');
  opcion.textContent = `${articulos[i].nombre} - $${articulos[i].precio}`;
  opcionesArticulos.appendChild(opcion);
}

prendaForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const prendaInput = document.getElementById('prenda');
  const talleInput = document.getElementById('talle');
  const colorInput = document.getElementById('color');

  const prenda = prendaInput.value;
  const talle = talleInput.value;
  const color = colorInput.value;

  const articuloExistente = articulos.find(item => item.nombre.toLowerCase() === prenda.toLowerCase());

  if (articuloExistente) {
    const nuevaPrenda = new Prenda(prenda, talle, color);
    prendasSeleccionadas.push(nuevaPrenda);
    guardarPrendasSeleccionadas();
    mostrarPrendasSeleccionadas();
  } else {
    alert('La prenda seleccionada no está disponible. Por favor elige una prenda de la lista.');
  }

  prendaInput.value = '';
  talleInput.value = '';
  colorInput.value = '';
});

filtrarBtn.addEventListener('click', function() {
  const talleInput = prompt("Ingrese el talle para filtrar:");
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

function mostrarPrendasSeleccionadas() {
  prendaContainer.innerHTML = "Prendas seleccionadas:<br>";

  for (let i = 0; i < prendasSeleccionadas.length; i++) {
    const prenda = prendasSeleccionadas[i];
    const prendaElement = document.createElement('p');
    prendaElement.textContent = `Prenda ${i + 1}: Talle: ${prenda.talle}, Color: ${prenda.color}`;
    prendaContainer.appendChild(prendaElement);
  }
}

function Prenda(prenda, talle, color) {
  this.prenda = prenda;
  this.talle = talle;
  this.color = color;
}

function filtrarPorTalle(talle) {
  const prendasFiltradas = prendasSeleccionadas.filter((prenda) => prenda.talle.toLowerCase() === talle.toLowerCase());
  console.log(`Prendas filtradas por talle ${talle}:`);
  for (let i = 0; i < prendasFiltradas.length; i++) {
    const prenda = prendasFiltradas[i];
    console.log(`Prenda ${i + 1}: Talle: ${prenda.talle}, Color: ${prenda.color}`);
  }
}

cargarPrendasSeleccionadas();
mostrarPrendasSeleccionadas();