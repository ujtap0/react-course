import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css"

const HeaderCartButton = (props) =>{
  const [btnIsHighlighted, setBtnIsHighlighted]=useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  //cartCtx.items를 destructuring
  const numberOfCartItem =items.reduce((curNumber, item)=>{
    return curNumber += item.amount
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump: ''}`
  //useEffect를 사용해서 btnClasses의 classes.bump를 조정
  //timer를 사용해서 class.bump를 제거 다시 classes.bump가 붙여질 때 다시 타이머가 class.bump를 제거
  useEffect(() => {
    //items의 length가 > 0클 때와 items에 변화가 있을 때만 작동하게 만들고 싶음
    if(items.length === 0){
      //위에서 cartCtx.items를 destructuring
      return
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(()=>{
      setBtnIsHighlighted(false)
    }, 300)
    //매우빠르게 item을 추가 한다면 타이머가 가증되므로 delay가 생김 
    //cleanup
    return () => {
      clearTimeout(timer)
    }
  }, [items]);

  //만약 dependencies에 cartCtx를 넘겨주면 cartCtx가 변화가 있을 때 마다 re-rendering됨=원하지 않는 결과
  //destructuring을 통해 cartCtx에서 items를 꺼내줌

  return <button className={btnClasses} onClick={props.onClick}>
    <span className={classes.icon}>
      <CartIcon />
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>
      {numberOfCartItem}
    </span>
  </button>
}
export default HeaderCartButton;