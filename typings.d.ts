export type Categorie = {
  cid: number,
  name: string,
}

export type Product = {
  pid: number,
  cid: number,
  name: string,
  price: number,
  desc: string,
  image: string,
  inventory: number,
  categorie: Categorie?
}
