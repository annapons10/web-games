console.log("cargo gameApp con rutas nuevas");
class GameApp{
    constructor(){
        // Aquí tengo los metadatos de los juegos para mostrar en "mis juegos" y conectar con la BSDD: 
        this.videojuegos = [
            { id: "ahorcado", nombre: "Juego Ahorcado", tipo: "Palabras", puntuacion: 0 },
            { id: "juegoNumerico", nombre: "Juego Numérico", tipo: "Matemáticas", puntuacion: 0 },
            { id: "tresEnRaya", nombre: "Juego Tres En Raya", tipo: "Estrategia", puntuacion: 0 }
        ];
        //Objeto donde voy a guardar las instancias para luego acceder a sus métodos. 
        this.videojuegosInstanciados = {} ;
        this.conectado = false; 
        this.user = {}; 
        //Para no añadir más de un evento a los formularios:
        this.eventoLogin = false;
        this.eventoRegister = false;
        this.eventoLogout = false; 
    }


    //Método para los clicks de los botones de los juegos para cargar html y instanciar los juegos:
    crearEventosParaTodosLosJuegosAlHacerClick(){
        const botonesImagenesJuegos = document.querySelectorAll('.img-button');
        botonesImagenesJuegos.forEach(boton => {
            boton.addEventListener('click', () =>{
                const juego = boton.getAttribute('data-game');
                //Cambio hash de la URL : 
                const nuevoHash = `#${juego}`;
                location.hash = nuevoHash; 
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
        }else if(id === 'juegoNumerico' && !this.videojuegosInstanciados[id]){
            this.videojuegosInstanciados[id] = new JuegoNumerico(10, ['+', '-'], 3, 4);
            console.log("he insanciado juego numerico");
        }else if(id === 'tresEnRaya' && !this.videojuegosInstanciados[id]){
            this.videojuegosInstanciados[id] = new JuegoTresEnRaya();
        }
    }

    //Cargo dinámicamente las páginas en index.html en main depdende de donde haga click: 
    loadContent(page){ 
        if(page === 'Home'){
            //TRAIGO LO QUE HAY EN HEADER.HTML PERO ESTOY EN INDEX.HTML
            fetch('./html/home.html') 
                .then(response => response.text() )
                .then(data =>{
                    document.getElementById('main').innerHTML = data;
                    // Me aseguro de que primero tengo el html para luego llamar a la función de los botones. 
                    this.crearEventosParaTodosLosJuegosAlHacerClick(); 
                })
                .catch(error => {
                    document.querySelector('.container__home').innerHTML = "<p>Lo siento, no se pudo cargar el contenido de esta página.</p>";
                });
        }else if(page === 'Mis juegos'){
            fetch('./html/misJuegos.html')
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                    this.mostrarJuegosEnPantalla();
                })
                .catch(error => {
                    document.querySelector('.container__home').innerHTML = "<p>Lo siento, no se pudo cargar el contenido de esta página.</p>";
                });
        }else if(page === 'Mi usuario'){
            //No está conectado, mostrar para conectarse: 
            if(!this.conectado){
                fetch('./html/miUsuario.html')
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                    //Activar el evento de envío de form y registro solo cuando el html está cargado: 
                    requestAnimationFrame(() => {
                        this.configurarEventoLogin(); 
                        this.configurarEventoClickRegistro();
                    });
                })
                .catch(error => {
                    document.querySelector('.container__home').innerHTML = "<p>Lo siento, no se pudo cargar el contenido de esta página.</p>";
                });
            }
            //Está conectado, mostrar para poder hacer logout: 
            if(this.conectado){ 
                fetch('./html/logout.html')
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                    //Activar el click en el botón cerrar sesión:
                    this.configurarEventoLogout(); 
                })
                .catch(error => {
                    document.querySelector('.container__home').innerHTML = "<p>Lo siento, no se pudo cargar el contenido de esta página.</p>";
                });

            }
        }
        
    }

    configurarEventoClickRegistro(){
        const buttonRegister =  document.querySelector('.button-register');
        buttonRegister.addEventListener('click', () => {
            this.configurarEventoRegister(); 
        }); 
    }

    //Se cargan los juegos dinámicamente: 
    loadGameContent(game){
        if(game === 'ahorcado'){
            fetch('./html/ahorcado.html') 
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                    this.videojuegosInstanciados['ahorcado'].crearTecladoPantalla(); 
                    this.videojuegosInstanciados['ahorcado'].iniciarJuego();
                })
                .catch(error => {
                    document.querySelector('.container__home').innerHTML = "<p>Lo siento, no se pudo cargar el contenido de esta página.</p>";
                });
                
               
    
        }else if(game === 'juegoNumerico'){
            fetch('./html/juegoNumerico.html') 
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data 
                    this.videojuegosInstanciados['juegoNumerico'].inicioJuegoBoton();  
                    const botonVolver = document.getElementById('volverJugar');
                })
                .catch(error => {
                    document.querySelector('.container__home').innerHTML = "<p>Lo siento, no se pudo cargar el contenido de esta página.</p>";
                });
    
        }else if(game === 'tresEnRaya'){
            fetch('./html/tresEnRaya.html')
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data 
                    this.videojuegosInstanciados['tresEnRaya'].iniciarJuego();
                })
                .catch(error => {
                    document.querySelector('.container__home').innerHTML = "<p>Lo siento, no se pudo cargar el contenido de esta página.</p>";
                });
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

    //Método para cambiar el hash y mostrar la pantalla correspondiente: 
    router(){
        const router = location.hash.slice(1);

        if(router === 'home'){
            this.loadContent('Home');
        } else if(router === 'misJuegos'){
            console.log("entro en mis juegos");
            this.loadContent('Mis juegos'); 
        } else if(router === 'miUsuario'){
            this.loadContent('Mi usuario'); 
        }

    }

    //Método para el login: 
    configurarEventoLogin(){
        
        if(this.eventoLogin) return; 

        this.eventoLogin = true;
        //Escucha el envío de login y hace la llamada al backend:
        const loginForm = document.querySelector('.form__miUsuario');
        loginForm.addEventListener('submit', async (e) => {
            console.log("Submit form detectado");
            e.preventDefault(); 

            //Acedo a los input/name del form: 
            const email = loginForm.email.value;
            const password = loginForm.password.value;

            //Valido los campos desde el frontend, si estan vacíos, no hago fetch: 
            if(!email || !password){
                const errorDiv = document.querySelector('.mensaje-error'); 
                errorDiv.textContent = 'Por favor, completa todos los campos.';
                return; 
            }

            //Voy al backend para confirmar:
            try{
                const respuesta = await fetch('http://127.0.0.1:8000/api/v1/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json'
                    },
                    //Primero creo un objeto, luego se pasa a json: 
                    body: JSON.stringify({ email, password })
                }); 

                //Respuesta servidor fuera de rango 200-299: 
                if(!respuesta.ok){
                    const errorData = await respuesta.json();
                    //Me aseguro si el error ha sido por credenciales incorrectas: 
                    throw new Error(errorData.message);
                }

                //Si ha funcionado, convierto la respuesta de json a un obj de js: 
                const data = await respuesta.json(); 
                //Guardo el token: 
                localStorage.setItem('token', data.token);
                //Usuario conectado: 
                this.conectado = true; 
                //Redigirijo a mis juegos:
                app.loadContent('Mis juegos'); 


            }catch(e){  
                const errorDiv = document.querySelector('.mensaje-error'); 
                //Solo muestro mensaje real si viene de mi backend: 
                if (e.message) {
                    errorDiv.textContent = e.message;
                }else {
                    //Error de red, servidor caído, URL mal escrita, etc.
                    errorDiv.textContent = 'Ocurrió un error inesperado. Inténtalo más tarde.';
                }
            }


        }); 
    }

    //Método para el logout:
    configurarEventoLogout(){
        if(this.eventoLogout) return;
        this.eventoLogout = true;
        const buttonLogout = document.querySelector('.btn-logout');

        buttonLogout.addEventListener('click', async () => {
            try{
                //Recupero el token :
                const token = localStorage.getItem('token'); 

                const respuesta = await fetch('http://127.0.0.1:8000/api/v1/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if(!respuesta.ok){
                    throw new Error();
                }else{
                    //Usuario desconectado: 
                    this.conectado = false; 
                    //Redigirijo a mis juegos:
                    app.loadContent('Mi usuario'); 
                    console.log("He conseguido cerrar sesión"); 
                }

            }catch(e){
                const errorDiv = document.querySelector('.mensaje-error'); 
                errorDiv.textContent = 'Ocurrió un error inesperado. Inténtalo más tarde.'; 
                
            } 
        }); 
    }

    configurarEventoRegister(){
        if(this.eventoRegister) return;
        this.eventoRegister = true; 
        console.log("entro en configurar evento register");
        //Cojo form: 
        const registerForm = document.querySelector('.form__register'); 
        //Cojo los divs donde voy a mostrar los errores:
        const errorName = document.querySelector('.nameRegister');
        const errorEmail = document.querySelector('.emailRegister');
        const errorPassword = document.querySelector('.passwordRegister');
        const errorPasswordConfirm = document.querySelector('.passwordConfirmationRegister'); 


        //Le añado el evento: 
        registerForm.addEventListener('submit', async (e) => {
            console.log("Submit form detectado");
            e.preventDefault();
            //Limpio los mensajes de error:
            errorName.textContent = '';
            errorEmail.textContent = '';
            errorPassword.textContent = '';
            errorPasswordConfirm.textContent = '';

            // Accedo a inputs: 
            const name = registerForm.nameRegister.value;
            const email = registerForm.emailRegister.value;
            const password = registerForm.passwordRegister.value;
            const passwordConfirm = registerForm.passwordConfirmationRegister.value; 

            //Voy al backend para confirmar:
            try{
                const respuesta = await fetch('http://127.0.0.1:8000/api/v1/register', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json', //-->Le dice a laravel que le estoy enviando un json. 
                        'Accept': 'application/json', //-->Le dice a laravel que quiero recibir un json, no redirecciones. 
                    },
                    //Primero convierto a objeto js y luego a json: 
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        password_confirmation: passwordConfirm, 
                    })
                });

                //Respuesta servidor si algo ha fallado, 422 + mensaje de error:
                if(!respuesta.ok){
                    //Cojo el error y lo convierto a objeto js: 
                    const errorData = await respuesta.json();
                    //Envío el catch todo el objeto: 
                    throw errorData; 
                }
                //Si ha funcionado, convierto la respuesta de json a un obj de js:
                const data = await respuesta.json();
                //Guardo el token:
                localStorage.setItem('token', data.token);
                //Usuario conectado:
                this.conectado = true;
                //Cierro el modal:
                document.querySelector('.modal-backdrop')?.remove();
                //Redigirijo a mis juegos:
                app.loadContent('Mis juegos'); 

            }catch(e){ 
                //Manejo los errores:
                if(e.errors){
                    if(e.errors.name){
                        errorName.textContent = e.errors.name[0];
                    }
                    if(e.errors.email){
                        errorEmail.textContent = e.errors.email[0];
                    }
                    if(e.errors.password){
                        errorPassword.textContent = e.errors.password[0];
                    }
                    if(e.errors.password_confirmation){
                        errorPasswordConfirm.textContent = e.errors.password_confirmation[0];
                    }

                }else{
                    //Error de red, servidor caído, URL mal escrita, etc.
                    errorPasswordConfirm.textContent = 'Ocurrió un error inesperado. Inténtalo más tarde.'; 
                }
            }  
        }) 

    }
} 