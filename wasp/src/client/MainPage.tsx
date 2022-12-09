import getTasks from '@wasp/queries/getTasks'
import {useQuery} from '@wasp/queries'
import createTask from "@wasp/actions/createTask";

const MainPage = () => {
  const { data: tasks, isFetching, error } = useQuery(getTasks)

  return (
    <div>
      {tasks && <TasksList tasks={tasks} />}

      {isFetching && 'Fetching...'}
      {error && 'Error: ' + error}
    </div>
  )
}

const Task = (props: any) => {
  return (
    <div>
      <input
        type='checkbox' id={props.task.id}
        checked={props.task.isDone}
      />
      {props.task.description}
    </div>
  )
}

const TasksList = (props: any) => {
  if (!props.tasks?.length) return 'No tasks'
  return props.tasks.map((task: any, idx: number) => <Task task={task} key={idx} />)
}

const NewTaskForm = (props: any) => {
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    try {
      const description = event.target.description.value
      event.target.reset()
      await createTask({ description })
    } catch (err: any) {
      window.alert('Error: ' + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='description'
        type='text'
        defaultValue=''
      />
      <input type='submit' value='Create task' />
    </form>
  )
}

export default MainPage
