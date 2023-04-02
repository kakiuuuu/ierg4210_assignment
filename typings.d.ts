export type Categorie = {
  cid: number,
  name: string,
  products?: Product[]
};

export type Product = {
  pid: number,
  cid: number,
  name: string,
  price: number,
  desc: string,
  image: string,
  inventory: number,
  categorie?: Categorie
};

export type User = {
  uid: number
  username?: string | null
  email?: string | null
  pw: string
  salt: string
  admin?: boolean
}