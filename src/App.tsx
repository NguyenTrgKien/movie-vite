import {Routes, Route} from 'react-router-dom';
import { RouterPublic } from './Router';
import './App.css';

function App() {
  return (
    <Routes>
      {RouterPublic.map((item, index) => {
        return (
          <Route key={index} path={item.path} element={item.element}/> 
        )
      })}
    </Routes>
  )
}

export default App
