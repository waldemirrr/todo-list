import { useAppDispatch } from "../../redux/hooks"
import { completionStatusChange, deleteTodo, editStateChange, editTodo } from "../../redux/slices/todoSlice"
import { ITodo } from "../../utils/interfaces/ITodo"
import PenIcon from '../../svg/pen-solid.svg'
import CheckIcon from '../../svg/check-solid.svg'
import TrashIcon from '../../svg/trash-solid.svg'
import './ActiveTodo.scss'
import { useState } from "react"

const ActiveTodo = ({ id, todo, importance, isEditing }: ITodo) => {
    const [editedText, setEditedText] = useState(todo);
    const dispatch = useAppDispatch();
    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id))
    }
    const handleCompletion = (id: string) => {
        dispatch(completionStatusChange(id))
    }
    const handleEditStateChange = (id: string) => {
        dispatch(editStateChange(id))
    }
    const handleEditedTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedText(e.target.value)
    }
    const handleEditTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(editTodo({ editedText, id }))
        dispatch(editStateChange(null))
    }
    const iconClassModificator = () => importance === 'common' ? 'active-todo__icon_grey' : 'active-todo__icon_white'
    const todoImportanceModificator = () => {
        if (importance === 'rare') return 'active-todo_rare'
        if (importance === 'epic') return 'active-todo_epic'
        return 'active-todo_common'
    }
    return (
        isEditing
            ?
            <form className="active-todo__editing-form" onSubmit={handleEditTodo}>
                <button className="active-todo__editing-submit" type="submit">
                    <img className="active-todo__icon active-todo__icon_grey active-todo__manage" src={CheckIcon} alt="" />
                </button>
                <textarea
                    className="active-todo__editing-textarea"
                    onChange={handleEditedTextChange}
                    defaultValue={todo}
                />
            </form>
            :
            <div className={`active-todo ${todoImportanceModificator()}`}>
                <img
                    src={CheckIcon}
                    className={`active-todo__icon active-todo__manage ${iconClassModificator()}`}
                    alt="check-for-completion-icon"
                    onClick={() => handleCompletion(id)}
                />
                <div className="active-todo__text">{todo}</div>
                <div className="active-todo__manage">
                    <img className={`active-todo__icon ${iconClassModificator()}`} src={PenIcon} alt="edit-icon" onClick={() => handleEditStateChange(id)} />
                    <img
                        src={TrashIcon}
                        className={`active-todo__icon ${iconClassModificator()}`}
                        alt="delete-icon"
                        onClick={() => handleDeleteTodo(id)}
                    />
                </div>
            </div>
    )
}

export default ActiveTodo