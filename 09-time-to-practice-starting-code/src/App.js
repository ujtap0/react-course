import { Route, Switch, Redirect } from 'react-router-dom';

import AllQuotes from './components/pages/AllQuotes';
import QuoteDetail from './components/pages/QuoteDetail';
import NewQuotes from './components/pages/NewQuotes';
import NotFound from './components/pages/NotFound';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/quotes'/>
        </Route>
        <Route path='/quotes' exact>
          <AllQuotes/>
        </Route>
        <Route path='/quotes/:quoteId'>
          <QuoteDetail/>
        </Route>
        <Route path="/new-quote">
          <NewQuotes/>
        </Route>
        {/* *: any url 가장 마지막에 위치해야함 위에서 주소가 걸리는게 없으면 해당 페이지를 모여주도록*/}
        <Route path='*'>
          <NotFound/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
