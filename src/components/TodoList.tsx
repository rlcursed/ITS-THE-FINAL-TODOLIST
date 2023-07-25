import React, {FC,useState, useCallback, useRef, useEffect} from "react";

import { v4 as uuidv4 } from 'uuid';

import { AppContainer } from "./Global.styles";

import { ITodo } from "../data/data";
import TodoItem from "./TodoItem";

const TodoList: FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [filtered, setFiltered] = useState(todos);
    const [edit, setEdit] = useState<null | string | boolean>(null);
    const [titleValue, setTitleValue] = useState("");

    useEffect(() => {
        loadTodos();
      }, []);

    useEffect(() => {
        setFiltered(todos);
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // Локальное хранилище
    const loadTodos = useCallback(() => {
        try {
          const storedTodos = localStorage.getItem("todos");
          if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
          } else {
            setTodos([]);
          }
        } catch (error) {
          console.error("Error loading todos:", error);
          setTodos([]);
        }
      }, []);


    // Рефа мейна
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Рефа TodoItem
    const EditInputRef = useRef<HTMLInputElement | null>(null);

    // Добавление
    const addTodo = () => {
        if(inputRef.current){
            setTodos([...todos, {
                id: uuidv4(),
                title: inputRef.current.value,
                completed: false
            }])
            inputRef.current.value = ""
        }
    };
    // Фильтр
    const filteredTodo = (status: string | boolean) => {
        if(status === "all"){
            setFiltered(todos);
        } else {
            let newTodo = [...todos].filter((item) => item.completed === status);
            setFiltered(newTodo);
        }
    };
    // Удаление
    const deleteTodo = (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };
    // Изменение
    const editTodo = (id: string) => {
        setEdit(id)
    };
    // Сохранение
    const saveTodo = (id: string) => {
        let newTodo = [...todos].map((item) => {
            if(item.id === id && EditInputRef.current) {
                item.title = EditInputRef.current.value
            }
            return item
        })
        setTodos(newTodo);
        setTitleValue("")
        setEdit(null)
    };
    // Проклик чекбокса
    const toogleTodo = (id: string) => {
        setTodos(todos.map(todo => {
            if(todo.id !== id) return todo;

            return {
                ...todo,
                completed: !todo.completed,
            }
        }))
    };

    return (
        <AppContainer>
            <div>
                {todos.length + " active tasks"}
            </div>
            <div>
                <input ref={inputRef} maxLength={12} />
                <button onClick={addTodo}>ADD</button>
            </div>
            <div>
                <button onClick={() => filteredTodo('all')}>Show All Tasks</button>
                <button onClick={() => filteredTodo(false)}>Show Active Tasks</button>
                <button onClick={() => filteredTodo(true)}>Show Completed Tasks</button>
            </div>
            <div>
                {
                    filtered.map((todo) => {
                        return <TodoItem 
                        key={todo.id}
                        {...todo}
                        deleteTodo={deleteTodo}
                        toogleTodo={toogleTodo}
                        editTodo={editTodo}
                        saveTodo={saveTodo}
                        edit={edit}
                        titleValue={titleValue}
                        EditInputRef={EditInputRef}
                        />
                    })
                }
            </div>
        </AppContainer>
    )
}

export default TodoList;