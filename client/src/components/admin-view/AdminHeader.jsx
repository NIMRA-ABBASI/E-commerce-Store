

import { logoutUser } from '@/store/auth-Slice';
import { Button } from '@base-ui/react'
import { LogOut, TextAlignJustify } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'

function AdminHeader({setOpen}) {

  const dispatch = useDispatch();
  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block">
        <TextAlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>

       <div className="flex flex-1 justify-end">
        <Button onClick={()=>dispatch(logoutUser())} className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
          <LogOut />
          Logout
        </Button>
       </div>
    </header>
  )
}

export default AdminHeader