class Juego{
    constructor(titulo, genero, puntuacion){
        this.titulo = titulo;
        this.genero = genero;
        this.puntuacion = 0;
    }

    mostrarTituloEnPantalla(){
        let htmlElement = document.getElementById('juegosContainer'); //Cojo el container donde quiero escribir.
        //Creo el elemento: 
        let nuevoDiv = document.createElement('div');
        nuevoDiv.textContent = this.titulo;

        //Se lo añado al contenedor:
        htmlElement.appendChild(nuevoDiv);
    }

    
    
}

let juegos = [
    new Juego('Ahorcado', 'Juego de Palabras', 0),
    new Juego('Serpiente', 'Acción', 0),
    new Juego('Memoria', 'Habilidad Mental', 0),
    new Juego('Tres en raya', 'Estrategia', 0)
];

//Me guardo los botones en variables:
let botonMisJuegos = document.getElementById("misJuegos");
console.log(botonMisJuegos);

//Los eventos de click. 
botonMisJuegos.addEventListener('click', () => {
    loadContent('Mis Juegos'); //llamo a loadcontent desde aqui para que se vea la pagina. 
    juegos.forEach(juego => juego.mostrarTituloEnPantalla());
});



