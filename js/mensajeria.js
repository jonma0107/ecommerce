// VARIABLES
const btnEnviar = document.querySelector('.enviar');
const form = document.querySelector('.text-center');
// Variables para campos
const nombre = document.querySelector('#nombre');
const asunto = document.querySelector('#asunto');
const email = document.querySelector('#email');
const tel = document.querySelector('#tel');
const date = document.querySelector('#date');
const mns = document.querySelector('#mns');


registroEventos();

function registroEventos() {
  document.addEventListener('DOMContentLoaded', iniciarApp)

  // campos del formulario
  nombre.addEventListener('blur', validarFormulario);
  asunto.addEventListener('blur', validarFormulario);
  email.addEventListener('blur', validarFormulario);
  tel.addEventListener('blur', validarFormulario);
  date.addEventListener('blur', validarFormulario);
  mns.addEventListener('blur', validarFormulario);

}

/***********************************  FUNCIONES  *****************************/

function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Valida el formulario
function validarFormulario(e) {
  if (e.target.value.length > 0) {
    // Elimina párrafo de Error
    const error = document.querySelector('p.error');
    if (error) {
      error.remove();
    }
    e.target.style.borderColor = 'green'; // VERDE
  } else {
    // e.target.classList.add('border', 'border-red-500');
    e.target.style.borderColor = 'red'; // ROJO
    mostrarError('Todos los campos son obligatorios');
  }

  /******************************************* Validar email *********************************/
  if (e.target.type === 'email') {

    const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // EXPRESIÓN REGULAR

    if (er.test(e.target.value)) {
      const error = document.querySelector('p.error')
      if (error) {
        error.remove();
      }
      e.target.style.borderColor = 'green';
    } else {
      e.target.style.borderColor = 'red';
      mostrarError('El email no es válido');
    }


  }
} // FIN FUNCIÓN DE VALIDACIÓN DE FORMULARIO

/***********************************************************************************************/

function mostrarError(mensaje) {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = mensaje;
  mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'error');

  const errores = document.querySelectorAll('.error');
  if (errores.length === 0) {
    form.appendChild(mensajeError);

  }


}

