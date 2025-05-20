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

### 🛠 Endpoints principales

### 🟢 Login de usuario

- **Método:** `POST`
- **URL:** `/api/v1/login`

#### 📥 Body (JSON)
```json
{
  "email": "usuario@correo.com",
  "password": "contraseña123"
}

### 🟢 Registro de usuario

- **Método:** `POST`
- **URL:** `/api/v1/register`

#### 📥 Body (JSON)
```json
{
  "name": "Nombre del usuario",
  "email": "usuario@correo.com",
  "password": "contraseña123"
}

### 🟢 Logout de usuario

- **Método:** `POST`
- **URL:** `/api/v1/logout`

#### 📥 Headers 
- Content-Type: application/json,
- Authorization: Bearer TU_TOKEN


