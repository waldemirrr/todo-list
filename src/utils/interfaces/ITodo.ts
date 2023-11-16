export interface ITodo {
    todo: string,
    id: string,
    importance?: string,
    isEditing?: boolean,
    completionStatus?: boolean
}