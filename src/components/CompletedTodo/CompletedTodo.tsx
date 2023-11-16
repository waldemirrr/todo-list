import { useAppDispatch } from "../../redux/hooks"
import { completionStatusChange, deleteTodo } from "../../redux/slices/todoSlice";
import { ITodo } from "../../utils/interfaces/ITodo"
import CrossIcon from '../../svg/xmark-solid.svg'
import TrashIcon from '../../svg/trash-solid.svg'
import './CompletedTodo.scss';

const CompletedTodo = ({ todo, id }: ITodo) => {
    const dispatch = useAppDispatch();

    const handleCompletion = (id: string) => {
        dispatch(completionStatusChange(id))
    }
    const handleDelete = (id: string) => {
        dispatch(deleteTodo(id))
    }
    return (
        <div className="completed-todo">
            <img className="completed-todo__icon" src={CrossIcon} alt="uncomplete todo" onClick={() => handleCompletion(id)} />
            <div className="completed-todo__text">{todo}</div>
            <img className="completed-todo__icon" src={TrashIcon} alt="" onClick={() => handleDelete(id)} />
        </div>
    )
}

export default CompletedTodo