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

<u>components/Usuarios/index.js</u>

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

# Store

El *store* tiene las siguientes responsabilidades:

- Contiene el estado de la aplicación
- Permite el acceso al estado vía `getState()`
- Permite que el estado sea actualizado vía `dispatch(action)`
- Registra los *listeners* vía `subscribe(listener)`
- Maneja la anuliación del registro de los *listeners* via el retorno de la función de `subscribe(listener)`

Para  instalar Redux.

```
npm i redux

npm i react-redux
```

Después se deben importar las librerías y crear el store.

<u>src/index.js</u>

```
import { createStore} from "redux";
import { Provider } from "react-redux";

const store = createStore(
  {}, // Todos los reducers
  {} //Estado inicial
)
```

# Reducers

Las *Action Creators* describen que *algo pasó*, pero no especifican cómo cambió el estado de la aplicación en respuesta. Esto es trabajo de los reducers.

El `Provider` es el componente de Redux en el cual encerraremos nuestra aplicación para que puedan comunicarse los componentes entre ellos.

## Creación de reducer

<u>reducers/usuariosReducer.js</u>

```
const INITIAL_STATE = {
  usuarios: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "traes_usuarios":
      return { ...state, usuarios: action.payload };

    default:
      return state;
  }
};
```

## Retornar reducers.

Los reducers se especifican en un archivo reducers el cual exportara todos estos.

<u>reducers/index.js</u>

```
import { combineReducers } from "redux";
import usuariosReducer from "./usuariosReducer";

export default combineReducers({
  usuariosReducer
});
```

## Importar reducers al App

Simplemente se importan y asignan.

<u>src/index.js</u>

```
import reducers from "./reducers";

const store = createStore(
  reducers, // Todos los reducers
  {} //Estado inicial
);
```

# Ciclo completo de Redux.

## Configuración de la App.

Primeramente se debe inicial la configuración de la aplicación.

Se debe configurar principalmente el store donde por medio del createStore aplicas los reducers, el estado inicial y el middelware.

<u>src/index.js</u>

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import reducers from "./reducers";

const store = createStore(
  reducers, // Todos los reducers
  {}, //Estado inicial
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

Dentro de la carpeta reducers deben estar especificados los Reducers que ocupara la app.

<u>reducers/index.js</u>

```jsx
import { combineReducers } from "redux";
import usuariosReducer from "./usuariosReducer";

export default combineReducers({
  usuariosReducer
});
```

Después en el componente funcional se deben importar la acciones y las props esto se configura al final de la clase, donde se exporta con una **conexión** entre las **acciones** y **props** que van a recibir los componentes de la carpeta Usuarios.

Es muy importante resaltar que la función **mapStateToProps** llama a **usuariosReducer** para convierte el estado en props para poder acceder a el dentro del componente.

```jsx
connect(mapStateToProps,usuariosActions)(Usuarios);
```

Y en cuanto a la **usuariosActions** enlaza las acciones en espera de una accion para cambiar el reducer.

BASICAMENTE:

Cuando el componente este montado va a llamar la acción **TraerTodos()**, que va a disparar ( por medio del dispatch) **traer_usuarios** dentro del reducer (el cual va a cambiar el estado) y el DOM va a volver a cargar el render ya que el estado va a estar actualizado.

<u>components/Usuarios/index.js</u>

```jsx
import React, { Component } from "react";

import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";

class Usuarios extends Component {
  componentDidMount() {
    this.props.traerTodos()
  }

  ponerFilas = () =>
    this.props.usuarios.map(usuario => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
      </tr>
    ));

  render() {
    return (
      <div>
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Enlace</th>
            </tr>
          </thead>
          <tbody>{this.ponerFilas()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.usuariosReducer;
};

export default connect(
  mapStateToProps,
  usuariosActions
)(Usuarios);
```

## Reducers

<u>reducers/usuariosReducer.js</u>

```
const INITIAL_STATE = {
  usuarios: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "traer_usuarios":
      return { ...state, usuarios: action.payload };

    default:
      return state;
  }
};
```

## Actions.

En **usuaiosActions** se definen las acciones en este caso se exporta la accion de traerTodos que retorna la llamada a la api.

Esta se envía en el **dispatch** que es el que se comunica con el **reducer**. Este mismo es el que contiene un tipo y el payload el cual lleva la data.

<u>actions/usuariosActions.js</u>

```jsx
import axios from "axios";

export const traerTodos = () => async (dispatch) => {
  
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );

  dispatch({
    type: 'traer_usuarios',
    payload: data
  })
}
```







