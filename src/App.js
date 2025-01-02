import { useState } from "react";
import "./App.css";
import ToDoForm from "./components/ToDoForm";
import Todo from "./components/Todo";

function App() {
  let [todos, setTodos] = useState([]);
  const [todoToShow, setTodoToShow] = useState("all");
  const [toggleAllComplete, setToggleAllComplete] = useState(true);

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodoToShow = (show) => {
    setTodoToShow(show);
  };

  if (todoToShow === "active") {
    todos = todos.filter((todo) => !todo.complete);
  } else if (todoToShow === "complete") {
    todos = todos.filter((todo) => todo.complete);
  }

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        } else {
          return todo;
        }
      })
    );
  };

  const removeAllTodosThatAreCompleted = () => {
    setTodos(todos.filter((todo) => !todo.complete));
  };

  return (
    <div className="App">
      <div className="container">
        <ToDoForm onSubmit={addTodo} />
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDelete={() => handleDelete(todo.id)}
            toggleComplete={() => toggleComplete(todo.id)}
          />
        ))}

        <div>
          <button
            className="update-btn btn"
            onClick={() => updateTodoToShow("all")}
          >
            All
          </button>
          <button
            className="update-btn btn"
            onClick={() => updateTodoToShow("active")}
          >
            Active
          </button>
          <button
            className="update-btn btn"
            onClick={() => updateTodoToShow("complete")}
          >
            Complete
          </button>
        </div>
        {todos.some((todo) => todo.complete) ? (
          <button
            className="all-btn btn"
            onClick={() => removeAllTodosThatAreCompleted()}
          >
            Remove All Complete Todos
          </button>
        ) : null}
        <button
          className="all-btn btn"
          onClick={() => {
            setTodos(
              todos.map((todo) => ({
                ...todo,
                complete: toggleAllComplete,
              }))
            );
            setToggleAllComplete(!toggleComplete);
          }}
        >
          Toggle All Complete: {`${toggleAllComplete}`}
        </button>
      </div>
    </div>
  );
}

export default App;
