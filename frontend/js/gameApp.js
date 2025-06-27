import { API } from './config.js';
import { JuegoAhorcado } from './juegoAhorcado.js';
import { JuegoNumerico } from './juegoNumerico.js';
import { JuegoTresEnRaya } from './juegoTresEnRaya.js';

export class GameApp{
    constructor(){
        this.videojuegos = [
            { id: "ahorcado", nombre: "Juego Ahorcado", tipo: "Palabras", puntuacion: 0 },
            { id: "juegoNumerico", nombre: "Juego Numérico", tipo: "Matemáticas", puntuacion: 0 },
            { id: "tresEnRaya", nombre: "Juego Tres En Raya", tipo: "Estrategia", puntuacion: 0 }
        ];
        //Objeto donde voy a guardar las instancias para luego acceder a sus métodos. 
        this.videojuegosInstanciados = {} ;
        this.user = {
            id: null,
            token: null,
            conectado: false,
        }; 
        this.scores = []; 
        //Para no añadir más de un evento a los formularios:
        this.eventoLogin = false;
        this.eventoRegister = false; 
        this.eventoLogout = false; 
        this.eventoEliminarUsuario = false; 
       
    }

    //Recuperar los datos del usuario si los hay: 
    recoverUserData(){ 
        const storedUser = localStorage.getItem('user');
        const storeScores = localStorage.getItem('scores'); 
        if(storedUser && storeScores){
            this.user = JSON.parse(storedUser); 
            this.scores = JSON.parse(storeScores); 
        }else{
            this.resetUserData();
            this.resetScoresData(); 
        } 
    } 

    resetScoresData(){
        this.scores = [];
    }

    resetEvents(){ 
        this.eventoLogin = false;
        this.eventoRegister = false; 
        this.eventoLogout = false;
        this.eventoEliminarUsuario = false; 
    }  

    resetUserData(){  
        this.user = {
            id: null,
            token: null,
            conectado: false,
        } 
    }


    //Clicks de los botones de los juegos para cargar html y instanciar los juegos:
    crearEventosParaTodosLosJuegosAlHacerClick(){
        const botonesImagenesJuegos = document.querySelectorAll('.img-button');
        botonesImagenesJuegos.forEach(boton => {
            boton.addEventListener('click', () =>{
                const juego = boton.getAttribute('data-game');
                //Cambiar hash de la URL : 
                const nuevoHash = `#${juego}`;
                location.hash = nuevoHash; 
                this.instanciarJuego(juego);
                //Asegura que el dom está cargado y tengo las instancias para llamar a sus métodos. 
                setTimeout(() => {
                    this.loadGameContent(juego);
                }, 100);

            });
        });
    }

  
    //INSTANCIAR LOS JUEGOS DEPENDIENDO DE DÓNDE HAGA CLICK EL USUARIO: 
    instanciarJuego(id){
        if(id === 'ahorcado' && !this.videojuegosInstanciados[id]){
            this.videojuegosInstanciados[id] = new JuegoAhorcado(7, this.user, this.scores[0]);
        }else if(id === 'juegoNumerico' && !this.videojuegosInstanciados[id]){
            this.videojuegosInstanciados[id] = new JuegoNumerico(10, ['+', '-'], 3, 4, this.user, this.scores[1]); 
        }else if(id === 'tresEnRaya' && !this.videojuegosInstanciados[id]){
            this.videojuegosInstanciados[id] = new JuegoTresEnRaya(this.user, this.scores[2]); 
        }
    }

