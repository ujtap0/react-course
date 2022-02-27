import { Route, Switch, Redirect } from 'react-router-dom'
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import MainHeader from './components/MainHeader';
import ProductDetail from './pages/ProductDetail';
function App() {
  return (
    <div>
      <MainHeader/>
      <main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='./welcome' />
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          {/* path = URL 이 route는 주소가 our-domain.com/welcome일 때 active되어야 한다*/}
          <Route path="/products" exact>
            <Products/>
          </Route>
          <Route path="/products/:productId">
            <ProductDetail/>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
