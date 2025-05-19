//mismo render que el codigo de la 2da entrega pero le agrege la conexion al json
// animacion toast para errores con el json
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
// en la funcion async paso por parametro la url para llamar varios json
async function call_json (url) { 
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        let msg = `error al conectar con el servidor ${err}`;
        throw msg;
    }
}
// funcion anidada para la carga de selectores en html
const set_options = (select_options) => { 
    const set_data = (data_array) => { 
        for (const data of data_array){
            let op = document.createElement("option")
            op.innerHTML = data;
            select_options.appendChild(op)
        }
    }
    return set_data
}

// funciones para llamar los archivos json

async function init_select(select, url) {
    try { set_options(document.getElementById(select))(await call_json(url)); }
    catch (err) { 
        Toast.fire({
          icon: "error",
          title: `Error al iniciar el selector del formulario ${err}`,
        });
    }
    
}
// paramteros de la funcion init_select(id del select, url del json)
init_select('equipo', '../data/tipos_equipos.json');
init_select('equipo_find', '../data/tipos_equipos.json');
init_select('estado_find', '../data/estados_equipos.json')
n_orden.textContent = `${Equipo.id + 1}`; //actualizar numero de orden en el DOM
