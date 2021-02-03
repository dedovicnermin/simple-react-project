import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

import { useState, useEffect } from 'react';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, []);

// Fetch Tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks');
  const data = await res.json();
  
  // console.log(data);
  return data;
}


const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`);
  const data = await res.json();

  return data;
}



//Add Task
const addTask = async (task) => {
  // console.log(task);
  //(JSON SRVER MAKES ID FOR US)const id = Math.floor(Math.random() * 10000) + 1;
  // const newTask = {id, ...task};
  // setTasks([...tasks, newTask]);

  // console.log(id)


  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }, 
    body: JSON.stringify(task)
  });

  const data = await res.json();

  setTasks([...tasks, data]);
  
  
}



  // Delete Task
  const deleteTask = async (id) => {
    // console.log('delete ' + id);
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });
    
    setTasks(tasks.filter(ele => ele.id !== id ));
    
  }



  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    const data = await res.json();



    setTasks(
      tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task)
    )
  };

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} propShowAdd={showAddTask}/>
      
      {showAddTask ? <AddTask onAdd={addTask} /> : ''}
      {
        tasks.length > 0 ? 
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 
          'No Tasks To Show'
      }
      
      {/* can write javascript in the curly braces. {name} */}
      {/* <h2>Hello {name ? 'Yes' : 'no'}</h2> */}
    </div>
  );
}

export default App;
