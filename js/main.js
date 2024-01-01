let productos = []

const randomUserAPI = 'https://randomuser.me/api/';


fetch(randomUserAPI)
  .then(response => response.json())
  .then(data => {
    // Aquí puedes acceder a los datos del usuario aleatorio, por ejemplo:
    const usuario = data.results[0];
    const nombre = `${usuario.name.first} ${usuario.name.last}`;
    const correo = usuario.email;
    console.log('Nombre:', nombre);
    console.log('Correo electrónico:', correo);

    // Puedes ajustar esta lógica según los datos específicos que necesitas de la API de Random User.
  })
  .catch(error => {
    console.error('Error al obtener datos del usuario aleatorio:', error);
  });

  // ... (código existente)

// Función para obtener datos de usuario aleatorio desde la API de Random User
function obtenerDatosUsuarioAleatorio() {
    fetch(randomUserAPI)
      .then(response => response.json())
     // ...

// Dentro de la función obtenerDatosUsuarioAleatorio
.then(data => {
    const usuario = data.results[0];
    const nombre = `${usuario.name.first} ${usuario.name.last}`;
    const correo = usuario.email;
    console.log('Nombre:', nombre);
    console.log('Correo electrónico:', correo);

    // Actualiza los elementos en el HTML con la información del usuario
    document.getElementById('nombre-usuario').textContent = nombre;
    document.getElementById('correo-usuario').textContent = correo;
})
// ...

      .catch(error => {
        console.error('Error al obtener datos del usuario aleatorio:', error);
      });
  }
  
  // Llamamos a la función para obtener datos de usuario aleatorio cuando se cargue la página
  document.addEventListener('DOMContentLoaded', obtenerDatosUsuarioAleatorio);
  
  // ... (código existente)
  



fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
const inputBusqueda = document.querySelector("#input-busqueda");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <p class="producto-ubicacion">${producto.ubicacion}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

inputBusqueda.addEventListener("input", () => {
    const terminoBusqueda = inputBusqueda.value.toLowerCase();
    const productosFiltrados = productos.filter(producto =>
        producto.titulo.toLowerCase().includes(terminoBusqueda) ||
        producto.ubicacion.toLowerCase().includes(terminoBusqueda)
    );
    cargarProductos(productosFiltrados);
});

document.addEventListener('DOMContentLoaded', function () {
    // Obtén la fecha y hora actual en la zona horaria de Argentina (America/Argentina/Buenos_Aires)
    const fechaArgentina = luxon.DateTime.now().setZone('America/Argentina/Buenos_Aires');

    // Muestra la fecha en el elemento con id "fecha-argentina" en el footer
    document.getElementById('fecha-argentina').innerText = 'Fecha y hora en Argentina: ' + fechaArgentina.toLocaleString(luxon.DateTime.DATETIME_FULL);
});