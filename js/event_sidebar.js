const form_alta = document.getElementById("altaOT");
const form_buscar = document.getElementById("buscarOT");
//Funciones para mostrar en pantalla los form
function show_alta() {
    form_buscar.classList.add('d-none')
    form_alta.classList.remove("d-none");
    content_cards.innerHTML= ("");
}
function show_buscar() { 
    form_buscar.classList.remove("d-none");
    form_alta.classList.add("d-none");
}
function clear_memori() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger me-2",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Desea borrar la memoria del LocalStorage?",
          text: "Se realizara el borrado de la memoria local del navegador",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Borrar",
          cancelButtonText: "Cancelar",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            swalWithBootstrapButtons
              .fire({
                title: "Borrado",
                text: "la memoria a sido borrada!",
                icon: "success",
                timer: 3000,
                showConfirmButton: false,
                allowOutsideClick: false,
              })
              .then(() => {
                // esperamos a que se muestre el mensaje para recargar la pagina, al recargae la pagina el contador del ID vuvle al 1
                location.reload();
              });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelado",
              text: "Accion cancelada por el usuario",
              icon: "error",
              timer: 3000,
              showConfirmButton: false,
            });
          }
        });
}
// funcion para escuchar los botones de la barra de navegacion
function select_menu() {
  const btn_select = document.querySelectorAll(".sidebar__item");
  btn_select.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const btn_id = e.currentTarget.id;
      switch (btn_id) {
        case "btn_new":
          show_alta();
          break;
        case "btn_find":
          show_buscar();
          break;
        case "btn_delete":
          clear_memori();
          break;
      }
    });
  });
}


const sidebar = document.getElementById("sidebar");
const col = document.getElementById("col").addEventListener("click", () => { 
  sidebar.classList.toggle("collapsed");
})
select_menu();
