const articulos = [
  { nombre: 'Remera', precio: 400 },
  { nombre: 'Pantalon', precio: 650 },
  { nombre: 'Calzado', precio: 800 },
  { nombre: 'Campera', precio: 900 }
];

let precioTotalSinDescuento = 0;
let prendasSeleccionadas = [];

for (let i = 0; i < articulos.length; i++) {
  const entrada = Number(prompt(`Coloca cuántos ${articulos[i].nombre}s deseas`));
  const cantidad = parseInt(entrada);
  const precioArticulo = cantidad * articulos[i].precio;
  precioTotalSinDescuento += precioArticulo;
  console.log(`Precio final de las ${articulos[i].nombre}s: ${precioArticulo}`);
  
  for (let j = 0; j < cantidad; j++) {
    const prenda = cargarPrenda();
    prendasSeleccionadas.push(prenda);
  }
}

console.log(`El precio total sin descuento es: ${precioTotalSinDescuento}`);

function aplicarDescuento(total) {
  if (total > 1000) {
    const porcentajeDescuento = 0.2;
    const descuentoFinal = total * porcentajeDescuento;
    console.log(`Obtienes un descuento de: ${descuentoFinal}`);
    return total - descuentoFinal;
  } else {
    return total;
  }
}

const precioFinal = aplicarDescuento(precioTotalSinDescuento);
console.log(`El precio total es: ${precioFinal}`);

let contador = 0;

function Prenda(talle, color) {
  this.talle = talle;
  this.color = color;
  this.ver = function() {
    console.log("Ver Prenda " + ++contador);
    console.log("Talle: " + this.talle + " Color: " + this.color);
  };
}

function cargarPrenda() {
  let talle = prompt("Ingrese talle de prenda");
  let color = prompt("Ingrese color de prenda");

  const prenda = new Prenda(talle, color);
  return prenda;
}

console.log("Prendas seleccionadas:");
for (let i = 0; i < prendasSeleccionadas.length; i++) {
  prendasSeleccionadas[i].ver();
}


function filtrarPorTalle(talle) {
  const prendasFiltradas = prendasSeleccionadas.filter((prenda) => prenda.talle.toLowerCase() === talle.toLowerCase());
  console.log(`Prendas filtradas por talle ${talle}:`);
  for (let i = 0; i < prendasFiltradas.length; i++) {
    prendasFiltradas[i].ver();
  }
}

filtrarPorTalle("M")