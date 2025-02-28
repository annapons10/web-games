class GameApp{
    constructor(){
        // Aquí tengo los metadatos de los juegos para mostrar en "mis juegos" y conectar con la BSDD: 
        this.videojuegos = [
            { id: "ahorcado", nombre: "Juego Ahorcado", tipo: "Palabras", puntuacion: 0 },
            { id: "numerico", nombre: "Juego Numérico", tipo: "Matemáticas", puntuacion: 0 },
            { id: "tres en raya", nombre: "Juego Tres En Raya", tipo: "Estrategia", puntuacion: 0 }
        ];
        //Objeto donde voy a guardar las instancias para luego acceder a sus métodos. 
        this.videojuegosInstanciados = {} 
    }


    //Método para los clicks de los botones de los juegos para cargar html y instanciar los juegos:
    crearEventosParaTodosLosJuegosAlHacerClick(){
        const botonesImagenesJuegos = document.querySelectorAll('.img-button');
        botonesImagenesJuegos.forEach(boton => {
            boton.addEventListener('click', () =>{
                const juego = boton.getAttribute('data-game');
                this.instanciarJuego(juego);
                //Para asegurarme que el dom está cargado y tengo las instancias para llamar a sus métodos. 
                setTimeout(() => {
                    this.loadGameContent(juego);
                }, 100);

            });
        });
    }

  
    //MÉTODO PARA INSTANCIAR LOS JUEGOS DEPENDIENDO DE DÓNDE HAGA CLICK EL USUARIO:
    instanciarJuego(id){
        if(id === 'ahorcado' && !this.videojuegosInstanciados[id]){
            this.videojuegosInstanciados[id] = new JuegoAhorcado(7);
        }else if(id === 'juego numerico' && !this.videojuegosInstanciados[id]){
            this.videojuegosInstanciados[id] = new JuegoNumerico(10, ['+', '-'], 3, 4); 
        }else if(id === 'tres en raya' && !this.videojuegosInstanciados[id]){
            this.videojuegosInstanciados[id] = new JuegoTresEnRaya();
        }
    }

    //Cargo dinámicamente las páginas en index.html en main depdende de donde haga click: 
    loadContent(page){ 
        if(page === 'Home'){
            //TRAIGO LO QUE HAY EN HEADER.HTML PERO ESTOY EN INDEX.HTML
            fetch('https://annaponsprojects.com/webJuegos/html/home.html') 
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data;
                    // Me aseguro de que primero tengo el html para luego llamar a la función de los botones. 
                    this.crearEventosParaTodosLosJuegosAlHacerClick(); 
                })
                .catch(error => console.error('Error cargando contenido:', error));
        }else if(page === 'Mis juegos'){
            fetch('https://annaponsprojects.com/webJuegos/html/misJuegos.html')
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                    this.mostrarJuegosEnPantalla();
                })
                .catch(error => console.error('Error cargando contenido:', error));
    
        }else if(page === 'Mi usuario'){
            fetch('https://annaponsprojects.com/webJuegos/html/miUsuario.html')
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                })
                .catch(error => console.error('Error cargando contenido:', error));
        }
        
    }

    //Se cargan los juegos dinámicamente: 
    loadGameContent(game){
        if(game === 'ahorcado'){
            fetch('https://annaponsprojects.com/webJuegos/html/ahorcado.html') 
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                    this.videojuegosInstanciados['ahorcado'].crearTecladoPantalla(); 
                    this.videojuegosInstanciados['ahorcado'].iniciarJuego();
                })
                .catch(error => console.error('Error cargando contenido:', error));   
    
        }else if(game === 'juego numerico'){
            fetch('https://annaponsprojects.com/webJuegos/html/juegoNumerico.html') 
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data 
                    this.videojuegosInstanciados['juego numerico'].inicioJuegoBoton();  
                    const botonVolver = document.getElementById('volverJugar');
                })
                .catch(error => console.error('Error cargando contenido:', error));

        }else if(game === 'tres en raya'){
            fetch('https://annaponsprojects.com/webJuegos/html/tresEnRaya.html')
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data 
                    this.videojuegosInstanciados['tres en raya'].iniciarJuego(); 
                })
                .catch(error => console.error('Error cargando contenido:', error));


        }
    }
        //MÉTODO NUEVO PARA MOSTRAR JUEGOS EN PANTALLA CUANDO EL USUARIO HAGA CLICK EN "MIS JUEGOS":
        mostrarJuegosEnPantalla(){
            // InicializaR una variable para acumular el HTML.
            let juegosHTML = '';
            for(const juego of this.videojuegos){
                juegosHTML += `
                <div class="card">
                    <div class="card__inner">
                        <div class="card__front">
                            <h3 class="h3__card">${juego.nombre}</h3>
                        </div>
                        <div class="card__back">
                            <p class="nuevoP">Género: ${juego.tipo}</p>
                            <p class="nuevoP">Puntuación: ${juego.puntuacion}</p>
                        </div>
                    </div>
                </div>
            `;
            }
        // Una vez que he acumulado todo el HTML, se inserta en el dom de una vez.
        document.getElementById('gamesContainer').innerHTML = juegosHTML;
    }
}


