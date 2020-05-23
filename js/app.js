const listaCursos = document.querySelector("#lista-cursos");
const carrito = document.querySelector("#carrito");
const tablaCarritos = document.querySelector("#lista-carrito tbody");
const botonVaciar = document.querySelector("#vaciar-carrito");
cargarEventListeners();

function cargarEventListeners() {
  listaCursos.addEventListener("click", comprarCurso);
  carrito.addEventListener("click", eliminarCurso);
  botonVaciar.addEventListener("click", vaciarCarrito);

  document.addEventListener("DOMContentLoaded", cargarLocalStorage);
}

function comprarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    leerDatosCurso(curso);
  }
}

function leerDatosCurso(curso) {
  const info = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
  };

  insertarCarrito(info);
}

function insertarCarrito(curso) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td> 
        <img src = "${curso.imagen}" width ="100"/>
    </td>
    <td> ${curso.titulo} </td>
    <td>${curso.precio} </td>
    <td>
        <a href= '#' class = "borrar-curso" data-id ="${curso.id}">X</a> 
    </td>
    `;
  tablaCarritos.appendChild(row);
  agregarLS(curso);
}

function eliminarCurso(e) {
  e.preventDefault();

  let curso, cursoId;
  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector("a").getAttribute("data-id");
  }
  eliminarCursoLS(cursoId);
}

function vaciarCarrito() {
  //forma lenta y pelada
  //tablaCarritos.innerHTML = "";

  while (tablaCarritos.firstChild) {
    tablaCarritos.removeChild(tablaCarritos.firstChild);
  }
  vaciarLS();
  return false;
}

function agregarLS(curso) {
  let cursos;
  cursos = obtenerCursosLS();
  cursos.push(curso);
  localStorage.setItem("cursos", JSON.stringify(cursos));
  console.log(cursos);
}

function obtenerCursosLS() {
  let cursosLS;

  if (localStorage.getItem("cursos") === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem("cursos"));
  }

  return cursosLS;
}

function cargarLocalStorage() {
  let cursos;

  cursos = obtenerCursosLS();

  cursos.forEach((curso) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td> 
              <img src = "${curso.imagen}" width ="100"/>
          </td>
          <td> ${curso.titulo} </td>
          <td>${curso.precio} </td>
          <td>
              <a href= '#' class = "borrar-curso" data-id ="${curso.id}">X</a> 
          </td>
          `;
    tablaCarritos.appendChild(row);
  });
}

function eliminarCursoLS(curso) {
  let cursosLS;
  cursosLS = obtenerCursosLS();
  cursosLS.forEach((cursoLS, index) => {
    //NO ENTENDI ESTA PARTE
    if (cursoLS.id === curso) {
      cursosLS.splice(index, 1);
    }
  });
  localStorage.setItem("cursos", JSON.stringify(cursosLS));
}

function vaciarLS() {
  localStorage.clear();
}
