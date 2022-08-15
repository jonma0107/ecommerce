const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('.listado-productos');
let carritoCompras = [];

const contenedorCarrito = document.querySelector('#lista-carrito tbody')

function registrarEventListeners() {
  listaProductos.addEventListener('click', agregarProducto)
}

function agregarProducto(e) {
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    const productoSeleccionado = e.target.parentElement.parentElement;

    leerDatosProducto(productoSeleccionado);

  }

}

// Lee el contenido del HTML al que le dimos click, y extrae la información del curso
function leerDatosProducto(curso) {
  // console.log(curso);

  // Crear objeto con el contenido del curso seleccionado
  const objetoProducto = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h3').textContent,
    precio: curso.querySelector('.precio').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }
  // Agrega Objetos al arreglo de carritoCompras
  carritoCompras = [...carritoCompras, objetoProducto];
  console.log(carritoCompras);

  carritoHTML();
}


// MOSTRAR LOS PRODUCTOS DEL CARRITO EN HTML
function carritoHTML() {
  // Limpiar el HTML
  limpiarHTML();

  // Recorre el carritoCompras y genera el HTML
  carritoCompras.forEach(producto => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        ${producto.titulo}
      </td>
    `;

    // Agrega el HTML del carrito al tbody
    contenedorCarrito.appendChild(row);
  })

}

// Para limpiar el HTML se debe hacer la siguiente función
// elimina cursos del tbody
function limpiarHTML() {
  //forma lenta
  // contenedorCarrito.innerHTML = '';
  //forma rápida
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)

  }

}


registrarEventListeners();
