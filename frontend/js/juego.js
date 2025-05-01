console.log("se carga juego");
//ABSTRACTA. SIRVE PARA MODELAR A LOS HIJXS. NO SE SUELE INSTANCIAR DIRECTAMENTE. (SÓLO EN CIERTOS CASOS). 
class Juego{
    constructor(titulo, genero, puntuacion){
        this.titulo = titulo;
        this.genero = genero;
        this.puntuacion = puntuacion;
    }


    iniciarJuego(){ //Para todos igual.
        
    }

    finalizarJuego(){//para todos igual.

    }


}






