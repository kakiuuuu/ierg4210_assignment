'use client'
import type { Categorie, Product } from '@/typings'
import ProductForm from './ProductForm';

import { useState } from 'react'
import { useRouter } from 'next/navigation';
type Props = {
  categories: Categorie[]
  products: Product[]
}

export default  function ProductTable({ products, categories }: Props) {
  const [selectedItem, setSelectedItem] = useState<Product|undefined>()
  const router = useRouter()

  const handleDelete = async (cid:number) => {
    const deleteCategorie = await fetch(`/api2/admin/product/${cid}`, {
      method: "DELETE",
    });
    router.refresh()
  }
  return (
    <>
      <section>
        <h4>Categorie List</h4>
        <button onClick={()=> {setSelectedItem(undefined)}}>Add new</button>
        <div className="table">
          <h4>Operation</h4>
          <h4>ID</h4>
          <h4>Name</h4>
          <h4>Categorie</h4>
          <h4>Price</h4>
          <h4>Inventory</h4>
          {products?.map((product) => {
            return (
              <>
                <div className="buttonGrp">
                  <button onClick={()=> {setSelectedItem(product)}}>Edit</button>
                  <button onClick={()=> {handleDelete(product.cid)}}>Delete</button>
                </div>
                <p>{product.cid}</p>
                <p>{product.name}</p>
                <p>{product.categorie?.name}</p>
                <p>{product.price}</p>
                <p>{product.inventory}</p>
              </>
            )
          })}
        </div>
      </section>
      <ProductForm product={selectedItem} categories={categories}/>
    </>
  )
}