import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import TaskForm from '../components/TaskForm'
import Spinner from '../components/Spinner'
import { getTask, reset } from '../features/task/taskSlice'
import TaskItem from '../components/TaskItem'

function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  
  const {tasks, isLoading, isError, message} = useSelector((state) => state.tasks)

  useEffect(() => {

    if(isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    }

    dispatch(getTask())

    return () => {
      dispatch(reset())
    }

  }, [user, navigate, isError, message, dispatch])

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
    <section className='heading'>
      <h1>Welcome {user && user.name }</h1>
      <p>Task Manager</p>
    </section>
    <TaskForm/>
    <section className='content'>
      {tasks.length > 0 ? (
        <div className='goals'>
          {tasks.map((task) => (
            <TaskItem key= {task._id} task={task}/>
          ))}
        </div>
      ) : ( <h4> No tasks</h4> )}
    </section>
    </>
  )
}

export default Dashboard