# WEB-API/Node.js/MongoDB

### EXPRESS
Esta aplicación está generada con el framework Express, utilizando el **estructurador de proyectos** de Express llamado "Express Generator".

Express Generator es un módulo de Express que nos genera un proyecto de Express con una estructura MVC y que podemos instalar a través de npm:

* Repositorio de Github: <https://github.com/expressjs/generator>
* Express Generator en NPM: <https://www.npmjs.com/package/express-generator>

`npm install -g express-generator`


### EJS
Utilizaremos el **motor de vistas "ejs"**. Para ello, lo indicaremos al momento de generar nuestro proyecto con Express generator del siguiente modo:

`express —ejs nombreProyecto`


### NODEMON 
Nodemon es una herramienta que se utiliza en la fase de desarrollo para recargar automáticamente nuestra aplicación, aunque no la página. Es decir, nodemon reinicia el servidor con cada cambio.
De esta manera no tendremos que ejecutar el fichero index.js cada vez que realizamos un cambio en la aplicación.

* Repositorio de Github: <https://github.com/remy/nodemon>
* Nodemon en NPM: <https://www.npmjs.com/package/nodemon>

Podemos instalarla de manera global con npm a través del comando: 

`npm install -g nodemon`

Una vez instalada, sólo tenemos que ejecutar una vez `nodemon` seguido del nombre del archivo ('nodemon nombreArchivo'). Si sólo ejecutamos `nodemon`sin pasarle el nombre de un archivo, Nodemon buscará en primer lugar un fichero "index.js", pero si no lo encuentra buscará en el archivo "package.json" el valor de la propiedad "start", contenida en "scripts" y lo ejecutará. En nuestra apicación de Express será:

```
"scripts": {
      "start": "node ./bin/www"
},
```

