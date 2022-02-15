import TasksStatistic from '../components/cards/TasksStatistic'
import PageHeader from '../partials/PageHeader'
import TasksTable from '../components/cards/TasksTable'
import { ModalTypesEnum, TasksState } from '../TasksContext'
import TaskModal from '../components/modals/TaskModal';
import { useEffect } from 'react';

function Dashboard() {

  const { modal } = TasksState();

  useEffect(() => {
    console.log(modal);
  }, [modal])
  
  return (
    <>
      <PageHeader />
      
      <section className="content">

        <div className="container-fluid">
          <div className="row">

            <div className="col-md-8">
              <TasksTable />
            </div>

            <div className="col-md-4">
              <TasksStatistic />
            </div>

          </div>
        </div>
      </section>

      {/* Show the task modal if required. */}
      { modal && modal.type === ModalTypesEnum.TASK && <TaskModal />}
    </>
  )
}

export default Dashboard