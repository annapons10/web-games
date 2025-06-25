# Juegos Lógicos en la Web

Bienvenid@ a **Juegos en la Web**. Este proyecto me ha servido para mejorar y trabajar mi lógica desarrollando varios juegos con frontend y backend. Todos los juegos están construidos con **JavaScript**, **CSS**, y **HTML**.

## Juegos Disponibles

### 1. Juego Numérico
Un juego en el que debes de elegir la respuesta entre 1, 2 o 3 en base a una operación matemática. Perfecto para ejercitar tus habilidades matemáticas y lógicas de manera divertida. 

### 2. Ahorcado
La clásica versión del ahorcado, donde tendrás que adivinar una palabra antes de que el muñeco quede completamente ahorcado. Un reto para tu vocabulario y rapidez mental.

### 3. Tres en Raya 
Podrás competir para alinear tres símbolos (X o O) en una fila, columna o diagonal, y el primero en lograrlo ganará. 

## Tecnologías Utilizadas

- **JavaScript**: El lenguaje principal para la lógica y la interacción en todos los juegos.
- **CSS**: Usado para los estilos y diseño de la interfaz de usuario, asegurando una experiencia atractiva y fluida.
- **HTML**: La base estructural de la web.
- **Laravel**: Framework backend para construir la API RESTful. 

## Cómo Jugar

1. Abre el proyecto en tu navegador.
2. Selecciona el juego que deseas jugar desde la interfaz principal.
3. Sigue las instrucciones dentro de cada juego. 


## Funcionalidades Backend 🖥️

Este proyecto incluye una API backend que añade funcionalidades como autenticación y gestión de datos. Está desarrollada con **Laravel** y actualmente permite:

- Registro e inicio de sesión de usuarios.
- Logout y gestión de sesiones.
- Visualización y almacenamiento de puntuaciones por usuario y por juego.
- Gestión de usuarios. 

### 🔑 Endpoints principales

| Método | Endpoint            | Descripción                                    |
|--------|-------------------- |------------------------------------------------|
| POST   | `/api/v1/register`  | Registrar un nuevo usuario                     |
| POST   | `/api/v1/login`     | Iniciar sesión y recibir token                 |
| POST   | `/api/v1/logout`    | Cerrar sesión del usuario y eliminar el token  |
| GET    | `/api/v1/users/:id` | Obtener datos de usuario, juegos y puntuaciones|
| DELETE | `/api/v1/users/:id` | Eliminar cuenta de usuario                     |
| PATCH  | `/api/v1/scores/:id`| Actualizar una puntuación existente            | 

> ⚠️ Algunos endpoints requieren autenticación mediante token. 