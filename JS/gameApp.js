console.log("se carga gameapp");


class GameApp{
    constructor(){
        this.videojuegos = [];
    }

    loadContent(page){
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

       
        /* comprobarPantalla(); //llamo para cerrar el mnú hamburguesa en el caso de que sea necesario.  */
        
    }

    addGame(game){
        this.videojuegos.push(game);
    }

   showGame(){ //Mostrar los videojuegos en la consola para saber que se han incluido correctamente al array. 
        this.videojuegos.forEach(game =>{
            console.log(game);
        });
    } 


    mostrarJuegosEnPantalla(){
        // InicializaR una variable para acumular el HTML.
        let juegosHTML = '';

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

  
    
//HAMBURGUESA: 
  /*  comprobarPantalla(){ //compruebo el tamaño de pantalla para cerrar el menú hamburguesa en el caso de ser necesario.
       
        const mobileQuery = window.matchMedia("(max-width: 920px)");
        if(mobileQuery.matches){ //si es true, quiero que el nav se cierre porque esta hamburguesa, si no, que no haga nada.
            return true;
            //headerNav.classList.add('header__closed');
        }else{
            return false;
        }

    
    }
 */
    
    
   
}


