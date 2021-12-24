import logo from './logo.svg';
import './App.css';
import react, {Fragment} from 'react';
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Home from "./pages/Home";

// components
import InputTask from './components/InputTask';
import ListTasks from './components/ListTasks';

function App() {
  return (
    
    <Fragment>
        <Router>
    <Sidebar />
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/tasks" element={<Tasks/>} />
    </Routes>
    </Router>
          
      <div className="container">
      </div>
     
    </Fragment>
  );
}

export default App;
