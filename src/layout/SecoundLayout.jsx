import React from 'react'
import { Outlet } from 'react-router-dom';
import LoginAfterHeader from '../components/user/LoginAfterHeader';
export default function SecoundLayout() {
  return (
    <div>
      <LoginAfterHeader />
      <main className='min-h-96'>
        <Outlet />
      </main>
    </div>
  )
}
