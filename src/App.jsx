import { useState, useEffect } from 'react'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import Filter from './components/Filter'
import Search from './components/Search'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")

    if(localValue == null) return []
    
    return JSON.parse(localValue)
  } 
    )
        
useEffect(() => {
  localStorage.setItem("ITEMS", JSON.stringify(todos))
},[todos])
  
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All")
    const [sort, setSort] = useState("Asc")

    const addTodo = (text, category) => {
      const newTodos = [...todos,{
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      }];
      
      setTodos(newTodos)
    };

    const removeTodo = (id) => {
      const newTodos = [...todos]
      const filteredTodos = newTodos.filter((todo) => todo.id != id ? todo : null)
      setTodos(filteredTodos);
    };

    const completeTodo = (id) => {
      const newTodos = [...todos]
      newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
      setTodos(newTodos);
    };
  return (
    <div className='App'>
      
      <h1>To Do List In React</h1>
      <Search search={search} setSearch={ setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort = {setSort} />

      <div className="todo-list">
        {todos
        .filter((todo) => 
          filter === "All" 
          ? true 
          : filter === "Completed" 
          ? todo.isCompleted 
          : !todo.isCompleted
        )
        .filter((todo) =>
          todo.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
        .sort((a, b) => sort === "Asc" 
          ? a.text.localeCompare(b.text) 
          : b.text.localeCompare(a.text))
        .map((todo) => (
            <Todo todo = {todo} key={todo.id} removeTodo = {removeTodo} completeTodo = {completeTodo} />
        ))}        
      </div>
      <TodoForm addTodo = {addTodo}/>
    </div>
  )
}

export default App
