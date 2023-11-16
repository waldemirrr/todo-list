import Filter from "./components/Filter/Filter";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import './App.scss';
import { useAppSelector } from "./redux/hooks";
const App = () => {
  const todos = useAppSelector(state => state.todos)
  return (
    <div className="app">
      <div className="todo-form-wrapper">
        <TodoForm />
      </div>
      <div className="form-wrapper">
        {!!todos.length && <Filter />}
      </div>
      <div className="todo-list-wrapper">
        <TodoList />
      </div>
    </div>
  )
}

export default App
