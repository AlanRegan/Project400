// import logo from './logo.svg';
// import './App.css';
// import react, {Fragment} from 'react';
// import Sidebar from "./components/Sidebar";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Tasks from "./pages/Tasks";
// import Home from "./pages/Home";
// import Modules from "./pages/Modules";

// // components
// import InputTask from './components/InputTask';
// import ListTasks from './components/ListTasks';

// function App() {
//   return (
    
//     <Fragment>
//         <Router>
//     <Sidebar />
//     <Routes>
      // <Route path="/home" element={<Home/>}/>
      // <Route path="/tasks" element={<Tasks/>} />
      // <Route path="/modules" element={<Modules/>} />
//     </Routes>
//     </Router>
          
//       <div className="container">
//       </div>
     
//     </Fragment>
//   );
// }

// export default App;

import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Home from "./pages/Home";
import Modules from "./pages/Modules";
import { Fragment } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
      <div className="left" style={{float: 'left'}}>
      <Sidebar />
      </div>
      <div className="right">
        <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/tasks" element={<Tasks/>} />
      <Route path="/modules" element={<Modules/>} />
      </Routes>
    </div>
    </Router>
    </div>
  );
}

export default App;

