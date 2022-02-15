import React, { useEffect, useState } from 'react'
import { ModalTypesEnum, TasksState } from '../../TasksContext';

export enum TaskStatusEnum { TODO = 'To be done', DONE = 'Done' }

export interface ITask {
  id: string;
  selected?: boolean;
  title: string;
  description: string;
  status: TaskStatusEnum;
  completed: boolean;
  created: Date;
}

export default function TasksTable() {

  const [ searchString, setSearchString ] = useState('');
  const [ allSelected, setAllSelected ] = useState(false);
  const [ filteredTasks, setFilteredTasks ] = useState<ITask[]>([]);

  const { tasks, setModal } = TasksState();

  useEffect(() => {
    setFilteredTasks(tasks);
    setAllSelected(false);
  }, [tasks]);

  /**
   * Handle the checking of the completed property
   * for a task.
   * 
   * @param id string
   * @returns void
   */
  const handleCheck = (id: string) => {
    /**
     * Create a new list of tasks so we keep everything
     * immutable.
     */
    const newListOfTasks = filteredTasks.map(task => 
      task.id === id ?
        { ...task, selected: !task.selected } :
        task)
    setFilteredTasks(newListOfTasks);
  }
  /**
   * Handle typing in the search box in the card
   * header
   * @param event any
   * @returns void
   */
  const handleSearchType = (event: any) => {
    // Get the value of the search field.
    let searchTerm = event.target.value;
    // Convert the search term to lower case;
    searchTerm = searchTerm?.toLowerCase() || searchTerm;
    // Set the search field value.
    setSearchString(searchTerm);
    /**
     * Method that helps with all the if
     * conditions performed for the filtering.
     * 
     * @param task ITask
     * @param searchTerm string
     * @returns boolean
     */
    const find = (task: ITask, searchTerm: string) => {
      const hasInTitle = task.title.toLowerCase().includes(searchTerm);
      const hasInDescription = task.description.includes(searchTerm);
      return hasInTitle || hasInDescription;
    }
    // Set up a new list based on the filtered list.
    const newTaskList = tasks.filter(t => find(t, searchTerm));
    /**
     * If search term is empty then we set back the
     * normal list of tasks.
     */
    if (!searchTerm) {
      setFilteredTasks(tasks);
    }
    setFilteredTasks(newTaskList);
  }
  /**
   * Handle the checking of the batch tasks
   * selector.
   */
  const handleAllChecked = () => {
    // Check previous allSelected state.
    const allCompleted = allSelected;
    // Invert the previous allSelected state to all tasks.
    setFilteredTasks(filteredTasks.map(t => ({ ...t, selected: !allCompleted })));
    // Set the new allSelected State.
    setAllSelected(!allSelected);
  }

  /**
   * View the selected task details
   * 
   * @param id string
   * @returns void
   */
  const handleView = (id: string) => {
    console.log('Viewing task:', id);
  }

  /**
   * Handle the add / edit mode for one or
   * multiple tasks.
   */
  const handleEdit = () => {
    // const filterById = (task: ITask) => task.id === id;
    // const filterBySelected = (task: ITask) => !!task.selected;
    const hasSelectedTasks = filteredTasks.filter(t => !!t.selected).map(t => t.id);
    // Filter the list of tasks that are selected.
    // let selectedTasks = id ? tasks.filter(filterById).map(t => t.id) : tasks.filter(filterBySelected).map(t => t.id);
    setModal({
      type: ModalTypesEnum.TASK,
      ids: hasSelectedTasks || []
    });
  }

  return (
    <div className="card">

      {/* Card header */}
      <div className="card-header">
        <h3 className="card-title">List of tasks for today</h3>

        <div className="card-tools">
          <div className="input-group input-group-sm" style={{ width: '150px' }}>

            {/* Search for tasks */}
            <input
              type="text"
              className="form-control float-right"
              placeholder="Search"
              value={searchString}
              onChange={handleSearchType} />

            <div className="input-group-append">
              <button type="submit" className="btn btn-default">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* !Card header */}

      {/* Card body */}
      <div className="card-body table-responsive p-0">
        <table className="table table-hover text-nowrap">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>
                <div className="icheck-primary d-inline ml-2">
                  <input type="checkbox" value="" name="todo1" checked={allSelected} onChange={handleAllChecked} />
                  <label></label>
                </div>
              </th>
              <th style={{ width: '70%' }}>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredTasks.map(task => {
                return (
                  <tr key={ task.id }>
                    <td>
                      <div className="icheck-primary d-inline ml-2">
                        <input type="checkbox" value="" name="todo1" checked={ task.selected } onChange={() => handleCheck(task.id)} />
                        <label></label>
                      </div>
                    </td>
                    <td onClick={() => handleView(task.id)}>{ task.title }</td>
                    <td onClick={() => handleView(task.id)}><span className="tag tag-success">{ task.status.toString() }</span></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      {/* !Card body */}

      <div className="card-footer clearfix">
        <button
          type="button"
          className="btn btn-primary float-right"
          onClick={() => handleEdit()}>
          <i className={ filteredTasks.find(t => !!t.selected) ? 'fa-solid fa-pen-to-square' : 'fas fa-plus' }></i>
           { filteredTasks.find(t => !!t.selected) ? 'Edit' : 'Add' }
        </button>
      </div>
    </div>
  )
}
