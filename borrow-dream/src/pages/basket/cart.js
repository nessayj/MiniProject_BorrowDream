import Head from "../header";
import Footer from "../footer";
import CartInfo from "./cartList";
import { useState, useEffect, useContext } from "react";
import CartApi from "../../api/cartApi";
import { UserContext } from "../../context/userInfo";

export const Cart = ({ cart, setCart, convertPrice, checkedAll, setCheckedAll, checkedItems, setCheckedItems }) => {
  const [total, setTotal] = useState(0);
  const context = useContext(UserContext);
  const { userId } = context;

  const handleRemove = async (id) => {
    try {
      await CartApi.deleteCartItem(userId, id);
      const newCart = cart.filter((item) => item.bk_pname !== id);
      setCart(newCart);
      console.log(cart);
    } catch (error) {
      console.log(error);
    }
  };
  const handleQuantity = async (type, id) => {
    try {
      const cartItem = cart.find((item) => item.bk_pname === id);
      let newQuantity = cartItem.quantity;
      if (type === "minus") {
        newQuantity--;
      } else if (type === "plus") {
        newQuantity++;
      }
      await CartApi.updateQuantity(userId, cartItem.bk_pname, newQuantity);
      const updatedCart = await CartApi.cartListGet(userId);
      setCart(updatedCart.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const cartList = async () => {
      try {
        const response = await CartApi.cartListGet(userId);
        setCart(response.data)
        console.log(userId);
        console.log("장바구니 리스트");
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    cartList();
  }, [])
  return (
    <>
      <Head />
      <CartInfo 
      cart={cart}
      setCart={setCart}
      handleQuantity={handleQuantity}
      handleRemove={handleRemove}
      total={total} 
      setTotal={setTotal} 
      convertPrice={convertPrice}
      checkedAll={checkedAll} 
      setCheckedAll={setCheckedAll}
      checkedItems={checkedItems} 
      setCheckedItems={setCheckedItems}
      />
      <Footer />
      </>
  );
};
