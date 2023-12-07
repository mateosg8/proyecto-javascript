const Producto = function (nombre,precio,stock){
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
}

let producto1 = new Producto ("pera","1000","30")
let producto2 = new Producto ("manzana","2000","35")
let producto3 = new Producto ("banana","3000","15")
let producto4 = new Producto ("coco","3500","6")
let producto5 = new Producto ("sandia","2300","10")
let producto6 = new Producto ("naranja","1500","22")
let producto7 = new Producto ("mandarina","1000","30")
let producto8 = new Producto ("kiwi","4000","45")

let lista = [producto1,producto2,producto3,producto4,producto5,producto6,producto7,producto8]

if(localStorage.getItem("productos")){
    lista = JSON.parse(localStorage.getItem("productos"))
}else{
    lista = lista
}

function filtrarProductos(){
    const body = document.querySelector("body")  
    const input = document.getElementById("filtrarP").value 
    const palabraClave = input.trim().toUpperCase()
    const resultado = lista.filter(  (producto)=> producto.nombre.toUpperCase().includes(palabraClave))
    if(resultado.length > 0){
        const container = document.createElement("div")
        resultado.forEach((producto)=>{
            const card = document.createElement("div")
        const nombre = document.createElement("h3")
        nombre.textContent = producto.nombre
        card.appendChild(nombre)
        const precio = document.createElement("p")
        precio.textContent = producto.precio
        card.appendChild(precio)
        const stock = document.createElement("p")
        stock.textContent = producto.stock
        card.appendChild(stock) 
        container.appendChild(card)
        })
        body.appendChild(container)
    }else{
        alert("no esta ese producto")
    }
}

const filtrarBtn = document.getElementById("filtrar")
filtrarBtn.addEventListener("click",filtrarProductos)

function agregarProducto(){
    const form = document.createElement("form")
    form.innerHTML=`
    <label for="nombre-input">Nombre:</label>
    <input id= "nombre-input" type="text" step="0.01" required>
    
    <label for="precio-input">Precio:</label>
    <input id= "precio-input" type="number" step="0.01" required>

    <label for="stock-input">Stock:</label>
    <input id= "stock-input" type="number" step="0.01" required>

    <button type="submit">Agregar</button>
    `
    form.addEventListener("submit", function (e){ 
        e.preventDefault();

        const nombreInput = document.getElementById("nombre-input").value.trim()
        const precioInput = parseFloat(document.getElementById("precio-input").value)
        const stockInput = parseInt(document.getElementById("stock-input").value)

        if(isNaN(precioInput) || isNaN(stockInput) || nombreInput === ""){
            alert("ingresa valores validos.")
            return
        }

        const producto = new Producto (nombreInput, precioInput, stockInput)

        if (lista.some( (elemento)=> elemento.nombre === producto.nombre)){ 
            alert("el producto ya existe")
            return
        }

        lista.push(producto) 

        localStorage.setItem("productos", JSON.stringify(lista))
        alert(`se agrego el producto ${producto.nombre} a la lista`)  



        const container =  document.createElement("div")
        
        lista.forEach((producto)=>{
            const card = document.createElement("div")

            const nombre = document.createElement("h2")
        nombre.textContent = `nombre: ${producto.nombre}`
        card.appendChild(nombre)

        const precio = document.createElement("p")
        precio.textContent = `precio: ${producto.precio}`
        card.appendChild(precio)

        const stock = document.createElement("p")
        stock.textContent = `cantidad: ${producto.stock}`
        card.appendChild(stock)
        container.appendChild(card)
        })

        const body = document.querySelector("body")
        body.appendChild(container)

        form.reset()

    })

    const body = document.querySelector("body")
    body.appendChild(form)
}

const agregarBtn = document.getElementById("agregarProducto")
agregarBtn.addEventListener("click",agregarProducto)