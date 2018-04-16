# Instalación de la Aplicación (FRONTEND)


## Configuración del Servidor

Para una correcta instalación, el servidor debe tener las siguientes configuraciones obligatoriamente:

> [SERVER.md](SERVER.md)


Después recién llevar a cabo los siguientes pasos, que son necesarios para instalar la aplicación.


## Instalación del proyecto para Desarrollo

### Clonación

Clonarlo:

**Opción 1:** Si se generó llave SSH: (En los pasos del archivo SERVER.md)
```sh
$ git clone git@gitlab.geo.gob.bo:agetic/proyecto-base-frontend-vue.git
```
**Opción 2:** Si se quiere clonar el proyecto por HTTPS:
```sh
$ git clone https://usuario@gitlab.geo.gob.bo/agetic/proyecto-base-frontend-vue.git
```
Es posible que al descargar el proyecto con HTTPs, nos lance el siguiente error:
```sh
Cloning into 'nombre-del-proyecto'...
fatal: unable to access 'https://url-del-proyecto.git/': server certificate verification failed. CAfile: /etc/ssl/certs/ca-certificates.crt CRLfile: none
```
```sh
$ git config --global http.sslverify false
$ git clone https://usuario@gitlab.geo.gob.bo/agetic/proyecto-base-frontend-vue.git
```

**Después de clonar con cualquiera de las opciones anteriores:**

Ingresar a la carpeta:
```sh
$ cd proyecto-base-frontend-vue
```
Podemos verificar que estamos en el branch master:
```sh
$ git status
```
Nos devolverá:
```sh
- On branch master
```

`(Opcional)` Si necesitamos trabajar un branch específico (en este ejemplo, el nombre del branch es nombre_del_branch) ejecutamos:
```sh
$ git checkout nombre_del_branch
```

Al volver a verificar con git status:
```sh
$ git status
```
Se obtiene como respuesta que el proyecto se sitúa en el branch elegido:
```sh
- On branch nombre_del_branch
```
Para instalar la aplicación, se tienen las siguientes opciones:

#### Instalando dependencias npm, se recomienda usar `yarn` para una instalación correcta
```sh
$ yarn # o npm install
```
#### Configurar los datos de conexión a los servicios REST del backend

La configuración general se hace en los archivos `config/index.js`, `config/dev.env.js` y `config/prod.env.js`, a continuación se muestra un ejemplo de configuración:

```js
module.exports = {
  NODE_ENV: '"production"',
  API_URL: '"http://localhost:4000"',
  AUTH_URL: '"http://localhost:4000/autenticacion"',
  TIME_SESSION_EXPIRED: 30,
  ONBEFOREUNLOAD: true,
  AUTH_TOKEN: '"JWT"',
  LANG: '"es"',
  DEBUG_MODE: false
}
```
- **API_URL**: Servidor del backend donde apunta el frontend
  - Ejemplos
    - "server": "http://localhost:4000"
    - "server": "http://192.168.15.15:4000"
    - "server": "http://test.local.agetic.gob.bo/proyecto-api"
- **AUTH_URL**: Servidor del backend donde apunta el frontend
  - Ejemplos
    - "server": "http://localhost:4000/autenticacion"
    - "server": "http://192.168.15.15:4000/autenticacion"
    - "server": "http://test.local.agetic.gob.bo/proyecto-api/autenticacion"
- **TIME_SESSION_EXPIRED**: Tiempo en minutos para que la sesión se cierre automáticamente por inactividad
- **DEBUG_MODE**: Habilita los console.log (this.$log.log) para su visualización para producción es necesario deshabilitarlo con: false
- **ONBEFOREUNLOAD**: abre un alerta de confirmación cuando se intente cerrar o actualizar la pestaña del navegador
- **AUTH_TOKEN**: Tipo de token que requiere el backend
- **LANG**: Lenguaje por defecto del sistema en el frontend

Para la configuración del dominio donde se iniciará el frontend se la hace en el archivo `config/index.js` en la variable `assetsPublicPath`, por defecto los archivos minificados inician en la carpeta `dist/`
  - Ejemplos:
    - "assetsPublicPath": "/"
    - "assetsPublicPath": "/proyecto/"


#### Iniciar el proyecto en modo desarrollo
```sh
$ npm run dev
```
#### Iniciar servidor de autenticación fake (OPCIONAL)
```sh
$ npm run server
```

- Si al iniciar con `npm run dev` u otro comando se tiene el puerto ocupado executar el comando para detener el servicio:

```sh
$ sudo fuser -k [puerto]/tcp
```
Ejemplo:
```sh
$ sudo fuser -k 8080/tcp
```

## Instalación del proyecto para Producción

Para asegurarse de que se instalen todas las librerías necesarias hay que configurar el ambiente en modo desarrollo.

#### Instalando dependencias npm
```sh
$ yarn # o npm install
```

#### Configurar los datos de conexión a los servicios REST del backend

Seguir los pasos de `Configurar los datos de conexión a los servicios REST del backend`.

### Configurar entorno de producción

#### Crear los archivos minificados
```sh
$ npm run build
```
#### Iniciar el servidor para los archivos minificados
```sh
$ npm run server
```

### Extra
Puede ver un reporte detallado de los archivos minificados para producción ejecutar el comando:
```sh
$ npm run build --report
```
Luego ingresar a `http://localhost:8888`

## Configuración de **supervisor**
Si se desea hacer correr la aplicación mediante `supervisor` se debe realizar la siguiente configuración:

Navegar hasta la ruta:
```sh
$ cd /etc/supervisor/conf.d/
```
Crear un archivo para hacer correr la aplicación de frontend, en este ejemplo, se definirá el archivo bajo el nombre de `proyectoFrontendDEV`:
```sh
$ sudo touch proyectoFrontendDEV.conf
```
**Para hacer correr la versión comprimida, colocar en el archivo el siguiente contenido:**
##### Sin variable de entorno
```sh
[program:proyectoFrontendDEV]
directory=/home/usuario/rutaProyecto/proyecto-base-frontend-vue
command=/home/usuario/.nvm/versions/node/v6.9.0/bin/npm run server
autostart=true
autorestart=true
stderr_logfile=/var/log/proyectoFrontendDEV.err.log
stdout_logfile=/var/log/proyectoFrontendDEV.out.log
user=usuario
```
##### Con variable de entorno = producción
```sh
[program:proyectoFrontendDEV]
directory=/home/usuario/rutaProyecto/proyecto-base-frontend-vue
command=/home/usuario/.nvm/versions/node/v6.9.0/bin/npm run server
autostart=true
autorestart=true
environment=NODE_ENV=production
stderr_logfile=/var/log/proyectoFrontendDEV.err.log
stdout_logfile=/var/log/proyectoFrontendDEV.out.log
user=usuario
```

Considerar que el nombre del usuario del equipo puede variar.

Considerar que la ruta real en la que se encuentra la aplicación puede variar.
