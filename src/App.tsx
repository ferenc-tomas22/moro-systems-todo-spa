import {
  CreateTaskButton,
  InformationTitle,
  Tasks,
  TasksActionsButton,
  TasksFilterSelect,
} from './components';

export const App = () => (
  <div className='container-fluid'>
    <div className='text-center mt-5'>
      <CreateTaskButton />
    </div>

    <div className='row'>
      <div className='col-12 col-lg-10 col-xxl-8 mx-auto'>
        <InformationTitle />

        <div className='card shadow-lg px-4 px-md-5 py-3 py-md-5'>
          <TasksFilterSelect />
          <TasksActionsButton />
          <Tasks />
        </div>
      </div>
    </div>
  </div>
);
