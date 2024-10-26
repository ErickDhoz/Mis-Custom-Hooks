import { useEffect, useReducer } from "react";
import { todoReducer } from "../reducers/todoReducer";

const initialState = [];

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodo = () => {
  const [todos, dispacth] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: "Add Todo",
      payload: todo,
    };
    dispacth(action);
  };

  const handleDeleteTodo = (id) => {
    dispacth({
      type: "Remove Todo",
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    dispacth({
      type: "Toggle Todo",
      payload: id,
    });
  };

  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todoCount: todos.length,
    pendientes: todos.filter((todo) => !todo.done).length,
    terminadas: todos.filter((todo) => todo.done).length,
  };
};
