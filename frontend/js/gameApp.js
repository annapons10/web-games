
//import { API } from './config.js';
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
        //¿ME GUARDO TODOS LOS SCORES CON LOS ID DE LOS JUEGOS DE ESTE USER EN CONCRETO? ¿LOS PASO A CADA JUEGO? 
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
       
    }

    //Método para recuperar los datos del usuario si los hay: 
    recoverUserData(){
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            this.user = JSON.parse(storedUser); 
        }else{
            this.resetUserData();
        } 
    }

    resetEvents(){ 
        this.eventoLogin = false;
        this.eventoRegister = false; 
        this.eventoLogout = false;
    }  

    resetUserData(){  
        this.user = {
            id: null,
            token: null,
            conectado: false,
        }
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
    //AÑADIR A PROPIEDADES THIS.CONECTADO PARA SABER SI ESTÁ CONECTADO O NO Y SUMARLE PUNTUACIÓN A LOS JUEGOS: 
    instanciarJuego(id){
        if(id === 'ahorcado' && !this.videojuegosInstanciados[id]){
            this.videojuegosInstanciados[id] = new JuegoAhorcado(7, this.user);
        }else if(id === 'juegoNumerico' && !this.videojuegosInstanciados[id]){
            this.videojuegosInstanciados[id] = new JuegoNumerico(10, ['+', '-'], 3, 4, this.user); 
        }else if(id === 'tresEnRaya' && !this.videojuegosInstanciados[id]){
            this.videojuegosInstanciados[id] = new JuegoTresEnRaya(this.user); 
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
        const errorDiv = document.querySelector('.errorLogin'); 
        loginForm.addEventListener('submit', async (e) => { 
            e.preventDefault(); 

            //Acedo a los input/name del form: 
            const email = loginForm.email.value;
            const password = loginForm.password.value;

            //Valido los campos desde el frontend, si estan vacíos, no hago fetch: 
            if(!email || !password){
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
                    if(errorData.message){
                        errorDiv.textContent = errorData.message;
                        return; 
                    }else{
                        //Si no es por credenciales, lanzo un error genérico:
                        errorDiv.textContent = 'Ocurrió un error inesperado. Inténtalo más tarde.';
                        return;
                    }
                }

                //Si ha funcionado, convierto la respuesta de json a un obj de js: 
                const data = await respuesta.json(); 

                //Guardo los datos del usuario: 
                this.user.id = data.id;
                this.user.token = data.token;
                this.user.conectado = true; 

                //Guardo el user en localStorage (pasándolo a json): 
                localStorage.setItem('user', JSON.stringify(this.user));

                //Redigirijo a mis juegos:
                app.loadContent('Mis juegos'); 

                //CUANDO SE HACE LOGIN, PREGUNTO SI HAY SCORE PARA CADA JUEGO CON ESTE USER, SI NO, SE CREA UN SCORE CON 0: (¿NO HACE FALTA SI YA SE CREAN EN REGISTER?)

            }catch(e){  
                console.error(e);
                //Error de red, servidor caído, URL mal escrita, etc.
                errorDiv.textContent = 'Ocurrió un error inesperado. Inténtalo más tarde.'; 
            }


        }); 
    }

    //Método para el logout:
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
                    errorDiv.textContent = 'Error al cerrar sesión. Inténtalo más tarde.';
                    return; 

                }

                this.resetEvents(); 
                //Borro el token:
                localStorage.removeItem('user');
                this.resetUserData(); 
                this.scores = []; 

                //Redigirijo a mis juegos:
                app.loadContent('Mi usuario'); 

            }catch(e){

                errorDiv.textContent = 'Error de red o servidor. Inténtalo más tarde.'; 
            } 
        }); 
    }

    configurarEventoRegister(){
        if(this.eventoRegister) return;
        this.eventoRegister = true; 
        //Cojo form: 
        const registerForm = document.querySelector('.form__register'); 
        const error = document.querySelector('.error');

        //Le añado el evento: 
        registerForm.addEventListener('submit', async (e) => { 
            e.preventDefault();
            this.limpiarErroresFormulario();

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

                //Se sale del rango 200-299:
                if(!respuesta.ok){
                    //Cojo el error y lo convierto a objeto js: 
                    const errorData = await respuesta.json();
                    //Manejo aquí los errores que me devuelve el backend:
                    if(errorData.errors){
                        //Si hay errores, los muestro en el formulario: 
                        this.mostrarErroresFormulario(errorData.errors);
                        return;
                    }
                    if(errorData.message){
                        //Si hay un mensaje de error, lo muestro:
                        error.textContent = errorData.message;
                        return;
                    }
                    //Lanzo un error genérico si no hay errores específicos:
                    error.textContent = 'Ocurrió un error inesperado. Inténtalo más tarde.';

                }
                //Si ha funcionado, convierto la respuesta de json a un obj de js:
                const data = await respuesta.json();

                //Guardo datos suario conectado:
                this.user.id = data.id;
                this.user.token = data.token;
                this.user.conectado = true;

                this.scores = data.user.scores; 
                console.log(`estos son los scores:`, this.scores); 

                //Guardo el user con token en localStorage: 
                localStorage.setItem('user', JSON.stringify(this.user)); 

                //Cierro el modal:
                document.querySelector('.modal-backdrop')?.remove();

                //Redigirijo a mis juegos:
                app.loadContent('Mis juegos'); 

                //AL HACER REGISTER, SE CREA UN SCORE PARA CADA JUEGO EN 0 DE ESTE USER:  

            }catch(e){ 
                //Manejo los errores de conexión, url, etc:
                error.textContent = 'Error de red o servidor. Inténtalo más tarde.'; 
            }  
        }) 

    }

    objetoDivsErrores(){
        //Cojo los divs donde voy a mostrar los errores:
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

        //Limpio los mensajes de error:
        errorName.textContent = '';
        errorEmail.textContent = '';
        errorPassword.textContent = '';
        errorPasswordConfirm.textContent = '';
    }
} 