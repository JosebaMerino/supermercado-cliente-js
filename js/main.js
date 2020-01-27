console.log("Hola index");

let inputEL = document.getElementById('idProducto');
let botonEL = document.getElementById('boton');

let imagenEL = document.getElementById('imagen');
let nombreEL = document.getElementById('nombre');
let descripcionEL = document.getElementById('descripcion');

let productoEL = document.getElementById('producto');

let listaProductosEL = document.getElementById('lista-productos');



window.onload = () => {
    // Ejecuta las cosas cuando el documento este cargado
    console.log('DOM cargado correctamente');
    cargarDatos();
}

function cargarDatos() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                let productos = JSON.parse(xhr.responseText);
                for(let producto of productos) {
                    let liEL = document.createElement('li');
                    liEL.className = 'list-group-item spinner';

                    let nombreEL = document.createTextNode(producto.nombre);
                    liEL.appendChild(nombreEL);

                    liEL.addEventListener("click", () => {
                        cargarProducto(producto.id);
                    });

                    listaProductosEL.appendChild(liEL);
                }
            } else {
                listaProductosEL.innerHTML = xhr.status;
            }
        }
    }
    xhr.open('Get', `http://localhost:8080/supermerkado-rest/producto/`)
    xhr.send(); // CUIDADO ES ASINCRONO!!
}


function cargarProducto(id) {
    console.debug('click boton');

    if(id === "") {

    } else {
        // Llamada AJAX
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            //console.debug("state: " + xhr.readyState)
            //console.debug("status: " + xhr.status)
            //console.debug("responseText: " + xhr.responseText)

            if(xhr.readyState === 4) {
                if(xhr.status === 200){
                    let producto = JSON.parse(xhr.responseText);
                    console.log("producto: " + producto);
                    imagenEL.src = producto.imagen;
                    imagenEL.className = 'imagen';
                    nombreEL.innerHTML = producto.nombre;
                    descripcionEL.innerHTML = producto.descripcion;
                    productoEL.className = productoEL.className.replace( /(?:^|\s)d-none(?!\S)/g , '' )
                } else if(xhr.status === 404) {

                }
            }
        }

        xhr.open('Get', `http://localhost:8080/supermerkado-rest/producto/${id}`)
        xhr.send(); // CUIDADO ES ASINCRONO!!
    }


}

botonEL.addEventListener("click", () => {
    let input = inputEL.value;
    cargarProducto(input);
});