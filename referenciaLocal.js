
// localStorage.setItem('nombre', 'Lydia'); 
// localStorage.apellido = "Vega"

// let primerNombre = localStorage.getItem('nombre');
//     console.log(`Hola, mi nombre es ${primerNombre}`)
   
//     // o también
//     let apellido  = localStorage.apellido;
//     console.log(`Hola, mi nombre es ${primerNombre} ${apellido}`)


//Se borra por clave

    
    // localStorage.removeItem('nombre');


    // localStorage.clear();



    // for(let i=0; i<localStorage.length; i++) {
    //     let key = localStorage.key(i);
    //     alert(`${key}: ${localStorage.getItem(key)}`);
    // }


    


    let usuario = { nombre: "Leo", apellido: "Messi" }

    localStorage.setItem("usuario", usuario);

    localStorage.setItem("usuario",JSON.stringify(usuario));

    let perfilesGuardados = JSON.parse(localStorage.getItem('usuario')) || [];
    console.log(perfilesGuardados);