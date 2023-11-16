import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { filterAll, filterSpecific } from "../../redux/slices/filterSlice";
import { FilterList } from "./FilterList";
import './Filter.scss';
import { deleteCompletedTodos } from "../../redux/slices/todoSlice";

const Filter = () => {
    const dispatch = useAppDispatch();
    const handleFilterSpecific = (filter: string) => {
        dispatch(filterSpecific(filter))
    }
    const handleFilterAll = () => {
        dispatch(filterAll())
    }
    const handleDeleteCompleted = () => {
        dispatch(deleteCompletedTodos())
    }
    const filter = useAppSelector(state => state.filter)
    const isAllActive = () => filter.common && filter.rare && filter.epic ? 'filter-button_all' : '';
    const isSpecificActive = (filterName: string) => filter[filterName] ? `filter-button_${filterName}` : '';

    return (
        <div className="filter-group">
            <div className="filter">
                <button className={`filter-button ${isAllActive()}`} onClick={handleFilterAll}>All</button>
                {FilterList.map((button) => {
                    return (<button className={`filter-button ${isSpecificActive(button.filter)}`} onClick={() => handleFilterSpecific(button.filter)} key={button.filter}>{button.filterName}</button>)
                })}
            </div>
            <button className="filter-button filter-button__delete-completed" onClick={handleDeleteCompleted}>Delete completed</button>
        </div>
    )
}

export default Filter