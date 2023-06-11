const articulos = [
  { nombre: 'Remera', precio: 400 },
  { nombre: 'Pantalon', precio: 650 },
  { nombre: 'Calzado', precio: 800 },
  { nombre: 'Campera', precio: 900 }
];

let precioTotalSinDescuento = 0;

for (let i = 0; i < articulos.length; i++) {
  const entrada = Number(prompt(`Coloca cuántos ${articulos[i].nombre}s deseas`));
  const cantidad = parseInt(entrada);
  const precioArticulo = cantidad * articulos[i].precio;
  precioTotalSinDescuento += precioArticulo;
  console.log(`Precio final de las ${articulos[i].nombre}s: ${precioArticulo}`);
}

console.log(`El precio total sin descuento es: ${precioTotalSinDescuento}`);

if (precioTotalSinDescuento > 1000){
const numDescuento = 0.2;
function descuento (total, porcentaje){
    let salidaDescuento = total * porcentaje;
    return salidaDescuento;
}

let descuentoFInal = descuento(precioTotalSinDescuento, numDescuento);
console.log(`Obtienes un descuento de: ${descuentoFInal}`);
let precioFInal = precioTotalSinDescuento - descuentoFInal;
console.log(`El precio total es: ${precioFInal}`);
}
else {
    console.log(`El precio total es: ${precioTotalSinDescuento} `)
}