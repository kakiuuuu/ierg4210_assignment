'use client'
import { useState, useEffect } from 'react';
import type { Categorie } from '@/typings'
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';

type Props = {
  categorie: Categorie | null
}

export default function ProductForm({ categorie }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Categorie | any>({
    values: {
      name: categorie?.name ? categorie.name : "",
      cid: categorie?.cid ? categorie.cid : null,
    },
  });

  useEffect(() => {
    reset()
  }, [categorie])

  const onSubmit: SubmitHandler<Categorie> = async (_formData) => {
    setLoading(true)
    if (categorie?.cid) {
      const putCategorie = await fetch(`/api2/admin/categorie/${categorie?.cid}`, {
        method: "PUT",
        body: JSON.stringify({ ..._formData }),
      });
    } else {
      const postCategorie = await fetch(`/api2/admin/categorie`, {
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
        <h4>{categorie ? `Edit Categorie ${categorie.cid}` : `Add new Categorie`}</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Categorie Name</label>
          <input {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}
          {loading && (<p>Loading</p>)}
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  )
}