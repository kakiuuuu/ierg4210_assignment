'use client'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectUser, setUser } from '@/store/reducer/user'
import { useRouter } from 'next/navigation';

type Props = {}


const UserPage = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState<string | null>(null)
  const user = useAppSelector(selectUser)

  const router = useRouter();
  const dispatch = useAppDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm({
    values: {
      password: '',
      newPassword: '',
    },
  });

  const onSubmit: SubmitHandler<any> = async (formData) => {
    dispatch(setUser(null))
  }

  useEffect(() => {
    if(!user) {
      router.push('/login')
    }

  }, [user, router])
  
  return (
    <main className='clientPageMain'>
      <h4>Change Password</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Current Password</label>
        <input type="password" {...register("password", { required: true, })} />
        {errors.password && <span>This field is required</span>}
        <label>New Password</label>
        <input type="password" {...register("password", { required: true, })} />
        {errors.password && <span>This field is required</span>}
        {loading && (<div className="lds-ellipsis"><div /><div /><div /><div /></div>)}
        {warning && <span>{warning}</span>}
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default UserPage
