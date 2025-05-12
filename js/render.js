function select_menu () { 
    const btn_select = document.querySelectorAll(".sidebar__item");
    btn_select.forEach(btn => { 
        btn.addEventListener("click", (e) => { 
            const btn_id = e.currentTarget.id;
            switch (btn_id) { 
                case "btn_new":
                    console.log(1);
                    break
                case "btn_find": 
                    console.log(2)
                    break
                case "btn_delete":
                    console.log(3)
                    break
            }
        })
    })
}
select_menu();