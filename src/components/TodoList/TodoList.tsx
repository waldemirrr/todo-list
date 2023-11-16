import { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getTodos } from "../../redux/slices/todoSlice"
import ActiveTodo from "../ActiveTodo/ActiveTodo"
import CompletedTodo from "../CompletedTodo/CompletedTodo"

const TodoList = () => {
    const todos = useAppSelector(state => state.todos)
    const filter = useAppSelector(state => state.filter);
    const completedTodos = todos.filter(todo => todo.completionStatus === true)
    const activeTodos = todos.filter(todo => todo.completionStatus === false)
    const filterParam = Object.keys(filter).filter((key) => filter[key]);
    const dispatch = useAppDispatch();
    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            const savedTodos = JSON.parse(localStorage.getItem('todos')!);
            if (savedTodos === null) return
            dispatch(getTodos(savedTodos));
        }
    });

    useEffect(() => {
        if (!firstUpdate.current) {
            const todosLocal = JSON.stringify(todos);
            localStorage.setItem('todos', todosLocal);
        }
    }, [todos])

    return (
        <>
            <div className="active-todos">
                {activeTodos.filter(todo => filterParam.includes(todo.importance!)).map(todo => {
                    return (<ActiveTodo key={todo.id} todo={todo.todo} importance={todo.importance} id={todo.id} isEditing={todo.isEditing} />)
                })}
            </div>
            <div className="completed-todos">
                {completedTodos.map(todo => {
                    return (<CompletedTodo key={todo.id} todo={todo.todo} id={todo.id} />)
                })}
            </div>
        </>
    )
}

export default TodoList