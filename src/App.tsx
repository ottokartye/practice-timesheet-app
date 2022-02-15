import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import TaskModal from './components/modals/TaskModal';
import Dashboard from './pages/Dashboard';
import Footer from './partials/Footer';
import Navigation from './partials/Navigation';
import Sidebar from './partials/Sidebar';
import { TasksContext } from './TasksContext';

function App() {

  return (
    <BrowserRouter>
      <TasksContext>

        <Navigation />

        <Sidebar />

        <div className="content-wrapper">

          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>

        </div>

        <Footer />
      
      </TasksContext>
    </BrowserRouter>
  );
}

export default App;
