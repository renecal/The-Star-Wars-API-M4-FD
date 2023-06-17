const url = 'https://swapi.dev/api/people/';

async function getData(idPersonaje) {
    try {
      const response = await fetch(url+idPersonaje);
      const data = await response.json();
    //   console.log(data)
      return data;
    } catch (error) {
      console.error(error);
    }
  }
 
const bloqueInicial= document.querySelector(".firstRow");

function* recorreP(idPersonaje, min, max) {
    while (idPersonaje >= min && idPersonaje <= max) {
        // let {name, height, weight} = getData(idPersonaje);        
        // console.log(personaje)
        yield getData(idPersonaje);
        idPersonaje++;
    }
  }



  const iterator = recorreP(1, 1, 5);
bloqueInicial.addEventListener("click", async () => {
   
    let respuesta = iterator.next();
    if(respuesta.done){
        bloqueInicial.removeEventListener;
        alert('no hay mas elementos por mostrar');
    }
    else{
        let {name, height, mass} = await respuesta.value;
        procesar(name, height, mass);
        // console.log(this)
    }
});

function procesar(name, height, mass) {
    var newDiv = document.createElement("div");
    newDiv.classList.add("col-12", "col-md-6", "col-lg-4", "populares");
    newDiv.innerHTML = ` <div class="single-timeline-content d-flex wow fadeInLeft 2021" data-wow-delay="0.3s"
                            style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;" id="populares" data-max="5">
                            <div class="timeline-icon" style="background-color: salmon;"><i class="fa fa-address-card" aria-hidden="true"></i>
                            </div>
                            <div class="timeline-text">
                                <h6>${name}</h6>
                                <p>Estatura: ${height} cm. Peso: ${mass}</p>
                            </div>
                        </div>`;
    bloqueInicial.appendChild(newDiv)
}
