import logo from './logo.svg';
import './App.css';
import react, {Fragment} from 'react'

// components
import InputTask from './components/InputTask';
import ListTasks from './components/ListTasks';

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTask>
        </InputTask>
        <ListTasks></ListTasks>
      </div>
    </Fragment>
  );
}

export default App;
