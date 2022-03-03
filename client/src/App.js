import './App.css';
import Sidebar from './components/Sidebar';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Tasks from "./pages/Tasks";
import Home from "./pages/Home";
import Modules from "./pages/Modules";
import Grades from "./components/ListGrades";
import Landing from './components/Landing';
//import Dashboard from './components/Dashboard';
import { Fragment } from 'react';
import Login from "./components/Login";
import Register from "./components/Register";
import React, { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Dashboard from './components/Dashboard';
import ListTasks from './components/ListTasks';
import PrioritizedTasks from './components/PrioritizedTasks';

toast.configure();

function App() {
  
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.jwt_token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      console.log(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };
  
  return (
    <div className="App">
      <Router>
          <div className="left" style={{ float: 'left' }}>
          <Sidebar />
          </div>
          <div className='right'>
          <Switch>
            <Route
              exact
              path="/login"
              render={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/tasks" />
                    )
                  }
                  />
            <Route
              exact
              path="/register"
              render={props =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/tasks" />
                  )
                }
                />
            <Route
              exact
              path="/tasks"
              render={props =>
                isAuthenticated ? (
                  <ListTasks {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/login" />
                    )
                  }
                  />
            <Route
              exact
              path="/"
              render={props =>
                isAuthenticated ? (
                  <PrioritizedTasks {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/login" />
                    )
                  }
                  />
                        <Route
              exact
              path="/modules"
              render={props =>
                isAuthenticated ? (
                  <Modules {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/login" />
                    )
                  }
                  />
                  <Route
              exact
              path="/grades"
              render={props =>
                isAuthenticated ? (
                  <Grades {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/login" />
                    )
                  }
                  />
          
          </Switch>
          </div>
      </Router>
        </div>
  
  );
}


export default App;

