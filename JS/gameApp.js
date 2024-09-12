console.log("se carga gameapp");


class GameApp{
    constructor(){
        this.videojuegos = [];
    }

    
    addGame(game){
        this.videojuegos.push(game);
    }

   showGame(){ //Mostrar los videojuegos en la consola para saber que se han incluido correctamente al array. 
        this.videojuegos.forEach(game =>{
            console.log(game);
        });
    } 

    loadContent(page){ //ANTES DE CARGAR SU HTML, CSS Y JS GENERALES DEL INDEX.HTML ELIMINA LOS DINÁMICOS DE LOS JUEGOS. 
     
        if(page === 'Home'){
            fetch('home.html') //TRAIGO LO QUE HAY EN HEADER.HTML PERO ESTOY EN INDEX.HTML
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                });
        }else if(page === 'Chat'){
            fetch('chat.html')
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                });
    
        }else if(page === 'Mis juegos'){
            fetch('misJuegos.html') 
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                    this.mostrarJuegosEnPantalla();
                });
    
        }else if(page === 'Mi usuario'){
            fetch('miUsuario.html')
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                });
        }
        
    }

    loadGameContent(game){
        if(game === 'Laberinto'){
            fetch('laberinto.html') //TRAIGO LO QUE HAY EN HEADER.HTML PERO ESTOY EN INDEX.HTML
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                });

        }else if(game === 'Ahorcado'){
            fetch('ahorcado.html') //FETCH 
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                    this.videojuegos[0].crearTecladoPantalla(); //ESTO DENTRO DEL FETCH ACTUA COMO CUANDO YA TIENE EL HTML, LLAMA AL MÉTODO. SI LO PONGO FUERA, SIGUE LEYENDO CÓDIGO SIN TENER HTML Y MIENTRAS SIGUE BUSCANDO, SIGUE LEYENDO. NO PUEDE ESCRIBIR LAS LETRAS. 
                });
                
               
    
        }else if(game === 'Juego memoria'){
            fetch('juegoMemoria.html') 
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                    this.mostrarJuegosEnPantalla();
                });


    
        }else if(game === 'Tres en raya'){
            fetch('tresEnRaya.html')
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                });


        }else if(game === 'Juego serpiente'){
            fetch('juegoSerpiente.html')
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                });

        }
    }

    mostrarJuegosEnPantalla(){
        // InicializaR una variable para acumular el HTML.
        let juegosHTML = '';
        //let fragment = document.fragment(); INCLUIR EL FRAGMENTO. 
        // Recorre el array de juegos y genera el HTML para cada uno.
        this.videojuegos.forEach(juego => {
            // Acumula el HTML generado por cada juego en la variable
            juegosHTML += `
                <div class="card">
                    <div class="card__inner">
                        <div class="card__front">
                            <h3 class="h3__card">${juego.titulo}</h3>
                        </div>
                        <div class="card__back">
                            <p class="nuevoP">Género: ${juego.genero}</p>
                            <p class="nuevoP">Puntuación: ${juego.puntuacion}</p>
                        </div>
                    </div>
                </div>
            `;

        });

        // Una vez que has acumulado todo el HTML, se inserta en el dom de una vez.
        document.getElementById('gamesContainer').innerHTML = juegosHTML;
    }


   
}


