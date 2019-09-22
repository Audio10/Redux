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