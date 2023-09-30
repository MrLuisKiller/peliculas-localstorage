let peliculas = JSON.parse(localStorage.getItem('peliculas')) || []

const peliculaInfo = {
    titulo: document.getElementById('inputTitulo'),
    estreno: document.getElementById('inputEstreno'),
    genero: document.getElementById('inputGenero'),
    imagen: document.getElementById('inputImagen'),
    sinopsis: document.getElementById('inputSinopsis')
}

const btnAgregar = document.getElementById('btnAgregar')
const btnBorrarTodo = document.getElementById('btnBorrarTodo')
const divPeliculas = document.getElementById('divPeliculas')

let indexEditar = null

const divPelicula = (pelicula, index) => `
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${pelicula.imagen ? pelicula.imagen : './assets/images/not-imagen.png'}" class="img-fluid rounded-start" alt="pelicula">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${pelicula.titulo}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${pelicula.estreno} - ${pelicula.genero}</h6>
                    <p class="card-text">${pelicula.sinopsis}</p>
                    <div class="row mb-2">
                        <div class="col">
                            <button class="btn btn-warning w-100 mt-2" type="button" id="editar-${index}" onclick="editarPelicula(${index})">Editar</button>
                        </div>
                        <div class="col">
                            <button class="btn btn-danger w-100 mt-2" type="button" id="eliminar-${index}" onclick="eliminarPelicula(${index})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

const divSinPeliculas = () => `
    <div class="alert alert-info" role="alert" id="alertSinPeliculas">
        No hay peliculas agregadas
    </div>`

/* class Pelicula {
    constructor(pelicula) {
        this.titulo = pelicula.titulo
        this.estreno = pelicula.estreno
        this.genero = pelicula.genero
        this.imagen = pelicula.imagen
        this.sinopsis = pelicula.sinopsis
    }
} */

const mostrarPeliculas = () => {
    if (peliculas.length === 0)
        divPeliculas.innerHTML = divSinPeliculas()
    else
        divPeliculas.innerHTML = peliculas.map((pelicula, index) => divPelicula(pelicula, index)).join('')
}

mostrarPeliculas()

const limpiar = () => {
    indexEditar = null
    peliculaInfo.titulo.value = ''
    peliculaInfo.estreno.value = ''
    peliculaInfo.genero.value = ''
    peliculaInfo.imagen.value = ''
    peliculaInfo.sinopsis.value = ''
}


btnAgregar.addEventListener('click', () => {
    let pelicula = {
        titulo: peliculaInfo.titulo.value,
        estreno: peliculaInfo.estreno.value,
        genero: peliculaInfo.genero.value,
        imagen: peliculaInfo.imagen.value,
        sinopsis: peliculaInfo.sinopsis.value,
    }
    // let nuevaPelicula = new Pelicula(pelicula)
    if (indexEditar === null)
        peliculas.push(pelicula)
    else
        peliculas[indexEditar] = pelicula
    localStorage.setItem('peliculas', JSON.stringify(peliculas))
    limpiar()
    mostrarPeliculas()
})
btnBorrarTodo.addEventListener('click', () => limpiar())

const editarPelicula = index => {
    indexEditar = index
    let pelicula = peliculas[index]
    peliculaInfo.titulo.value = pelicula.titulo
    peliculaInfo.estreno.value = pelicula.estreno
    peliculaInfo.genero.value = pelicula.genero
    peliculaInfo.imagen.value = pelicula.imagen
    peliculaInfo.sinopsis.value = pelicula.sinopsis
}

const eliminarPelicula = index => {
    peliculas.splice(index, 1)
    localStorage.setItem('peliculas', JSON.stringify(peliculas))
    mostrarPeliculas()
}