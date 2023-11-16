import { nanoid } from "nanoid"
import { useRef, useState } from "react"
import { useAppDispatch } from "../../redux/hooks"
import { addTodo } from "../../redux/slices/todoSlice"
import { ITodo } from "../../utils/interfaces/ITodo"
import { TodoImportanceButtons } from "./TodoImportanceButtonsList"
import './TodoForm.scss';

const TodoForm = () => {
    const dispatch = useAppDispatch()
    const newTodoInitialState: ITodo = {
        todo: '',
        id: nanoid(),
        importance: 'common',
        completionStatus: false,
        isEditing: false
    }
    const [newTodo, setNewTodo] = useState(newTodoInitialState);
    const handleTodoTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo({ ...newTodo, todo: e.target.value })
    }
    const handleTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTodo.todo.trim() === '') return setNewTodo({ ...newTodoInitialState, importance: newTodo.importance, todo: '' });
        dispatch(addTodo(newTodo));
        setNewTodo({
            ...newTodoInitialState,
            importance: newTodo.importance,
        })
    }
    const isRadioButtonSelected = (value: string) => newTodo.importance === value;
    const handleTodoImportanceChange = (id: string) => {
        setNewTodo({ ...newTodo, importance: id })
        focusInputText();
    }
    const todoInputRef = useRef<HTMLInputElement>(null)
    const focusInputText = () => {
        todoInputRef.current!.focus();
    }

    return (
        <form className="todo-form" onSubmit={handleTodoSubmit}>
            <input
                ref={todoInputRef}
                type="text"
                placeholder="Enter a todo..."
                autoFocus={true}
                value={newTodo.todo}
                onChange={handleTodoTextChange}
                className="todo-form__text-input"
            />
            <div className="todo-form__importance-group">
                {TodoImportanceButtons.map(button => {
                    return (
                        <div key={button.id}>
                            <input
                                className="todo-form__radio"
                                type="radio"
                                value={button.id}
                                id={button.id}
                                name="todoImportance"
                                checked={isRadioButtonSelected(button.id)}
                                onChange={() => handleTodoImportanceChange(button.id)}
                            />
                            <label htmlFor={button.id} className={`todo-form__importance-button todo-form__importance-button_${button.id}`}>
                                {button.name}
                            </label>
                        </div>
                    )
                })
                }
            </div>
        </form>
    )
}

export default TodoForm