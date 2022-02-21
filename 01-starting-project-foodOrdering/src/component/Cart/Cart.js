import { useContext } from 'react'

import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartItem from './CartItem'
import CartContext from '../../store/cart-context'

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };
  const cartITemAddHanlder = item => {
    //CartProvider의 addItem: addItemToCartHanlder이 작동
    cartCtx.addItem({...item, amount: 1})
  };
  //bind를 대체 왜쓰는가
  //onRemove={cartItemRemoveHandler(item.id)}와 같이 쓰면 함수가 즉시 호출됨
  //그런데 함수에 params를 전달되도록 해주고 싶을 때 bind를 써줌
  //onRemove = {() => cartItemRemoveHandler(item.id)}익명함수를 사용해도
  const cartItem = <ul className={classes['cart-items']}>{
    cartCtx.items.map((item)=>(
      <CartItem 
        key={item.id}
        name={item.name}
        amount ={item.amount}
        price ={item.price}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd = {cartITemAddHanlder.bind(null, item)}
      />
    ))
    }</ul>

  return <Modal onClose={props.onClose}>
    {cartItem}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      {hasItems && <button className={classes.button}>Order</button>}
    </div>
  </Modal>
}

export default Cart;