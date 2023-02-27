'use client'
import { useState, useEffect, useRef } from 'react';
import type { Product, Categorie } from '@/typings'
import { useForm, SubmitHandler } from "react-hook-form";
import Image from 'next/image';
import { useRouter } from 'next/navigation';


type Props = {
  product: Product | undefined
  categories: Categorie[]
}

export default function ProductForm({ product, categories }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null);
  const uploadFileRef = useRef<HTMLInputElement>(null)
  const [imageUrl, setImageUrl] = useState<string | undefined>(product?.image);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<any>({
    values: {
      pid: product?.pid ? product.pid : null,
      name: product?.name ? product.name : null,
      cid: product?.cid ? product.cid : null,
      desc: product?.desc ? product.desc : null,
      inventory: product?.inventory ? product.inventory : null,
      price: product?.price ? product.price : null,
      image: product?.image ? product.image : '/product'
    },
  });
  console.log('imageUrl>>>>>', imageUrl)
  useEffect(() => {
    reset()
    setFile(null)
    setImageUrl(product?.image)
  }, [product])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileInput = e.target;
    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }
    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }
    const file = fileInput.files[0];
    changeFile(file)
  };
  const handleDrop = (e:React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e?.dataTransfer?.files[0]
    if (!file) return alert("Fuck you");
    changeFile(file)
  };
  const changeFile = (file: File) => {
    if (!file.type.startsWith("image")) {
      alert("Please select a valide image");
      return;
    }
    setFile(file);
    setImageUrl(URL.createObjectURL(file));
  }

  const onSubmit: SubmitHandler<Product> = async (_formData) => {
    let formData = _formData
    setLoading(true)
    if(file) {
      let Image = new FormData();
      Image.append("media", file);
      const res = await fetch("/api/admin/uploadImage", {
        method: "POST",
        body: Image,
      });
      const { data, error, }: {data: { url: string } | null, error: string | null} = await res.json();
      if (error || !data) {
        alert(error || "Sorry! something went wrong.");
        return;
      }
      console.log("Image was uploaded successfylly:", data);
      setImageUrl(data.url)
      formData.image = data.url
    }
    console.log('_formData,,<<.>>>', formData )
    if (product?.pid) {
      const putProductRes = await fetch(`/api2/admin/product/${product?.pid}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });
    } else {
      const postProductRes = await fetch(`/api2/admin/product`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      console.log('postProductRes>>>>>', postProductRes.json())
    }
    setLoading(false)
    router.refresh()
  };

  return (
    <section>
      <div>
        <h4>{product ? `Edit Product ${product.pid}` : `Add`}</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Product Name</label>
          <input {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}

          <label>Categories</label>
          <select {...register("cid", { required: true })} >
            {categories.map((categorie) =>
              <option key={categorie.cid} value={categorie.cid}>{categorie.name}</option>
            )}
          </select>
          {errors.cid && <span>This field is required</span>}

          <label>Price</label>
          <input type='number' {...register("price", { required: true })} />
          {errors.price && <span>This field is required</span>}

          <label>Descrition</label>
          <textarea cols={50} rows={4} {...register("desc", { required: true })} />
          {errors.desc && <span>This field is required</span>}

          <label>Inventory</label>
          <input type='number' {...register("inventory", { required: true })} />
          {errors.inventory && <span>This field is required</span>}

          <label>Image</label>
          <div className='uploadImage'>
            <div className="drag-area"
              onDragOver={(e) =>{e.preventDefault(); (e.target as Element).className = "drag-area dragOver"; }}
              onDragLeaveCapture={(e) =>{e.preventDefault(); (e.target as Element).className =  "drag-area"; }}
              onDrop={(e) => {handleDrop(e); (e.target as Element).className = "drag-area"; }}
            >
              <header>Drag & Drop to Upload File</header>
              <p>OR</p>
              <button type='button' onClick={() => {if(uploadFileRef.current) uploadFileRef.current.click()}}>Browse File</button>
              <input type="file" hidden onChange={(e) => handleFileChange(e)} ref={uploadFileRef} />
            </div>

            {imageUrl && (
              <div>
                <p>Preview</p>
                <Image
                  alt="file uploader preview"
                  src={imageUrl ? imageUrl : product?.image ? product?.image : ''}
                  width={320}
                  height={218}
                />
              </div>
            )}
          </div>
          {loading && (<p>Loading</p>)}
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>

  )
}