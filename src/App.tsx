import "./styles.css"
import {FormEvent, useState} from "react";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

export default function App() {
    const [newItem, setNewItem] = useState("")
    const [todos, setTodos] = useState<Todo[]>([])

    function handleSubmit(e : FormEvent) {
        e.preventDefault()

        setTodos((currentTodos: Todo[] ) => {
            return [
                ...currentTodos,
                { id: crypto.randomUUID(), title: newItem, completed: false}
            ]
        })

        setNewItem("")
    }

    function toggleTodo(id: string, completed: boolean) {
        setTodos((currentTodos : Todo[]) => {
            return currentTodos.map( todo => {
                    if (todo.id === id) {
                        console.log("click")
                        return { ...todo, completed }
                    }
                    return todo
                }
            )
        })
    }

    return (
        <>
            <form className="new-item-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="item">New Item</label>
                    <input
                        value={newItem}
                        onChange={e => setNewItem(e.target.value)}
                        type="text"
                        id="item"/>
                </div>
                <button className="btn">Add</button>
            </form>
            <h1 className="header">Todo List</h1>
            <ul className="list">
                {todos.map(todo => {
                    return <li key={todo.id}>
                        <label>
                            <input type={"checkbox"} checked={todo.completed}
                            onChange={e => toggleTodo(
                                todo.id, e.target.checked
                            )}
                            />
                            {todo.title}
                        </label>
                        <button className={"btn btn-danger"}>Delete</button>
                    </li>
                })}
            </ul>
        </>
    )
}