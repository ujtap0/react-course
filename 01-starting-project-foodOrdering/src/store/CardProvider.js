import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount:0
}

//state는 last cartState
const cartReducer = (state, action) =>{
  if(action.type === 'ADD'){
    //push를 쓰면 메모리에 리액트가 모르게 원래있던 객체가 수정됨
    //concat은 새 array 반환되므로 더 좋음
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
    //findIndex()메서드는 주어진 판별함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환합니다.
    //existingCartItemIndex는 state.items array에서 막 입력된 item과 같은 item이 있으면 state.items의 index를 반환합니다
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
    //item이 array에 있는 경우에만 동작합니다 왜냐하면 없으면 existingCartItemIndexs는 null을 반환
    const existingCartItem = state.items[existingCartItemIndex]

    let updatedItem;
    let updatedItems;
    //existingCartItem이 있으면 updateItem에 ...를 써서 복사해주고 amount만 update해줌
    if(existingCartItem){
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      //먼저 updatedItems에 기존에 있는 state.items를 복사해주고 찾은 existingCartItemIndex로 updatedItem을 업데이트해줌
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }else{
      //추가하려는 item이 기존의 items에 없는 경우 state.items에 action.item을 붙임
      updatedItem = {...action.item}
      updatedItems = state.items.concat(updatedItem)
    }
    //위의 코드는 if/else문으로 추가하려는 item이 이미 배열에 있는 경우와 없는 경우를 나눠서 logic을 짜 주었고
    //결과적으로 return하는 값은 업데이트 됨
    return{
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  //cartItem removeItem logic
  if(action.type === 'REMOVE'){
    //1st: 카트에 아이템이 있는 지 확인
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);//action.item.id가 아니라 action.id이어야 함 dispatchCartAction에서 item이 아니라 id 넘겨줌
    const existingItem = state.items[existingCartItemIndex];
    //선택된 item의 price를 totalAmount애서 빼주기
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    //existingItem의 amount가 1일 경우 완전히 제거
    if(existingItem.amount === 1){
      updatedItems = state.items.filter(item=> item.id !== action.id)//item.id가 action.id와 같지 않는 모든 아이템을 반환=action.id와 같은 id를 가진 item이 제거됨
    //amount만 줄이고 싶음
    }else{
      const updatedItem = {...existingItem, amount: existingItem.amount -1 }
      updatedItems=[...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    }
    return{
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  return defaultCartState;
}

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

  const addItemToCartHanlder = item => {
    dispatchCartAction({type: 'ADD', item: item})
  };
  const removeItemFromCartHandler = (id) =>{
    dispatchCartAction({type: 'REMOVE', id: id })
  }
  
  const cartContext = {
    items : cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHanlder,
    removeItem: removeItemFromCartHandler
  }

  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
};

export default CartProvider