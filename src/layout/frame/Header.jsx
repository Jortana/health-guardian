import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="p-4 bg-white dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex justify-between h-16 mx-auto max-w-[1000px]">
        <div className="flex items-center p-2">
          <h1 className="text-3xl font-bold">健康守卫</h1>
        </div>
        <ul className="flex items-stretch space-x-3 text-base">
          <li className="flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center px-4 -mb-1 border-b-2 border-sky-400 dark:border-transparent'
                  : 'flex items-center px-4 -mb-1 border-b-2 dark:border-transparent'
              }
            >
              总览
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/anxiety"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center px-4 -mb-1 border-b-2 border-sky-400 dark:border-transparent'
                  : 'flex items-center px-4 -mb-1 border-b-2 dark:border-transparent'
              }
            >
              焦虑测试
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/depression"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center px-4 -mb-1 border-b-2 border-sky-400 dark:border-transparent'
                  : 'flex items-center px-4 -mb-1 border-b-2 dark:border-transparent'
              }
            >
              抑郁测试
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/ocd"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center px-4 -mb-1 border-b-2 border-sky-400 dark:border-transparent'
                  : 'flex items-center px-4 -mb-1 border-b-2 dark:border-transparent'
              }
            >
              强迫测试
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center px-4 -mb-1 border-b-2 border-sky-400 dark:border-transparent'
                  : 'flex items-center px-4 -mb-1 border-b-2 dark:border-transparent'
              }
            >
              设置
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}
