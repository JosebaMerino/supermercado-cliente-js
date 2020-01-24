console.log("Hola index");

let inputEL = document.getElementById('idProducto');
let botonEL = document.getElementById('boton');
let resultadoEL = document.getElementById('resultado');

botonEL.addEventListener("click", () => {
    console.debug('click boton');

    let input = inputEL.value;

    if(input === "") {
        resultadoEL.innerHTML = "Escribe algo por favor";

    } else {
        // Llamada AJAX
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            //console.debug("state: " + xhr.readyState)
            //console.debug("status: " + xhr.status)
            //console.debug("responseText: " + xhr.responseText)

            if(xhr.readyState === 4) {
                let producto = JSON.parse(xhr.responseText);
                console.log("producto: " + producto);
                resultadoEL.innerHTML = producto;
            }
        }

        xhr.open('Get', `http://localhost:8080/supermerkado-rest/producto/${input}`)
        xhr.send(); // CUIDADO ES ASINCRONO!!

        
    }



})