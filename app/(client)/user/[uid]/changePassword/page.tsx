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
      repeatNewPassword: ''
    },
  });

  const onSubmit: SubmitHandler<any> = async (formData) => {
    setLoading(true)
    if (formData.newPassword !== formData.repeatNewPassword) {
      setWarning('New passwords do not match')
      setLoading(false)
      return
    }
    if (formData.newPassword === formData.password) {
      setWarning('New password cannot be the same as the old one')
      setLoading(false)
      return
    }
    const putUser = await fetch(`/api/auth/changePassword`, {
      method: "PUT",
      body: JSON.stringify({ ...formData, id: user?.id }),
    });
    const data = await putUser.json();
    if (data.error) {
      setWarning(data.error)
    } else {
      alert('Password changed')
      dispatch(setUser(null))
    }
    setLoading(false)
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
        <input type="password" {...register("newPassword", { required: true, })} />
        {errors.password && <span>This field is required</span>}
        <label>Repeat New Password</label>
        <input type="password" {...register("repeatNewPassword", { required: true, })} />
        {errors.password && <span>This field is required</span>}
        {loading && (<div className="lds-ellipsis"><div /><div /><div /><div /></div>)}
        {warning && <span>{warning}</span>}
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default UserPage
