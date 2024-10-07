import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TreeContextProvider from './store/tree-context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TreeContextProvider>
      <App />
    </TreeContextProvider>
  </React.StrictMode>,
)
