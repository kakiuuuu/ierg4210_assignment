export interface Categorie {
  cid: number,
  name: string,
  products?: Product[]
};

export interface Product {
  pid: number,
  cid: number,
  name: string,
  price: number,
  desc: string,
  image: string,
  inventory: number,
  categorie?: Categorie
};

export interface User {
  id: number
  username?: string | null
  email?: string | null
  pw: string
  salt: string
  admin?: boolean
}