    //Cargar dinámicamente las páginas en index.html en main depdende de donde haga click: 
    loadContent(page){ 

        if(page === 'Home'){
            //TRAIGO LO QUE HAY EN HEADER.HTML PERO ESTOY EN INDEX.HTML
            fetch('./html/home.html') 
                .then(response => response.text() )
                .then(data =>{
                    document.getElementById('main').innerHTML = data; 
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
            if(!this.user.conectado){
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
            if(this.user.conectado){ 
                fetch('./html/logout.html')
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                    //Activar el click en el botón cerrar sesión: 
                    this.configurarEventoLogout();  
                    this.configurarEventoEliminarUsuario(); 
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

    //Cargar los juegos dinámicamente: 
    loadGameContent(game){
        if(game === 'ahorcado'){
            fetch('./html/ahorcado.html') 
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                    this.videojuegosInstanciados['ahorcado'].crearTecladoPantalla(); 
                    this.videojuegosInstanciados['ahorcado'].mostrarModalInicio(); 
                    this.videojuegosInstanciados['ahorcado'].iniciarJuego();
                })
                .catch(error => {
                    document.querySelector('.ahorcado__container').innerHTML = "<p>Lo siento, no se pudo cargar el contenido de esta página.</p>";
                });
                
               
    
        }else if(game === 'juegoNumerico'){
            fetch('./html/juegoNumerico.html') 
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data 
                    this.videojuegosInstanciados['juegoNumerico'].mostrarModalInicio(); 
                    this.videojuegosInstanciados['juegoNumerico'].inicioJuegoBoton();  
                    const botonVolver = document.getElementById('volverJugar');
                })
                .catch(error => {
                    document.querySelector('.general__container').innerHTML = "<p>Lo siento, no se pudo cargar el contenido de esta página.</p>";
                });
    
        }else if(game === 'tresEnRaya'){
            fetch('./html/tresEnRaya.html')
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data 
                    this.videojuegosInstanciados['tresEnRaya'].mostrarModalInicio(); 
                    this.videojuegosInstanciados['tresEnRaya'].iniciarJuego();
                })
                .catch(error => {
                    document.querySelector('.container').innerHTML = "<p>Lo siento, no se pudo cargar el contenido de esta página.</p>";
                });
        }
    }

    //MOSTRAR JUEGOS EN PANTALLA CUANDO EL USUARIO HAGA CLICK EN "MIS JUEGOS":
    async mostrarJuegosEnPantalla(){
        // Inicializar una variable para acumular el HTML.
        let juegosHTML = ''; 

        if(this.user.conectado === false){
            juegosHTML += `
               <p>Para llevar un seguimiento de tus juegos, regístrate o inicia sesión. </p>
            `
            document.getElementById('gamesContainer').innerHTML = juegosHTML; 
            return; 
        }

        //Conectar con la BD para mostrar los juegos/puntuación: 
            try{
                const respuesta = await fetch(`http://127.0.0.1:8000/api/v1/users/${this.user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json'
                    } 
                }); 

                //Respuesta servidor fuera de rango 200-299: 
                if(!respuesta.ok){
                    const errorData = await respuesta.json();
                    juegosHTML += `
                        <p>Ocurrió un error inesperado. Inténtalo más tarde.</p>
                    `
                
                }
 
                if(respuesta.ok){
                    const data = await respuesta.json(); 
                    data.scores.map((score) => {
                        juegosHTML += `
                            <div class="card">
                                <div class="card__inner">
                                    <div class="card__front">
                                        <h3 class="h3__card">${score.game.name}</h3>
                                    </div>
                                    <div class="card__back">
                                        <p class="nuevoP">Género: ${score.game.genre.name}</p>
                                        <p class="nuevoP">Puntuación: ${score.score}</p>
                                    </div>
                                </div>
                            </div>
                        `
                    }); 
                }

            }catch(e){  
                //Error de red, servidor caído, URL mal escrita, etc.
                juegosHTML += `
                    <p>Ocurrió un error inesperado. Inténtalo más tarde.</p>
                `
            } 

            document.getElementById('gamesContainer').innerHTML = juegosHTML; 
     
    } 

    //Cambiar el hash y mostrar la pantalla correspondiente: 
    router(){
        const router = location.hash.slice(1);

        if(router === 'home'){
            this.loadContent('Home');
        } else if(router === 'misJuegos'){ 
            this.loadContent('Mis juegos'); 
        } else if(router === 'miUsuario'){
            this.loadContent('Mi usuario'); 
        }

    } 

    //El login: 
    configurarEventoLogin(){ 
        if(this.eventoLogin) return; 

        this.eventoLogin = true;
        //Escucha el envío de login y hace la llamada al backend:
        const loginForm = document.querySelector('.form__miUsuario');
        const errorDiv = document.querySelector('.errorLogin'); 
        loginForm.addEventListener('submit', async (e) => { 
            e.preventDefault(); 

            //Aceder a los input/name del form: 
            const email = loginForm.email.value;
            const password = loginForm.password.value;

            //Validar los campos desde el frontend, si estan vacíos, no hacer fetch: 
            if(!email || !password){
                errorDiv.textContent = 'Por favor, completa todos los campos.';
                return; 
            }

            //Ir al backend para confirmar:
            try{
                const respuesta = await fetch('http://127.0.0.1:8000/api/v1/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json'
                    },
                    //Crear un objeto, luego se pasar a json: 
                    body: JSON.stringify({ email, password })
                }); 

                //Respuesta servidor fuera de rango 200-299: 
                if(!respuesta.ok){
                    const errorData = await respuesta.json();
                    //Error por credenciales incorrectas: 
                    if(errorData.message){
                        errorDiv.textContent = errorData.message;
                        return; 
                    }else{
                        //Lanzar un error genérico:
                        errorDiv.textContent = 'Ocurrió un error inesperado. Inténtalo más tarde error.';
                        return;
                    }
                }

                //Convertir la respuesta de json a un obj de js: 
                const data = await respuesta.json(); 

                //Guardar datos user conectado:  
                this.user.id = data.user.id; 
                this.user.token = data.token;
                this.user.conectado = true; 
                this.scores = data.user.scores; 

                //Guardar el user en localStorage (pasándolo a json): 
                localStorage.setItem('user', JSON.stringify(this.user));
                //Y los scores:
                localStorage.setItem('scores', JSON.stringify(this.scores)); 

                //Redigirigir a mis juegos:
                app.loadContent('Mis juegos'); 

            }catch(e){  
                //Error de red, servidor caído, URL mal escrita, etc.
                errorDiv.textContent = 'Ocurrió un error inesperado. Inténtalo más tarde.'; 
            }


        }); 
    }

    //Logout:
    configurarEventoLogout(){ 
        if(this.eventoLogout) return; 
        this.eventoLogout = true;
        const buttonLogout = document.querySelector('.btn-logout');
        const errorDiv = document.querySelector('.errorLogout'); 

        buttonLogout.addEventListener('click', async () => { 
            try{ 
                const respuesta = await fetch('http://127.0.0.1:8000/api/v1/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.user.token}`, 
                    }
                });

