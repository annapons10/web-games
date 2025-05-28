<?php

return [
    'paths' => ['*'], 
    //Métodos que quiero permitir en CORS:
    'allowed_methods'   => ['*'],
    //Desde donde permito el acceso sin que interfiera el CORS:
    'allowed_origins' => ['*'], 
    
    //Si quiero permitir subdominios de annaponsprojects.com para que puedan hacer peticiones CORS: 
    'allowed_origins_patterns' => [
        '/^https?:\/\/([a-z0-9-]+\.)?annaponsprojects\.com$/',
    ],

    //Headers que quiero permitir recibir en las peticiones de frontend: 
    'allowed_headers'   => ['*'],

    'exposed_headers' => [],
    //No vuelve a hacer el preflight hasta pasada 1 hora: 
    'max_age' => 3600, 
    //Indica si el navegador puede enviar cookies (funciona con tokens):
    'supports_credentials' => false, 
]; 