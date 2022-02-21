import { useState } from "react";

import Header from "./component/Layout/Header";
import Meals from "./component/Meals/Meals";
import Cart from "./component/Cart/Cart";
import CartProvider from "./store/CardProvider";

function App() {
  const [cartIsShowm, setCartIsShown] = useState(false);

  const showCartHandler = ()=>{
    setCartIsShown(true)
  }
  const hideCartHandler= () =>{
    setCartIsShown(false)
  }

  return (
    <CartProvider>
      {cartIsShowm && <Cart onClose={hideCartHandler}/>}
      <Header 
      onShowCart={showCartHandler}
      />
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
