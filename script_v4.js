//api
const url = 'https://swapi.dev/api/people/';

///  script_v3 se consulta por personaje a la api.
///  script_v4 se consulta y se almacena en un array todos personajes (17).

let personajes = [];
//clase personaje
class Personaje{
  constructor(nombre, estatura, peso){
    this.nombre = nombre;
    this.estatura = estatura;
    this.peso = peso;
  }
}

let timeline_area = document.querySelector(".timeline_area");
timeline_area.style.display = "none";

// obtengo toda la data y muestro un preloader
async function getAllData() {
    try {
      for (let index = 1; index <= 17; index++) {        
        let personajeN = new Personaje();

        const response = await fetch(url+index);
        const data = await response.json();
        personajeN.nombre = data.name;
        personajeN.estatura = data.height;
        personajeN.peso = data.mass;
        personajes.push(personajeN);
      }
    } catch (error) {
      console.error(error);
    } finally {
      timeline_area.style.display = "block";
      document.querySelector(".preloader").style.display = "none";
    }

    return true;
}

async function getData(index) {
  return personajes[index];
}

// funcion generadora que recorre getdata desde un minimo a un maximo
function* recorreP(min, max) {
  for (let index = min; index <= max; index++) {
      yield getData(index);
  }
}

const llamaPersonajes =  (fila, color,  min, max) => {
  let iteratorFila = recorreP( min, max);
  let bloque= document.querySelector("."+fila+"");

  bloque.addEventListener("click", async () => {
    
      let respuesta = iteratorFila.next();
      if(respuesta.done){
        bloque.removeEventListener;
          alert('no hay mas elementos por mostrar');
      }
      else{
          let { nombre, estatura, peso} = await respuesta.value;
          
      console.log(nombre, estatura)
          procesar(bloque, color,nombre, estatura, peso);
      }
  });
}

function procesar(row, circleColor, nombre, estatura, peso) {
  var newDiv = document.createElement("div");
  newDiv.classList.add("col-12", "col-md-6", "col-lg-4", "populares");
  newDiv.innerHTML = ` <div class="single-timeline-content d-flex wow fadeInLeft 2021" data-wow-delay="0.3s"
                          style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;" id="populares" data-max="5">
                          <div class="timeline-icon" style="background-color: ${circleColor};"><i class="fa fa-address-card" aria-hidden="true"></i>
                          </div>
                          <div class="timeline-text">
                              <h6>${nombre}</h6>
                              <p>Estatura: ${estatura} cm. Peso: ${peso}</p>
                          </div>
                      </div>`;
                      row.appendChild(newDiv)
}

async function main() {
  await getAllData();
  // await getData(1);
    // primer iterador, primera fila 1-5  (0-4  array personajes)
    llamaPersonajes("firstRow", "salmon", 0, 4);

    // segundo iterador, segunda fila 6-11   (5-10  array personajes)
    llamaPersonajes("secondRow", "lightgreen",  5, 10);

    // tercer iterador, tercera fila 12-17  (11-16  array personajes)
    llamaPersonajes("thirdRow", "lightskyblue",  11, 16);
}

main();


