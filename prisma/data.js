const categories = [
  {
    name: 'Fish',
  },
  {
    name: 'Beef',
  },
  {
    name: 'Pork',
  },
];
const products = [
  {
    name: 'Fish 1',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc',
    price: 10,
    inventory: 10,
    image: '/product.png',
    cid: 1,
  },
  {
    name: 'Fish 2',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc',
    price: 20,
    inventory: 3,
    image: '/product.png',
    cid: 1,
  },
  {
    name: 'Fish 3',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc',
    price: 5,
    inventory: 10,
    image: '/product.png',
    cid: 1,
  },
  {
    name: 'Beef 1',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc',
    price: 30,
    inventory: 8,
    image: '/product.png',
    cid: 2,
  },
  {
    name: 'Beef 2',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc',
    price: 30,
    inventory: 8,
    image: '/product.png',
    cid: 2,
  },
  {
    name: 'Pork 1',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc',
    price: 4,
    inventory: 20,
    image: '/product.png',
    cid: 3,
  },
];

const user = [
  {
    username: 'admin',
    pw: '1155143596',
    admin: true,
    salt: '',
  },
  {
    username: 'guest',
    pw: 'guest',
    admin: false,
    salt: '',
  },
];
export { products, categories, user };