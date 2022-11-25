import { useState } from "react"
import { useDispatch} from 'react-redux'
import {createTask} from '../features/task/taskSlice'

function TaskForm() {
  const [task, setTask] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createTask({task}))
    setTask('')
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="task">Task</label>
          <input type="text" name="task" id="task" value={task} 
          onChange= {(e) => setTask(e.target.value)}/>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </section>
  )
}

export default TaskForm