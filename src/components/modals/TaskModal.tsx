import { useEffect, useState } from 'react'
import { ModalTypesEnum, TasksState } from '../../TasksContext';
import { ITask, TaskStatusEnum } from '../cards/TasksTable';

enum ModalModeEnum { ADD, EDIT, EDIT_MULTIPLE }

const emptyTask: ITask = {
  id: null,
  title: '',
  description: '',
  status: TaskStatusEnum.TODO,
  completed: false,
  created: new Date()
};

export default function TaskModal() {
  // Fetch the main context data.
  const { tasks, setTasks, modal, setModal } = TasksState();
  // Holds the task in case we add one.
  const [ task, setTask ] = useState<ITask>(emptyTask);
  // Indicates the mode of the modal (add or editing multiple or one).
  const [ mode, setMode ] = useState<ModalModeEnum>(null);

  useEffect(() => {
    // Will indicate the current modal mode.
    let theMode = null;
    // Fetch the tasks that are concerned.
    if (!modal.ids || !modal.ids.length) {
      theMode = ModalModeEnum.ADD
    } else {
      const foundTasks = modal.ids.map(id => tasks.find(t => t.id === id));
      theMode = foundTasks.length === 1 ? ModalModeEnum.EDIT : ModalModeEnum.EDIT_MULTIPLE;
    }
    setMode(theMode);
    loadTask(theMode);
  }, [])

  const loadTask = (theMode: ModalModeEnum) => {
    /**
     * If we are in ADD mode then we create an
     * empty task and prepare it to be edited.
     */
    let currentTask = null;
    switch (theMode) {
      case ModalModeEnum.ADD:
        // Create an empty task object.
        currentTask = emptyTask;
        break;
      case ModalModeEnum.EDIT:
        const found = tasks.find(t => t.id === modal.ids[0])
        currentTask = found;
        break;
      case ModalModeEnum.EDIT_MULTIPLE:
        currentTask = emptyTask;
        break;
      default:
        break;
    }
    /**
     * Set the current task to be edited
     * to whatever the need is.
     * Note: we handle the saving using the
     * same local mode property.
     */
    setTask(currentTask);
  }

  /**
   * Handle the save of the edited task / tasks
   * based on the currently set mode.
   */
  const onSubmit = () => {
    let newTasksList: ITask[] = [];
    switch (mode) {
      case ModalModeEnum.ADD:
        newTasksList = [ ...tasks, { ...task, id: Math.floor(Math.random() * 10000).toString() }];
        break;
      case ModalModeEnum.EDIT:
        newTasksList = tasks.map(t => t.id === task.id ? { ...task, id: t.id } : t);
        break;
      case ModalModeEnum.EDIT_MULTIPLE:
        // Generate the list of the tasks that were edited.
        newTasksList = [ ...tasks ];
        newTasksList = newTasksList.map(nt => modal.ids.find(id => id === nt.id) ? { ...nt, status: task.status } : nt);
        break;
      default:
        break;
    }
    setTasks(newTasksList);
    setModal(null);
  }

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              { mode === ModalModeEnum.ADD && 'Add new task' }
              { mode === ModalModeEnum.EDIT && 'Edit task' }
              { mode === ModalModeEnum.EDIT_MULTIPLE && 'Change tasks status' }
            </h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => setModal(null)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          
          <form>
            {/* Display the title field */}
            {
              (mode === ModalModeEnum.ADD || mode === ModalModeEnum.EDIT) &&
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter title"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                  />
                </div>
            }

            {/* Display the description field */}
            {
              (mode === ModalModeEnum.ADD || mode === ModalModeEnum.EDIT) &&
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  rows={5}
                  placeholder="Enter description"
                  value={task.description}
                  onChange={(e) => setTask({ ...task, description: e.target.value })}
                ></textarea>
              </div>
            }

            {/* Display the status field in any case */}
            <div className="form-group">
              <label>Status</label>
              <select
                className="form-control"
                value={task.status}
                onChange={(e) => setTask({ ...task, status: e.target.value as TaskStatusEnum })}
              >
                <option value={TaskStatusEnum.TODO}>To be done</option>
                <option>Done</option>
              </select>
            </div>
          </form>

          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => setModal(null)}>Close</button>
            <button type="button" className="btn btn-primary" onClick={onSubmit}>Save changes</button>
          </div>
        </div>
        {/* <!-- /.modal-content --> */}
      </div>
      {/* <!-- /.modal-dialog --> */}
    </div>
  )
}
