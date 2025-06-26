# 🎮 API de Juegos - Backend en Laravel

Este proyecto es una API RESTful desarrollada en **Laravel** para una app de juegos en JavaScript. Permite registrar usuarios, iniciar sesión, autenticarse mediante **tokens** con Sanctum, y gestionar funcionalidades protegidas como mostrar puntuaciones.

---

## 🚀 Tecnologías utilizadas

- PHP 
- Laravel 
- Laravel Sanctum
- MySQL 

---

## 🔐 Autenticación

La autenticación se maneja mediante **Laravel Sanctum**. Al iniciar sesión exitosamente, se genera un **token de acceso** que se debe incluir en las peticiones protegidas.

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