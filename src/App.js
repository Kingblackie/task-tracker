import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";


function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks()
  }, []);

  // Fetch tasks from json server
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks');
    const data = await response.json();
    console.log(data)
    return data;
  }

  const fetchTask = async id => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await response.json();
    return data;
  }

  // Add Task 
  const addTask = async task => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    setTasks([...tasks, data]);

    /* const id = Math.floor(Math.random() * 1000 + 1);
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]); */
  }

  // Delete Task
  const deleteTask = async id => {
    await fetch(`http://localhost.:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Toggle Reminder
  const toggleReminder = async id => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`http://localhost.:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json();

    setTasks(tasks.map(task => task.id === id ? { ...task, reminder: data.reminder } : task));
  }

  return (
    <Router>
      <div className="container"> 
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        
        <Route path="/" exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle=      {toggleReminder} /> : 'No Tasks To Show'}
          </>
        )} />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
