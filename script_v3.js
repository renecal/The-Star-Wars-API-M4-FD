//api
const url = 'https://swapi.dev/api/people/';

//clase personaje
class Personaje{
  constructor(nombre, estatura, peso){
    this.nombre = nombre;
    this.estatura = estatura;
    this.peso = peso;
  }
}


//metodo asincrono para llamar cada personaje
// retorna data
async function getData(idPersonaje) {
    try {
      const response = await fetch(url+idPersonaje);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
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
          let {name, height, mass} = await respuesta.value;
          procesar(bloque, color, name, height, mass);
      }
  });
}

// primer iterador, primera fila 1-5  
llamaPersonajes("firstRow", "salmon", 1, 5);

// segundo iterador, segunda fila 6-11  
llamaPersonajes("secondRow", "lightgreen",  6, 11);

// tercer iterador, tercera fila 12-17  
llamaPersonajes("thirdRow", "lightskyblue",  12, 17);

function procesar(row, circleColor, name, height, mass) {
    var newDiv = document.createElement("div");
    newDiv.classList.add("col-12", "col-md-6", "col-lg-4", "populares");
    newDiv.innerHTML = ` <div class="single-timeline-content d-flex wow fadeInLeft 2021" data-wow-delay="0.3s"
                            style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;" id="populares" data-max="5">
                            <div class="timeline-icon" style="background-color: ${circleColor};"><i class="fa fa-address-card" aria-hidden="true"></i>
                            </div>
                            <div class="timeline-text">
                                <h6>${name}</h6>
                                <p>Estatura: ${height} cm. Peso: ${mass}</p>
                            </div>
                        </div>`;
                        row.appendChild(newDiv)
}
