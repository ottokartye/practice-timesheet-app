import { useState, createContext, useContext } from "react";
import { ITask, TaskStatusEnum } from "./components/cards/TasksTable";

export interface IAppContext {
  tasks: ITask[];
  setTasks: Function;
  loading: boolean;
  fetchTasks?: Function;
  modal?: IModalType;
  setModal?: Function;
}

export enum ModalTypesEnum { TASK }

export interface IModalType {
  type: ModalTypesEnum;
  ids: string[];
}

/**
 * TODO: remove this when firebase firestore is
 * implemented.
 */
const mockTasks: ITask[] = [
  { id: '1', title: 'first task', description: 'first task description', status: TaskStatusEnum.TODO, completed: false, created: new Date() },
  { id: '2', title: 'Second task', description: 'Second task description', status: TaskStatusEnum.DONE, completed: true, created: new Date() },
]

const Context = createContext<IAppContext>(null);

export const TasksContext = (props: { children: any }) => {
  /**
   * Add the selected property to each of
   * the task items.
   */
  const list = mockTasks.map(t => ({ ...t, selected: false }));
  const [ tasks, setTasks ] = useState(list);
  const [ loading, setLoading ] = useState(false);
  const [ modal, setModal ] = useState<IModalType>(null);
  // const [ user, setUser ] = useState(null);

  /**
   * Fetch the list of tasks from firebase.
   */
  // const fetchTasks = async () => {
  //   setLoading(true);
  //   // const { data } = await ...
  // }

  return (
    <Context.Provider value={{ tasks, setTasks, loading, modal, setModal }}>
      { props.children }
    </Context.Provider>
  );
}

export const TasksState = () => {
  return useContext(Context);
}
