import { Fragment, useEffect } from "react/cjs/react.development";
import { useParams, Route, Link, useRouteMatch} from "react-router-dom";
import useHttp  from "../../hooks/hooks/use-http";
import { getSingleQuote } from "../../lib/lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import HighlightedQuote from "../quotes/HighlightedQuote";
import Comments from "../comments/Comments";


const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const {quoteId} = params;

  const {sendRequest, status, data: loadedQuote, error}=useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  },[sendRequest, quoteId])

  if(status === 'pending'){
    return <div className="centered">
      <LoadingSpinner/>
    </div>
  }

  if(error){
    return <p className="centered">{error}</p>
  }
  if(!loadedQuote.text){
    return <p>No quote found!</p>
  }

  return <Fragment>
    <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
    {/* nested Route 아래 라우터는 중간에 주소로 params의 quoteId를 받음 */}
    <Route path={match.path} exact>
      <div className="centered">
        <Link to={`${match.url}/comments`} className='btn--flat'>
          Load Comments
        </Link>
      </div>
    </Route>
    <Route path={`${match.path}/comments`}>
      <Comments/>
    </Route>

    </Fragment>
}
export default QuoteDetail