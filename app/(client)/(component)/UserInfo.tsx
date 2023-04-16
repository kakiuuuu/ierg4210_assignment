'use client'
import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectUser, setUser } from '@/store/reducer/user'
import Link from 'next/link';

const UserInfo = () => {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    const response = await fetch(`/api/auth/logout`, {
      method: "POST",
    });
    const data = await response.json();
    dispatch(setUser(null))
  }

  return (
    <div className='userInfo'>
      {user?.username ? (
        <>
          <p>hi~ {user.username}</p>
          <div className='userMenu'>
            <Link href={`/user/${user.id}`}>My Account</Link>
            <Link href={`/user/${user.id}/changePassword`}>Change Password</Link> 
            {user.admin && <Link href={'/admin'}>Admin Panel</Link>}
            <Link href={'/'} onClick={() => handleLogout()}>Logout</Link>
          </div>
        </>
      ) : (
      <Link href={'/login'} >Login</Link>
      )}
    </div>
  )
}


export default UserInfo