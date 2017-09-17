# WEB-API/Node.js/MongoDB

## CREACIÓN DEL PROYECTO:

### EXPRESS GENERATOR
Esta aplicación está generada con el framework Express, utilizando el **estructurador de proyectos** de Express llamado "Express Generator".

Express Generator es un módulo de Express que nos genera un proyecto de Express con una estructura MVC y que podemos instalar a través de npm:

* Repositorio de Github: <https://github.com/expressjs/generator>
* Express Generator en NPM: <https://www.npmjs.com/package/express-generator>

`npm install -g express-generator`


### EJS
Utilizaremos el **motor de vistas "ejs"**. Para ello, lo indicaremos al momento de generar nuestro proyecto con Express generator del siguiente modo:

`express --ejs nombreProyecto`

Nuestra aplicación se llamará nodepop: `express --ejs nodepop`


## ¿CÓMO ARRANCAR NUESTRA APLICACIÓN?

### Package.json
Si hemos generado nuestro proyecto con el estructurador de proyectos "express-generator", éste nos habrá generado un archivo "package.json" dentro de la estructura del proyecto, donde se indican las dependencias del mismo.

Para instalarnos todas estas dependencias tendremos que ejecutar, a la altura de fichero package.json, el comando:

`npm install` 

Una vez se hayan instalado todos los módulos, podemos ejecutar nuestra aplicación con **npm start** o bien con **"nodemon"**. 
`npm start` nos ejecutará la aplicación, pero no reiniciará el servidor con cada cambio que realicemos. Para que el servidor se reinicie con cada cambio utilizaremos `nodemon`.


### NODEMON 
Nodemon es una herramienta que se utiliza en la fase de desarrollo para recargar automáticamente nuestra aplicación, aunque no la página. Es decir, nodemon reinicia el servidor con cada cambio.
De esta manera no tendremos que ejecutar el fichero index.js cada vez que realizamos un cambio en la aplicación.

* Repositorio de Github: <https://github.com/remy/nodemon>
* Nodemon en NPM: <https://www.npmjs.com/package/nodemon>

Podemos instalarla de manera global con npm a través del comando: 

`npm install -g nodemon`

Una vez instalada, sólo tenemos que ejecutar una vez `nodemon` seguido del nombre del archivo ('nodemon nombreArchivo'). Si sólo ejecutamos `nodemon`sin pasarle el nombre de un archivo, Nodemon (al igual que sucedería con "npm start") buscará en primer lugar un fichero ***"index.js"***, pero si no lo encuentra buscará en el archivo ***"package.json"*** el valor de la propiedad **"start"**, contenida en la propiedad "scripts" y lo ejecutará. En nuestra apicación de Express será:

```
"scripts": {
      "start": "node ./bin/www"
},
```
### ARRANCAR EN MODO DE DESARROLLO
Podemos utilizar un módulo de npm llamado "cross-env" que se encargará de asignar las variables de entorno de mi aplicación, si las hubiera, con la sintaxis correspondiente al sistema operativo donde nos encontremos.

* Cross-env en Gihub: <https://github.com/kentcdodds/cross-env>
* Cross-env en NPM: <https://www.npmjs.com/package/cross-env>

De este modo, podríamos escribirlas siempre en modo Linux (que es igual a como se haría en Mac) y si ejecutamos la aplicación en Windows, cross-env se encargará de ponerlas en formato Windows.

Para instalarlo ejecutamos:

`npm install --save-dev cross-env`

A continuación en nuestro archivo "package.json" podemos establecer un modo de arranque en modo desarrollo donde podemos asignar las variables de entorno a través de "cross-env".

```
"scripts": {
      "start": "node ./bin/www",
      "dev": "cross-env DEBUG=nombreApp:* nodemon"
},
```

Para arrancar nuestra aplicación en modo de desarrollo ejecutaremos:

`npm run dev`

Por otro lado, podemos gestionar los logs de la aplicación mediante el módulo "debug" que Express nos ha importado en el archivo "www" a través de require que sólo se activaría si activáramos el modo DEBUG en el package.json (DEBUG=nombreApp:* ).

var debug = require('debug')('nombreApp:server’);

* Debug en Gihub: <https://github.com/visionmedia/debug>
* Debug en NPM: <https://www.npmjs.com/package/debug>

O bien, podemos sustituir por `console.log("Listening on"+ bind)` la siguiente línea de código del archivo "www": `debug('Listening on ' + bind);`.
De este modo el debug se realizará siempre, independientemente del entorno, y sin necesidad de arrancar el modo debug.

Ej:

```
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  //debug('Listening on ' + bind);
  console.log("Listening on"+ bind);
}
```