import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import Dashboard from './components/Dashboard';

import { ContextProvider } from './context/Provider'

function App() {
  return (
    <>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ContextProvider>
      <ToastContainer theme="colored" />
    </>
  )
}

export default App