                if(!respuesta.ok){

                    if(respuesta.status === 401){
                        errorDiv.textContent = 'No estás autorizado para cerrar sesión. Por favor, inicia sesión primero.'; 
                        return;
                    }
                    if(respuesta.status === 500){
                        errorDiv.textContent = 'Error al cerrar sesión. Inténtalo más tarde.'; 
                        return;
                    } 

                }

                this.resetEvents(); 
                //Borrar el token:
                localStorage.removeItem('user');
                localStorage.removeItem('scores'); 
                this.resetUserData(); 
                this.resetScoresData();
                //Vaciar juegos intanciados para que se vuelvan a instanciar con this.user en false:
                this.videojuegosInstanciados = {}; 

                //Redigirigir a mis juegos: 
                app.loadContent('Mi usuario'); 

            }catch(e){

                errorDiv.textContent = 'Error de red o servidor. Inténtalo más tarde.'; 
            } 
        }); 
    }

    configurarEventoRegister(){
        if(this.eventoRegister) return;
        this.eventoRegister = true; 
        //Coger form: 
        const registerForm = document.querySelector('.form__register'); 
        const error = document.querySelector('.error');

        //Añadir el evento: 
        registerForm.addEventListener('submit', async (e) => { 
            e.preventDefault();
            this.limpiarErroresFormulario();

            // Acceder a inputs: 
            const name = registerForm.nameRegister.value;
            const email = registerForm.emailRegister.value;
            const password = registerForm.passwordRegister.value;
            const passwordConfirm = registerForm.passwordConfirmationRegister.value; 

            //Ir al backend para confirmar:
            try{
                const respuesta = await fetch('http://127.0.0.1:8000/api/v1/register', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json', //-->Le dice a laravel que le estoy enviando un json. 
                        'Accept': 'application/json', //-->Le dice a laravel que quiero recibir un json, no redirecciones. 
                    },
                    //Convertir a objeto js y luego a json: 
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        password_confirmation: passwordConfirm, 
                    })
                });

                //Se sale del rango 200-299:
                if(!respuesta.ok){
                    //Coger el error y pasar a objeto js: 
                    const errorData = await respuesta.json();
                    //Manejar aquí los errores que devuelve el backend:
                    if(errorData.errors){
                        //Errores, mostrar form: 
                        this.mostrarErroresFormulario(errorData.errors);
                        return;
                    }
                    if(errorData.message){
                        error.textContent = errorData.message;
                        return;
                    }
                    //Error genérico, mostrar form: 
                    error.textContent = 'Ocurrió un error inesperado. Inténtalo más tarde.';

                }
                //Convertir la respuesta de json a un obj de js:
                const data = await respuesta.json();

                //Guardar datos suario conectado:
                this.user.id = data.user.id; 
                this.user.token = data.token;
                this.user.conectado = true;

                this.scores = data.user.scores; 

                //Guardar el user con token en localStorage: 
                localStorage.setItem('user', JSON.stringify(this.user)); 
                //Y los scores:
                localStorage.setItem('scores', JSON.stringify(this.scores)); 

                //Cerrar el modal:
                document.querySelector('.modal-backdrop')?.remove();

                //Redirigir a mis juegos:
                app.loadContent('Mis juegos'); 

                //AL HACER REGISTER, SE CREA UN SCORE PARA CADA JUEGO EN 0 DE ESTE USER:  

            }catch(e){ 
                //Manejar los errores de conexión, url, etc:
                error.textContent = 'Error de red o servidor. Inténtalo más tarde.'; 
            }  
        }) 

    }

    configurarEventoEliminarUsuario(){
        if(this.eventoEliminarUsuario) return; 
        this.eventoEliminarUsuario = true;
        const buttonDelete = document.querySelector('.btn-delete');
        const errorDiv = document.querySelector('.errorLogout'); 

        buttonDelete.addEventListener('click', async () => { 
            try{ 
                const respuesta = await fetch(`http://127.0.0.1:8000/api/v1/users/${this.user.id}`, {
                    method: 'DELETE',
                     headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'  
                    } 
                });

                if(!respuesta.ok){
                    errorDiv.textContent = 'Error al eliminar la cuenta. Inténtalo más tarde.';
                    return; 
                }

                this.resetEvents(); 
                //Borrar el token:
                localStorage.removeItem('user');
                localStorage.removeItem('scores'); 
                this.resetUserData(); 
                this.resetScoresData();
                //Vaciar juegos intanciados para que se vuelvan a instanciar con this.user en false:
                this.videojuegosInstanciados = {}; 

                app.loadContent('Mis Juegos'); 

            }catch(e){
                errorDiv.textContent = 'Error de red o servidor. Inténtalo más tarde.'; 
            } 
        }); 

    }

    objetoDivsErrores(){
        //Coger los divs donde mostrar los errores:
        const errorName = document.querySelector('.nameRegister');
        const errorEmail = document.querySelector('.emailRegister');
        const errorPassword = document.querySelector('.passwordRegister');
        const errorPasswordConfirm = document.querySelector('.passwordConfirmationRegister'); 

        const divErrores = {
            errorName,
            errorEmail,
            errorPassword,
            errorPasswordConfirm 
        }

        return divErrores; 
    }
    
    

    mostrarErroresFormulario(errors){
        //Destructuración de objetos: 
        const { errorName, errorEmail, errorPassword, errorPasswordConfirm } = this.objetoDivsErrores();

        if(errors.name){
            errorName.textContent = errors.name[0];
            return;
        }
        if(errors.email){
            errorEmail.textContent = errors.email[0];
            return; 
        }
        if(errors.password){
            errorPassword.textContent = errors.password[0];
            return; 
        }
        if(errors.password_confirmation){
            errorPasswordConfirm.textContent = errors.password_confirmation[0]; 
            return; 
        }
    }

    limpiarErroresFormulario(){
        //Destructuración de objetos: 
        const { errorName, errorEmail, errorPassword, errorPasswordConfirm } = this.objetoDivsErrores();

        //Limpiar los mensajes de error:
        errorName.textContent = '';
        errorEmail.textContent = '';
        errorPassword.textContent = '';
        errorPasswordConfirm.textContent = '';
    }
} 