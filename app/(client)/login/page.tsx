'use client'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setUser } from '@/store/reducer/user'
import { useRouter } from 'next/navigation';

type Props = {}

interface User {
  username: string,
  password: string,
}

const LoginPage = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState<string | null>(null)
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    values: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<User> = async (formData) => {
    setLoading(true)
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ ...formData }),
    });
    const data = await response.json();
    if (data.error) {
      setLoading(false)
      return setWarning(data.error)
    }
    dispatch(setUser(data))
    setLoading(false)
    return router.push('/')
  }


  return (
    <main className='clientPageMain'>
      <h4>{`Login`}</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input {...register("username", { required: true })} />
        {errors.username && <span>This field is required</span>}
        <label>Password</label>
        <input type="password" {...register("password", { required: true, })} />
        {errors.password && <span>This field is required</span>}
        {loading && (<div className="lds-ellipsis"><div /><div /><div /><div /></div>)}
        {warning && <span>{warning}</span>}
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default LoginPage
