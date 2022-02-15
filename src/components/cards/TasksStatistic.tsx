import React, { useEffect, useState } from 'react'
import { TasksState } from '../../TasksContext'
import { TaskStatusEnum } from './TasksTable';

function TasksStatistic() {
  const { tasks } = TasksState();
  const [ totalCount, setTotalCount ] = useState(0);
  const [ todoCount, setTodoCount ] = useState(0);
  const [ doneCount, setDoneCount ] = useState(0);

  useEffect(() => {
    setTotalCount(tasks.length);
    setTodoCount(tasks.filter(t => t.status === TaskStatusEnum.TODO).length);
    setDoneCount(tasks.filter(t => t.status === TaskStatusEnum.DONE).length);
  }, [tasks]);

  return (
    <div className="card card-widget widget-user-2">
      {/* <!-- Add the bg color to the header using any of the bg-* classes --> */}
      <div className="widget-user-header bg-primary">
        {/* <!-- /.widget-user-image --> */}
        <h3 className="widget-user-username">Current list statistics</h3>
      </div>
      <div className="card-footer p-0">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="#" className="nav-link">
              Total <span className="float-right badge bg-danger">{ totalCount }</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              To be done <span className="float-right badge bg-warning">{ todoCount }</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Done <span className="float-right badge bg-success">{ doneCount }</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TasksStatistic