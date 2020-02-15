import React, { useState } from "react";
import "./App.css";
import { TextField } from "@material-ui/core";

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

export default function App() {
  const [value, setValue] = useState<string>(""); // default value here
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>Make To Do list with Typescript</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="What to do?"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type="submit">Add To do</button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => (
          <div key={index}>
            <p
              style={{
                textDecoration: todo.complete ? "line-through" : ""
              }}
            >
              {todo.text}
            </p>
            <div onClick={() => completeTodo(index)}>
              {" "}
              {todo.complete ? "Incomplete" : "Complete"}
            </div>
            <button type="button" onClick={() => removeTodo(index)}>
              &times;
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
