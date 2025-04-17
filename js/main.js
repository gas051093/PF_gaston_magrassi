const f_msg = document.getElementById("text_info")
const n_orden = document.getElementById("numero_orden");
let equipos = [];
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
if (localStorage.getItem("equipos")) {
  equipos = JSON.parse(localStorage.getItem("equipos"));
  Equipo.id = equipos[equipos.length -1].id;
}
const new_equipo = () => { 
    const n_cliente = document.getElementById("nombre").value;
    const n_telefono = document.getElementById("telefono").value;
    const n_tipo = document.getElementById("equipo").value;
    const n_marca = document.getElementById("marca").value;
    const n_modelo = document.getElementById("modelo").value;
    const n_serie = document.getElementById("serie").value;
    const n_fecha = document.getElementById("fecha").value;
    const n_descripcion = document.getElementById("descripcion").value;
    if (!n_cliente || !n_telefono || !n_tipo || !n_marca || !n_modelo || !n_serie || !n_fecha || !n_descripcion) {
        f_msg.textContent = "Por favor ingrese todos los datos del fomurlario, Muchas gracias.";
    } else { 
        const new_equipo = new Equipo(n_cliente, n_telefono, n_tipo, n_marca, n_modelo, n_serie, n_fecha, n_descripcion);
        equipos.push(new_equipo);
        localStorage.setItem("equipos", JSON.stringify(equipos))
        f_msg.textContent = "Equipo guardado con exito";
        document.getElementById("form_carga").reset();
        n_orden.textContent = `${Equipo.id +1}`;
    }
}
const content_cards = document.getElementById("content_card");
const find = () => { 
    const f_orden = document.getElementById("orden_find").value;
    const f_cliente = document.getElementById("nombre_find").value;
    const f_tipo = document.getElementById("equipo").value;
    const f_estado = document.getElementById("estado_find").value;
    let equipos_find = equipos;

     if (!f_orden && !f_cliente && !f_tipo && !f_estado) {
       f_msg.textContent =
         "Por favor ingrese al menos un criterio de búsqueda.";
       return; // Sale de la función sin realizar la búsqueda
     }

    if (f_orden) {
        equipos_find = equipos_find.filter(equipos => equipos.id == f_orden )
    } if (f_cliente) { 
        equipos_find = equipos_find.filter(equipos => equipos.cliente == f_cliente)
    } if (f_tipo) { 
        equipos_find = equipos_find.filter(equipos => equipos.tipo == f_tipo)
    } if (f_estado) { 
        equipos_find = equipos_find.filter(equipos => equipos.estado == f_estado)
    }

    content_cards.innerHTML = ""; //lo uso para limpiar el cuadro de listas antes de mostrar, para que repita las cards al buscar de nuevo

    if (equipos_find.length === 0) {
        let find_empty = document.createElement("p");
        find_empty.innerText = "No se encontraron resultados.";
        content_cards.appendChild(find_empty);
    } else {
        equipos_find.forEach(equipo => {
            let card = document.createElement("div");
            card.className = "cards__section  col-lg-5 col-12 my-3 py-3";
            card.innerHTML = `
                <h5>ID: ${equipo.id}</h5>
                <p>Cliente: ${equipo.cliente}</p>
                <p>Tipo: ${equipo.tipo}</p>
                <p>Marca: ${equipo.marca}</p>
                <p>Modelo: ${equipo.modelo}</p>
                <p>Serie: ${equipo.serie}</p>
                <p>Fecha: ${equipo.fecha}</p>
                <p>Descripción: ${equipo.descripcion}</p>
                <p>Estado: ${equipo.estado}</p>
            `;
            content_cards.appendChild(card);
        });
    }
}

const btn_add = document.getElementById("cargar");
const btn_find = document.getElementById("buscar");
btn_add.addEventListener("click", new_equipo);
btn_find.addEventListener("click", find);

