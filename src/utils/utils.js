export const getDB = () => {
  return JSON.parse(localStorage.getItem("shoppingCart"));
};

export const addItemInCart = (id, quantity) => {
  const exist = getDB();
  console.log(id, quantity);
  if (!exist) {
    const obj = {};
    obj[id] = quantity;
    setDB(obj);
  } else {
    let newObj;
    if (exist[id]) {
      const newQuantity = quantity + exist[id];
      newObj = { ...exist };
      newObj[id] = newQuantity;
    } else {
      newObj = { ...exist };
      newObj[id] = quantity;
    }
    setDB(newObj);
  }
};

const setDB = (obj) => {
  localStorage.setItem("shoppingCart", JSON.stringify(obj));
};

export const clearDB = () => {
  localStorage.removeItem("shoppingCart");
};

export const removeFromCart = (id) => {
  const cart = getDB();
  console.log(cart);
  delete cart[id];
  setDB(cart);
};
