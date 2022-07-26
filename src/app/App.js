import React, { useEffect } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'

import routes from './routes'

function App() {
  const navigate = useNavigate()
  const element = useRoutes(routes)
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === '/index.html') {
      navigate('/')
    }
  }, [pathname, navigate])
  return <div className="bg-slate-100 min-h-screen">{element}</div>
}

export default App
