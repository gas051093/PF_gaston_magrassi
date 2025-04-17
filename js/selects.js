const tipos = ["CPU", "Impresora", "AllInOne", "Notebook", "Netbook"]
const estados = ["Ingreso nuevo", "En reparación", "Reparación realizada", "Sin reparación", "Entregado"]
// funcion anidada para la carga de selectores en html desde un array
const set_options = (select_options) => { 
    const set_data = (data_array) => { 
        for (const data of data_array){
            let op = document.createElement("option")
            op.innerHTML = data
            select_options.appendChild(op)
        }
    }
    return set_data
}
set_options(document.getElementById("equipo"))(tipos);
set_options(document.getElementById("equipo_find"))(tipos);
set_options(document.getElementById("estado_find"))(estados);
n_orden.textContent = `${Equipo.id +1}`;