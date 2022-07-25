import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from './Header'

export default function AppFrame() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="max-w-[1000px] mx-auto mt-2">
        <Outlet />
      </div>
    </>
  )
}
