const f_msg = document.getElementById("text_info")
const n_orden = document.getElementById("numero_orden");
const content_cards = document.getElementById("content_card");
let equipos = [];
function cap_fecha() {  // funcion para capturar fecha actual
    const today = new Date();
    const format_date = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const date_today = today.toLocaleDateString('es-AR', format_date);
    return date_today;
}
class Equipo{
    static id = 0;
    constructor(cliente, telefono, tipo, marca, modelo, serie, fecha, descripcion) { 
        this.id = ++Equipo.id;
        this.cliente = cliente;
        this.telefono = telefono;
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.serie = serie;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.estado = "Ingreso nuevo";
    }
}
// si el local tiene datos los actualizo con el array equipos y actualizo el ID de la clase Equipo
if (localStorage.getItem("equipos")) {
  equipos = JSON.parse(localStorage.getItem("equipos"));
  Equipo.id = equipos[equipos.length -1].id;
}
// constructor de objetos que se llama desde el boton al cargar un equipo
const new_equipo = () => { 
    const n_cliente = document.getElementById("nombre").value;
    const n_telefono = document.getElementById("telefono").value;
    const n_tipo = document.getElementById("equipo").value;
    const n_marca = document.getElementById("marca").value;
    const n_modelo = document.getElementById("modelo").value;
    const n_serie = document.getElementById("serie").value;
    const n_fecha = cap_fecha();
    const n_descripcion = document.getElementById("descripcion").value;
    if (!n_cliente || !n_telefono || !n_tipo || !n_marca || !n_modelo || !n_serie  || !n_descripcion) {
        Swal.fire({
          title: "Error",
          text: "Complete todos los datos del formulario",
          icon: "warning",
          allowOutsideClick: false,
        });
    } else { 
        const new_equipo = new Equipo(n_cliente, n_telefono, n_tipo, n_marca, n_modelo, n_serie, n_fecha, n_descripcion);
        Swal.fire({
          title: "Guardando",
          text: "Espere...",
          showConfirmButton: false,
          allowOutsideClick: false,
          icon: "info",
          timer: 3000,
            timerProgressBar: true,
        }).then(() => { 
            try {
                equipos.push(new_equipo);
                localStorage.setItem("equipos", JSON.stringify(equipos))
                document.getElementById("form_carga").reset();
                n_orden.textContent = `${Equipo.id + 1}`;
            } catch (err) {
                Swal.fire(`Se encontro el siguiente error ${err}`);
                return;
            }
            Swal.fire({
              title: "Guardado",
              text: `La orden se genero correctamente para el cliente: ${n_cliente} `,
              showConfirmButton: true,
              allowOutsideClick: false,
              icon: "success",
            });
        })
    }
}
//Funcion para buscar en el array
const find = () => { 
    const f_orden = document.getElementById("orden_find").value;
    const f_cliente = document.getElementById("nombre_find").value;
    const f_tipo = document.getElementById("equipo_find").value;
    const f_estado = document.getElementById("estado_find").value;
    const f_all = document.getElementById("check_all").checked;
    let equipos_find = equipos;
    if (!f_all) { 
        if (f_orden) {
          equipos_find = equipos_find.filter((equipos) => equipos.id == f_orden);
        }
        if (f_cliente) {equipos_find = equipos_find.filter((equipos) => equipos.cliente == f_cliente);
        }
        if (f_tipo) {equipos_find = equipos_find.filter((equipos) => equipos.tipo == f_tipo);
        }
        if (f_estado) {equipos_find = equipos_find.filter((equipos) => equipos.estado == f_estado);
        };
    }
    content_cards.innerHTML = ""; //lo uso para limpiar el cuadro de listas antes de mostrar, para que no repita las cards al buscar de nuevo
    //al menos un dato se debe ingresar en el formulario y el array nuevo de equipos_find debe tener un dato
    if (equipos_find.length === 0 || !f_orden && !f_cliente && !f_tipo && !f_estado && !f_all) { 
        Swal.fire({
          title: "Intente de nuevo",
          text: "No se encontro ninguna orden de trabajo.",
          icon: "info",
        });
    } else { //si se obtiene algun parametro renderizo las cards en el HTML 
        equipos_find.forEach(equipo => {
            let card = document.createElement("div");
            card.className = "cards__section  col-lg-5 col-12 my-3 py-3";
            card.innerHTML = `
                <h5>Nº de Orden: ${equipo.id}</h5>
                <p>Cliente: ${equipo.cliente}</p>
                <p>Tipo: ${equipo.tipo}</p>
                <p>Marca: ${equipo.marca}</p>
                <p>Modelo: ${equipo.modelo}</p>
                <p>Serie: ${equipo.serie}</p>
                <p>Fecha: ${equipo.fecha}</p>
                <p>Descripción: ${equipo.descripcion}</p>
                <p>Estado: ${equipo.estado}</p>
                <button class="btn form__btn" data-target="btn_card" id="${equipo.id}">Modificar estado</button>
            `;
            content_cards.appendChild(card);
        });
    }
    btn_card_event();
}
function btn_card_event() { //funcion escuchar y caputar el id del boton de cada card
  const btn_mod = document.querySelectorAll(`[data-target="btn_card"]`);
  btn_mod.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const btn_id = e.currentTarget.id;
        mod_state(btn_id); // llamo la funcion que contiene un sweetalert para cambiar el estado del equipo y paso el id del boton como parametro
    });
  });
}
async function mod_state(btn_id) {
    let input_select;
    try {
        input_select = await call_json("./data/estados_equipos.json");
    } catch (err) { 
        Swal.fire({
            text: `${err}`
        });
        return
    }
    let options = {};
    for (const data of input_select) { 
        options[data] = data;
    }
    const { value: estado_seleccionado } = await Swal.fire({
      title: "Seleccione una opcion",
      input: "select",
      inputOptions: options,
      showCancelButton: true,
    });
    if (estado_seleccionado) {
        const id = parseInt(btn_id);
        const equipo = equipos.find((e) => e.id === id);

        if (equipo) {
            equipo.estado = estado_seleccionado;
            localStorage.setItem("equipos", JSON.stringify(equipos));
            find();
            Swal.fire({
              title: "Estado actualizado",
              text: `El equipo ahora está en estado: ${estado_seleccionado}`,
              icon: "success",
            });
         }

    }
}
//eventos 
const alta_ot = document.getElementById("altaOT").addEventListener("submit", function (event) { 
    event.preventDefault();
    new_equipo();
});
const find_ot = document.getElementById("buscarOT").addEventListener("submit", function (event) { 
    event.preventDefault();
    find();
})
