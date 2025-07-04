//Punto de entrada de la aplicación, aquí se importan los módulos y se inicializa la aplicación.

import { GameApp } from './gameApp.js';

//Traer lo que hay en el header y footer de los archivos html. 
fetch('./html/header.html') 
    .then(response => {
        if(!response.ok){
            throw new Error(`Error al cargar header.html: ${response.statusText}`);
        }
        return response.text(); 
    })
        
    .then(data =>{
        document.getElementById('header').innerHTML = data; 
        //PARA CERRAR HAMBURGUESA CUANDO DOY CLICK EN ALGUNA OPCIón:
        //Devuelve un array. 
        let elementosMenu = document.querySelectorAll('.nav-links > li');
        elementosMenu.forEach(elemento => {
            elemento.addEventListener('click', ()=>{
                //checked accede a la propiedad de html que esta aunque no lo vea. 
                document.getElementById('open-menu').checked = false; 
            });
        });
    })

    .catch(error => {
        document.getElementById('header').innerHTML = "<p>Lo siento, no se pudo cargar el contenido del menú de la página.</p>";
    });


fetch('./html/footer.html')
    .then(response => {
        if(!response.ok){
            throw new Error(`Error al cargar footer.html: ${response.statusText}`);
        }
        return response.text(); 
    })
    .then(data =>{
        document.getElementById('footer').innerHTML = data;
    })

    .catch(error => {
        document.getElementById('footer').innerHTML = "<p>Lo siento, no se pudo cargar el contenido del pie de página.</p>";
    });

const app = new GameApp();
app.loadContent('Home');
//Recuperar datos user si los hay. 
app.recoverUserData(); 

app.activarEventoHashChange(); 