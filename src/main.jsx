import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppStateProvider } from './state.jsx'

createRoot(document.getElementById('root')).render(
  <AppStateProvider>
   <App />
</AppStateProvider>
)
