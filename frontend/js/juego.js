console.log("se carga juego");
//ABSTRACTA. SIRVE PARA MODELAR A LOS HIJXS. NO SE SUELE INSTANCIAR DIRECTAMENTE. (SÓLO EN CIERTOS CASOS). 
class Juego{
    constructor(titulo, genero, puntuacion){
        this.titulo = titulo;
        this.genero = genero;
        this.puntuacion = puntuacion;
    }


    mostrarModalInicio(){ //Para todos igual.
        //CARGAR MODALES DINÁMICAMENTE, EL MODAL ADECUADO DEPENDIENDO DE QUE JUEGO ESTÉ EN PANTALLA:
        const modalId = `#modal-${this.titulo}`; 
        const modal = document.querySelector(modalId);

        //const newModal = new bootstrap.Modal(modal); 
        const myModal = new bootstrap.Modal(modal); 

        myModal.show(); 

      /*   //Para evitar que se quede el focus en el modal (lectores de pantalla): 
         //Para evitar que se quede el focus en el modal (lectores de pantalla): 
        modal.addEventListener('hidden.bs.modal', () => {
            const container = document.querySelector(`.${this.titulo}_focus`); 
            container.focus();
            console.log(`tengo el container ${container}`); 
        });  */
    } 

    finalizarJuego(){//para todos igual.

    }


}






