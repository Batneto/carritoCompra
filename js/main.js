document.addEventListener("DOMContentLoaded", () => {

  //* VARIABLES
  const pintargrid = document.querySelector("#pintargrid")
  const tabla=document.querySelector("#tabla")
  const fragment = document.createDocumentFragment()
  

  //* EVENETOS
  document.addEventListener("click", ({ target }) => {

    if (target.matches(".boton")) {
      let id = target.parentElement.id
      console.log(id);
    }
  })


  //* FUNCIONES
  const consulta = async () => {

    try {

      let ruta = `https://dummyjson.com/products`           //*limit=10&skip=10

      let peticion = await fetch(ruta,
        {
          method: "GET",

        });

      if (peticion.ok) {
        const respuesta = await peticion.json();
        return respuesta;

      } else throw "Error en la ejecución";

    } catch (error) {

      return error;
    }
  };


const pintarEstrellas=(rating)=>{ 

  let cielo=document.createElement("DIV")
  let valoracion=Math.round(rating)
  let valoracionInversa=5-valoracion
 
  for (let i = 0; i < valoracion; i++) {
  let estrellaBrillante=document.createElement("IMG")
  estrellaBrillante.src="material_practica-carrito-compra/star1.png"
      cielo.append(estrellaBrillante)
  }
  for (let i = 0; i < valoracionInversa; i++) {
    let estrellaApagada=document.createElement("IMG")
    estrellaApagada.src="material_practica-carrito-compra/star2.png"
        cielo.append(estrellaApagada)
    }


  return cielo

}

  const init = async () => {

    let objProductos = await consulta()
    console.log(objProductos);
    arrayProductos = objProductos.products

    arrayProductos.forEach(({ title, id, images,rating }) => {
      let carta = document.createElement("DIV");
      carta.className = "divfotos"
      let img = document.createElement("IMG");
      let button = document.createElement("button");
      let p =document.createElement("P");
      button.className = "boton"
      img.src = images[0];
      img.id = id
      carta.id = id
      button.textContent = title
      p.textContent=title
      let estrellas= pintarEstrellas(rating)
      
      
      carta.append(p,img,button,estrellas)

      fragment.append(carta)
    });
    pintargrid.append(fragment)
  }




  init()


















}); //!LOAD






