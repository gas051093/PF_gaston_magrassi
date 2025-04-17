// let user = "admin";
// let pass = "admin";
// const equipos = [];
// //login del usuario con validacion//
// function login() {
//     for (i = 5; i > 0; i--) {
//         let usuario = prompt('Ingrese el nombre de usuario (admin)');
//         let contraseña = prompt('Ingrese la contraseña (admin)');
//         if (usuario === user && contraseña === pass) {
//             return true;

//         } else {
//             alert(`Error! Intente de nuevo, le quedan: ${i} intentos`)
//         }
//     }
//     return false
// }
// //funcion de seleccion de agregar elementos al array//

// function agregar() {
//     let input = prompt(`Ingrese el nombre nombre del equipo a reparar`);
//     if (input) {
//         equipos.push(input);
//         alert(`Se agrego el equipo: ${input}`)

//     } else {
//         alert(`Error no se ingreso ningun equipo`)
//     }
// }
// //funcion de ver la lista de qeuipos ingresados/
// function listar() {
//     if (equipos.length > 0) {
//       alert(equipos.join(`\n`));
//     } else {
//       alert(`La lista esta vacia`);
//     }
// }
// //funcion de eliminar ultimo elemento ingresado en el array//
// function eliminar() {
//     if (equipos.length > 0) {
//         let equipo_eliminado = equipos.pop();
//         alert(`el equipo eliminado es:  ${equipo_eliminado}`);
//     } else {
//         alert(`La lista esta vacia`)
//     }
// }
// //funcion de seleccion de menu//
// function menu() {
//     let select_menu = parseInt(prompt(`Bienvenido a la App de Csistemas \n Ingrese la opcion que desee realizar \n 1) Cargar equipo \n 2) ver lista de equipo \n 3) Borrar ultimo equipo \n 4) salir del sistema `))
//     while (select_menu !== 4) {
//         switch (select_menu) {
//             case 1:
//                 agregar();
//                 break;
//             case 2:
//                 listar();
//                 break;
//             case 3:
//                 eliminar();
//                 break;
//             default:
//                 alert('lo siento, error de seleccion, intente nuevamente');
//                 break;
//         }
//         select_menu = parseInt(
//           prompt(
//             `Ingrese la opcion que desee realizar \n 1) Cargar equipo \n 2) ver lista de equipo \n 3) Borrar ultimo equipo \n 4) salir del sistema `
//           )
//         );
//     }
//     alert(`Gracias por usar la app de Csistemas`)
// }
// //inicio del sistema
// if (login()) {
//   menu();
// } else {
//   alert(`Lo siento, se agotaron los intentos, actualice la pagina`);
// }

