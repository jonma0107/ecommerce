const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('.listado-productos');
let carritoCompras = [];

const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')


//**********************  REGISTRO DE FUNCIONES ******************* /

function registrarEventListeners() {
  listaProductos.addEventListener('click', agregarProducto); // AGREGAR AL CARRITO
  carrito.addEventListener('click', eliminarProducto); // ELIMINAR DEL CARRITO
  vaciarCarrito.addEventListener('click', () => {
    carritoCompras = []; // VACIAR CARRITO

    carritoHTML();
  });

  document.addEventListener('DOMContentLoaded', () => {
    carritoCompras = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoHTML();
  });

};

// ***********************************  FUNCIONES  *********************************

function agregarProducto(e) {
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    const productoSeleccionado = e.target.parentElement.parentElement;

    leerDatosProducto(productoSeleccionado);

  };

}; // fin función agregarProducto

// ********************* FUNCION ELIMINA PRODUCTO DEL CARRITO *************************

function eliminarProducto(e) {
  if (e.target.classList.contains('borrar-producto')) {
    const productoId = e.target.getAttribute('data-id');
    carritoCompras = carritoCompras.filter(producto => producto.id !== productoId);
    carritoHTML();

  };
}; // fin función eliminarProducto

// **************************  FUNCION LEER DATOS DEL PRODCUTO  ****************************

// Lee el contenido del HTML al que le dimos click, y extrae la información del curso
function leerDatosProducto(producto) {

  // Crear objeto con el contenido del curso seleccionado
  const objetoProducto = {
    imagen: producto.querySelector('img').src,
    titulo: producto.querySelector('h3').textContent,
    precio: producto.querySelector('.precio').textContent,
    id: producto.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  };

  // ******************** REVISA SI UN ELEMENTO YA EXISTE EN EL CARRITO *********************
  // ACTUALIZAR UN PRODUCTO QUE YA EXISTE
  const existe = carritoCompras.some(producto => producto.id === objetoProducto.id);
  if (existe) {
    const productos = carritoCompras.map(producto => {
      if (producto.id === objetoProducto.id) {
        producto.cantidad++;
        return producto; // Retorna el Objeto actualizado
      } else {
        return producto;
      }
    });
    carritoCompras = [...productos];
  } else {
    // Agrega Objetos al arreglo de carritoCompras
    carritoCompras = [...carritoCompras, objetoProducto];

  };

  carritoHTML();
}; // fin función leerDatosProducto

// ************************ MUESTRA EL CARRITO DE COMPRAS EN EL HTML **************************
function carritoHTML() {
  // Limpiar el HTML
  limpiarHTML();

  // Recorre el carritoCompras y genera el HTML
  carritoCompras.forEach(producto => {
    const { imagen, titulo, precio, cantidad, id } = producto;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${imagen}"/>
      </td>
      <td>
        ${titulo}
      </td>
      <td>
        ${precio}
      </td>
      <td>
        ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-producto" data-id="${id}"> X </a>
      </td>
    `;

    // Agrega el HTML del carrito al tbody
    contenedorCarrito.appendChild(row);
  });

  sincronizarLocalStorage();

}; // fin función carritoHTML

//*****************************************************************************************

// Para limpiar el HTML se debe hacer la siguiente función
// elimina productos del tbody
function limpiarHTML() {
  //forma lenta :
  // contenedorCarrito.innerHTML = '';
  //forma rápida :
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);

  };

};

//*****************************************************************************************

function sincronizarLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carritoCompras));
}

//*****************************************************************************************

registrarEventListeners();
