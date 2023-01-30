const getDummyData = () =>{
  const MaxProductNum = 10
  let products = []
  
  for( let i = 0; i< MaxProductNum; i++){
    products[i] = {
      productId: `${i+1}`,
      name: `Product${i+1}`,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu",
      price: i+10,
      inventory: i+1,
      image: '/product.png'
    }
  }
  return products
}
export default getDummyData
