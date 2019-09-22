# ¿Qué es React y cómo funciona?

React es uno de los frameworks web de JavaScript más comentados en años. Junto con Angular, y más recientemente Vue, React es una herramienta que ha tenido un gran impacto en la forma en que construimos aplicaciones web. En su página lo definen de una manera rápida y sencilla:

**Una biblioteca de JavaScript para construir interfaces de usuario.**

React generalmente se considera la capa de vista en una aplicación. Es posible que hayamos utilizado bibliotecas como Handlebars o jQuery en el pasado. Al igual que jQuery, React manipula los elementos de la interfaz de usuario que se insertan en la página, los componentes de React cambian lo que el usuario ve.

# Stateful vs Stateless

Los componentes **no funcionales** no manejan estado, solo manejan información y funciones.

Los componentes de clases manejan un estado interno, información y funciones, no hace falta definir las funciones con `const` simplemente con el nombre de la función ya lo detecta.

La forma en que entendemos los componentes **Stateful** y **Stateless** cambia totalmente con los React Hooks: https://es.reactjs.org/docs/hooks-intro.html 😮

Ahora también tenemos **estado** y **ciclos de vida** en componentes creados como funciones o arrow functions.

Esto significa que al determinar qué componentes serán **lógicos** o **presentacionales** debemos guiarnos por convenciones y decisiones del equipo, no de que los componentes hayan sido creados como clases o funciones.

[**¿Cuándo crear un Componente?**
Estructura, Organización y Tipos de Componentes en React](https://platzi.com/blog/estructura-organizacion-y-tipos-de-componentes-en-react/)

# Ciclo de vida de React

Tenemos 4 fases por los que un componente pasa:

1. Initialization: Declaramos nuestro estado o propiedades
2. Mounting: Todo componente debe tener `render`. Es obligatorio.
3. Updation
4. Unmounting: Solo hay una función en caso de que queramos hacer algo cuando se destruya un componente

# Axios

Para instalar axios usamos la consola.

```
npm i axios
```

Y para usarlo lo ocupamos en el componentDidMount. Es muy importante que como axios recibe una promise ocupemos **async await** .

```jsx
async componentDidMount(){
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState( {
      usuarios: data
    })
  }
```

# React-Router-Dom

Instalacion.

```
npm i react-router-dom
```

# ¿Qúe es Redux, cuándo usarlo y por qué?

En esta clase el profesor Rodolfo Saldívar Hernández nos explicará qué es Redux, cómo usarlo y por qué; junto con sus principios como lo son el almacenamiento, es inmutable y centralizado. Redux es nuestra única fuente de la verdad.

Redux es un contenedor predecible del estado de aplicaciones JavaScript. Te ayuda a escribir aplicaciones que se comportan de manera consistente, corren en distintos ambientes (cliente, servidor y nativo), y son fáciles de probar.

# Introducción: las fases de Redux

  Los cuatro pilares de Redux son:

- **Store**: Almacenamiento
- **Reducers**: Estados
- **Action Creators**: Funciones
- **Componente**: Código JSX


  