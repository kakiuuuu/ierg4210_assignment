'use client'
import { useState, useEffect } from 'react';
import type { User } from '@/typings'
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';

type Props = {
  user: User | null
}

export default function ProductForm({ user }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<User | any>({
    values: {
      uid: user?.uid ? user.uid : null,
      username: user?.username ? user.username : "",
      email: user?.email ? user.email : "",
      pw: user?.pw ? user.pw : "",
    },
  });

  useEffect(() => {
    reset()
  }, [user])

  const onSubmit: SubmitHandler<User> = async (_formData) => {
    setLoading(true)
    if (user?.uid) {
      const putUser = await fetch(`/api/admin/user/${user?.uid}`, {
        method: "PUT",
        body: JSON.stringify({ ..._formData }),
      });
    } else {
      const postUser = await fetch(`/api/admin/user`, {
        method: "POST",
        body: JSON.stringify({ ..._formData }),
      });
    }
    setLoading(false)
    router.refresh()
  };

  return (
    <section>
      <div>
        <h4>{user ? `Edit User ${user.uid}` : `Add new User`}</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>User Name</label>
          <input {...register("username", { required: true })} />
          {errors.username && <span>This field is required</span>}
          <label>Email</label>
          <input {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}
          <label>Password</label>
          <input {...register("pw", { required: true })} />
          {errors.pw && <span>This field is required</span>}
          {loading && (<div className="lds-ellipsis"><div /><div /><div /><div /></div>)}
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  )
}