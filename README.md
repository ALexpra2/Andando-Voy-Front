# Andando Voy - Frontend

Este proyecto está desarrollado en **React** y ofrece una plataforma integral orientada a los amantes del senderismo y la naturaleza. En Andando Voy, los usuarios pueden explorar rutas de senderismo compartidas por la comunidad, disfrutar de un blog especializado en naturaleza, montañismo y actividades al aire libre, y acceder a un marketplace donde encontrar material deportivo. Además, cada usuario cuenta con un área privada para crear, gestionar y consultar sus propias rutas.

---

## Tecnologías principales

- **React**: Framework principal para construir la interfaz de usuario.
- **React Router**: Navegación entre distintas vistas y rutas protegidas.
- **Leaflet**: Biblioteca de mapas interactivos para mostrar las rutas.
- **Swiper**: Carruseles para mostrar rutas destacadas, productos y entradas de blog.
- **Firebase Authentication**: Autenticación de usuarios para acceso a áreas privadas.

---

## Estructura del Proyecto

- **Páginas públicas**:

  - **Listado de rutas**: Publicadas por todos los usuarios.
  - **Blog de naturaleza**: Noticias, consejos y artículos relacionados.
  - **Marketplace**: Material deportivo para senderismo y montanismo.
  - Cada sección incluye **carruseles** de informacion de guías para las rutas.

- **Accesos privados**:

  - **/dashboard** (Usuarios registrados):
    - Crear, visualizar y eliminar rutas personales.
    - Consultar estadísticas de actividad.
  - **/admin** (Administradores):
    - Gestionar entradas del blog, productos del marketplace y perfiles de guías.

---

## Instalación y puesta en marcha

1. **Clonar el repositorio**

```bash
https://github.com/ALexpra2/Andando-Voy-Front
```

2. **Instalar las dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables (sustituyendo datos sensibles si es necesario):

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

VITE_API_URL=
```

4. **Iniciar el proyecto**

```bash
npm run dev
```

---

## Autor

- **Nombre:** Alejandro Prados
- **Repositorio:** [https://github.com/ALexpra2/Andando-Voy-Front](https://github.com/ALexpra2/Andando-Voy-Front)

---

Si quieres colaborar o reportar errores, no dudes en abrir un issue o pull request 🚀.


