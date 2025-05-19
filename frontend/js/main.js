//TRAIGO LO QUE HAY EN HEADER.HTML PERO ESTOY EN INDEX.HTML 
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
        console.error('Error cargando contenido:', error.message);
        document.getElementById('header').innerHTML = "<p>Lo siento, no se pudo cargar el contenido del menú de la página.</p>";
    });


//TRAIGO LO QUE HAY EN footer.HTML PERO ESTOY EN INDEX.HTML
fetch('./html/footer.html')
    .then(response => {
        //Si hay un error lo lanzo para que catch lo coja. 
        if(!response.ok){
            throw new Error(`Error al cargar footer.html: ${response.statusText}`);
        }
        //Si ese exitosa, contiunuamos. 
        return response.text(); 
    })
    .then(data =>{
        document.getElementById('footer').innerHTML = data;
    })

    .catch(error => {
        console.error('Error cargando contenido:', error.message);
        document.getElementById('footer').innerHTML = "<p>Lo siento, no se pudo cargar el contenido del pie de página.</p>";
    });

//Instancio la game App y cargo lo primero el home con las fotos de los juegos:
const app = new GameApp();
app.loadContent('Home'); 


//Añado los eventos para poder ir para atrás y adelante de la página (Router): 
window.addEventListener('hashchange', app.router.bind(app)); 