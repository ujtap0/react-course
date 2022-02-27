import { useEffect } from "react";
import QuoteList from "../quotes/QuoteList";
import useHttp from "../../hooks/hooks/use-http";
import { getAllQuotes } from "../../lib/lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoQuotesFound from "../quotes/NoQuotesFound";

const AllQuotes = () => {
  const {sendRequest, status, data:loadedQuote, error } = useHttp(getAllQuotes, true)
  useEffect(()=>{
    sendRequest();
  },[sendRequest]);

  if(status === 'pending'){
    return <div className="centered">
      <LoadingSpinner/>
    </div>
  }

  if(error){
    return <p className="centered focused">{error}</p>
  }

  if(status === 'completed' && (!loadedQuote || loadedQuote.length === 0)){
    return <NoQuotesFound/>
  }

  return <QuoteList quotes={loadedQuote}/>
}
export default AllQuotes