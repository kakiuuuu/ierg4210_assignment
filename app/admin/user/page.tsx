import type { User } from '@/typings'
import UserTable from './UserTable';
import { prisma } from '@/prisma/client';

async function getUsers() {
  const users: User[]  = await prisma.user.findMany()
  return users
}

export default async function UserPage() {
  const users = await getUsers()

  return (
    <main className='adminPageMain'>
      <h3>User</h3>
      <UserTable users={users} />
    </main>
  )
}

export const revalidate = 0
