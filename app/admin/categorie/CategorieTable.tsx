'use client'
import type { Categorie } from '@/typings'
import CategorieForm from './CategorieForm';

import { useState } from 'react'
import { useRouter } from 'next/navigation';
type Props = {
  categories: Categorie[]
}

export default function CategorieTable({ categories }: Props) {
  const [selectedItem, setSelectedItem] = useState<Categorie | null>(null)
  const router = useRouter()

  const handleDelete = async (cid: number) => {
    const deleteCategorie = await fetch(`/api2/admin/categorie/${cid}`, {
      method: "DELETE",
    });
    router.refresh()
  }
  return (
    <>
      <section>
        <h4>Categorie List</h4>
        <button onClick={() => { setSelectedItem(null) }}>Add new</button>
        <div className="categorieTable">
          <h4>Operation</h4>
          <h4>ID</h4>
          <h4>Name</h4>
          {categories?.map((categorie) => {
            return (
              <>
                <div className="buttonGrp">
                  <button onClick={() => { setSelectedItem(categorie) }}>Edit</button>
                  <button onClick={() => { handleDelete(categorie.cid) }}>Delete</button>
                </div>
                <p>{categorie.cid}</p>
                <p>{categorie.name}</p>
                {/* TODO: add number of cat */}
              </>
            )
          })}
        </div>
      </section>
      <CategorieForm categorie={selectedItem} />
    </>
  )
}