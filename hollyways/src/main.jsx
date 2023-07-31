import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-bootstrap'
import { BrowserRouter as Route } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Route>
          <App />
        </Route>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
