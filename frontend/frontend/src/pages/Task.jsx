import React from 'react'
import { Link } from 'react-router-dom'

const Task = ({ isLoggedIn, task }) => {
  return (
    <Link to={`/tasks/${task.id}`} className='task_item'>
        <div className = 'task_item_wrapper'>
            <div className ='task_item_details'>
              <div className ='task_item_first_line'>
                <p className ='task_item_name'>{task.title.substring(0,15)}</p>
                <p className ='task_item_description'>{task.description}</p>
              </div>
                <p className ='task_item_status'>{task.status}</p>
                <p className ='task_item_createDate'>{task.createDate}</p>
                <p className ='task_item_completeDate'>{task.completeDate}</p>
            </div>
        </div>
    </Link>
  )
}

export default Task