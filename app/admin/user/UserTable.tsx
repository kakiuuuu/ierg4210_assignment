'use client'
import type { User } from '@/typings'
import UserForm from './UserForm';

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
type Props = {
  users: User[]
}

export default function UserTable({ users }: Props) {
  const [selectedItem, setSelectedItem] = useState<User | null>(null)
  const router = useRouter()

  const handleDelete = async (id: number) => {
    const deleteUser = await fetch(`/api/admin/user/${id}`, {
      method: "DELETE",
    });
    router.refresh()
  }
  return (
    <>
      <section>
        <h4>User List</h4>
        <button onClick={() => { setSelectedItem(null) }}>Add new</button>
        <div className="userTable">
          <h4>Operation</h4>
          <h4>ID</h4>
          <h4>Username</h4>
          <h4>Email</h4>
          <h4>Admin</h4>
          {users?.map((user) => {
            return (
              <React.Fragment key={user.id}>
                <div className="buttonGrp">
                  <button onClick={() => { setSelectedItem(user) }}>Edit</button>
                  <button onClick={() => { handleDelete(user.id) }}>Delete</button>
                </div>
                <p>{user.id}</p>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>{user.admin ? 'Yes' : 'No'}</p>
              </React.Fragment>
            )
          })}
        </div>
      </section>
      <UserForm user={selectedItem} />
    </>
  )
}