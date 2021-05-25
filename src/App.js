import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './component/Header'
import Tasks from './component/Tasks'
import AddTask from './component/AddTask'
import Footer from './component/Footer'
import About from './component/About'


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, 
    {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toogle Reminder
  const toggleReminder = async (id) => {
    const toggletoReminder = await fetchTask(id)
    const updateTask = { ...toggletoReminder, reminder: !toggletoReminder.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, 
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    }) 
    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ?
      {...task, reminder: data.reminder} : task
    ))
  }

  //add task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, 
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    }) 
    const data = await res.json()

    console.log(data)

    setTasks([...tasks, data])
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <Route path='/' exact render={(props) => (
            <>
              {showAddTask && <AddTask  onAdd={addTask}/>}
              {
                tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
                ) 
                : (
                    'No Tasks To Show'
                )
              }
            </>
        )} />
        <Route path='/about' component={About}/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
