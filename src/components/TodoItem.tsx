import React, {FC,memo} from 'react';

import { ITodo } from '../data/data';

import { TodoItemContainer, ButtonContainer } from './Global.styles';

interface TodoItemProps extends ITodo{
    deleteTodo:(id:string) => void;
    toogleTodo:(id: string) => void;
    editTodo:(id: string) => void;
    saveTodo:(id: string) => void;
    edit: null | string | boolean;
    titleValue: string;
    EditInputRef: React.MutableRefObject<HTMLInputElement | null>
}

const TodoItem: FC<TodoItemProps> = ({EditInputRef,id, title, completed, deleteTodo, toogleTodo, editTodo, saveTodo, edit, titleValue}) => {
    return (
        <div>
             {edit === id ?
            <TodoItemContainer>
            <input type='text' maxLength={12} checked={completed} ref={EditInputRef}/> 
            <button onClick={() => saveTodo(id)} title='Save'>SAVE</button>
            </TodoItemContainer>
            :
            <TodoItemContainer>
            <input type='checkbox' maxLength={12} checked={completed} ref={EditInputRef} onChange={() => toogleTodo(id)}/>
            {title}
            <ButtonContainer>
                <button onClick={() => deleteTodo(id)} title='Delete'>DELETE</button>
                <button onClick={() => editTodo(id)} title='Edit'>EDIT</button>
            </ButtonContainer>
            </TodoItemContainer>
            }
        </div>

        
    )
}

export default memo(TodoItem);