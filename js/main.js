document.addEventListener("DOMContentLoaded", () => {
  //* VARIABLES
  const card = document.querySelector("#pintargrid");
  const tabla = document.querySelector("#tabla");
  const fragment = document.createDocumentFragment();
  const tablaCompleta=document.querySelector("#todaLaTabla");

  //todo ARRAYS

  const subirLocal = JSON.parse(localStorage.getItem("productos")) || [];
  let productos = [];

  //* EVENTOS

  document.addEventListener("click", ({ target }) => {
    if (target.matches(".btn-btn-primary")) {
      let id = target.parentElement.id;
      buscarProducto(id);
      pintarTablaDelLocal()
    }
    if (target.matches(".comprar")) {
      
      location.assign("compra.html?id=2")
    }
    if (target.matches(".vaciar")) {
      localStorage.removeItem('productos');
    }
    if (target.matches("#carrito")) {
      tablaCompleta.classList.toggle("hidden")
      
    }

  });


  //* FUNCIONES
  const consulta = async () => {
    try {
      let ruta = `https://dummyjson.com/products`; //*limit=10&skip=10

      let peticion = await fetch(ruta, {
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

  const pintarEstrellas = (rating) => {

    let cielo = document.createElement("DIV");
    cielo.className = "cielo"
    let valoracion = Math.round(rating);
    let valoracionInversa = 5 - valoracion;

    for (let i = 0; i < valoracion; i++) {
      let estrellaBrillante = document.createElement("IMG");
      estrellaBrillante.src = "material_practica-carrito-compra/star1.png";
      cielo.append(estrellaBrillante);
    }
    for (let i = 0; i < valoracionInversa; i++) {
      let estrellaApagada = document.createElement("IMG");
      estrellaApagada.src = "material_practica-carrito-compra/star2.png";
      cielo.append(estrellaApagada);
    }

    return cielo;
  };

  const pintarFotos = async () => {
    let objProductos = await consulta();
    console.log(objProductos);
    arrayProductos = objProductos.products;
    productos.push(arrayProductos);

    arrayProductos.forEach(({ title, id, images, rating }) => {
      let cardBody = document.createElement("DIV");
      cardBody.className = "card-body";
      let img = document.createElement("IMG");
      let button = document.createElement("button");
      let h5 = document.createElement("h5");
      button.className = "btn-btn-primary";
      img.src = images[0];
      img.id = id;
      img.className = "card-img-top";
      cardBody.id = id;
      button.textContent = title;
      h5.textContent = title;
      h5.className = "card-title";
      let estrellas = pintarEstrellas(rating);

      cardBody.append(img, h5, button, estrellas);
      fragment.append(cardBody);
    });
    card.append(fragment);
  };

  const buscarProducto = (id) => {
    productos.forEach((arrayProductos) => {
      let cont=1
      const productoEncontrado = arrayProductos.find((item) => item.id == id);

      productoEncontrado.cantidad=cont
      if (subirLocal.find((item)=>item.id==id)) {
        
        cont++
        productoEncontrado.cantidad=cont
      }else{

        subirLocal.push(productoEncontrado);
      
      setLocal();
      }
      
    });
  };

  const pintarTablaDelLocal = () => {
    tabla.innerHTML = "";
    let comprar = document.createElement("button")
    let vaciar = document.createElement("button")
    comprar.className = "comprar"
    vaciar.className = "vaciar"
    comprar.textContent = "Comprar"
    vaciar.textContent = "vaciar"
    const productos = getLocal();
    productos.forEach(({ title, price, thumbnail,cantidad }) => {
      let tr = document.createElement("TR")
      let tdimg = document.createElement("TD")
      tdimg.className="tdFoto"
      let tdcantidad=document.createElement("TD")
      let tdprecio = document.createElement("TD")
      let subtotal = document.createElement("TD")
      // let tdsubtotal=document.createElement("TD")
      // tdsubtotal.textContent=price
      tdcantidad.textContent=cantidad
      subtotal.textContent = price
      tdprecio.textContent = price
      let img = document.createElement("img")
      img.src = thumbnail
      img.className = "fotoSmall"
      let tdtitle = document.createElement("Td")
      tdtitle.textContent = title
      tdimg.append(img)
      tr.append(tdimg, tdtitle, tdprecio, tdcantidad, subtotal)
      tabla.append(tr)
    });
    tabla.append(comprar, vaciar)
  };

  //todo FUNCIONES DEL LOCAL

  const setLocal = () => {
    localStorage.setItem("productos", JSON.stringify(subirLocal));
  };
  const getLocal = () => {
    return JSON.parse(localStorage.getItem("productos")) || [];
  };

  //todo INIT
  const init = () => {

    const url = location.search;

    let params = new URLSearchParams(url);

    if (params.has("id")) {
      getLocal()
      pintarTablaDelLocal()

    } else {
      pintarFotos();
    }
  }

  init()

}); //!LOAD
