import { useEffect } from "react";
import QuoteForm from "../quotes/QuoteForm"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
//브라우저 히스토리 조작 브라우저 히스토리: 방문한 페이지
import useHttp from "../../hooks/hooks/use-http";
import { addQuote } from "../../lib/lib/api";

const NewQuotes = () =>{
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if(status === 'completed'){
      history.push('/quotes')
    }
  }, [status, history])

  const addQuoteHanlder = quoteData =>{
    sendRequest(quoteData)
  } 
  return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHanlder}/>
}
export default NewQuotes