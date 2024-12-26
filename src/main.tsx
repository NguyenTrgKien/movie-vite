import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.tsx';
import Context from './components/Context/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
        <Context>
          <Router>
            <App />
          </Router>
        </Context>
      </Provider>
  </StrictMode>,
)
