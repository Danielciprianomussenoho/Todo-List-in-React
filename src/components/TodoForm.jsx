import { useState} from 'react'

function TodoForm({addTodo}) {
  const[value, setValue] = useState("");
  const[category, setCategory] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!value || !category) return;
    //Adicionar todo e limpar os campos
    addTodo(value,category);
    setValue("");
    setCategory("");
  }

  return (
    <div className='todo-form'>
        <h2>Criar tarefa:</h2>

        <form onSubmit={handleSubmit}  >
          <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder='Digite o titulo' />

          <select value={category} onChange={(e) => setCategory(e.target.value)} >
            <option value="">Selecione uma categoria</option>
            <option value="Estudo">Estudo</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Pessoal">Pessoal</option>
          </select>

          <button type='submit' >Criar tarefa</button>
        </form>
    </div>

  )
}

export default TodoForm