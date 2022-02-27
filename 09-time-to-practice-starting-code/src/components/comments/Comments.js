import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/hooks/use-http';
import { getAllComments } from '../../lib/lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const {quoteId} = params

  const {sendRequest, status, data: loadedComments} = useHttp(getAllComments);

  useEffect(()=>{
    sendRequest(quoteId)
  }, [quoteId, sendRequest])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHanlder = useCallback(() => {
    sendRequest(quoteId)
  },[sendRequest, quoteId])
  //useEffect에서 사용되었는데 useCallback을 사용하지 않으면 infinite loop에 빠짐
  //useCallback: fn이 계속 재생성되지 않도록

  let comments;

  if(status === 'pending'){
    comments = <div className='centered'><LoadingSpinner/></div>
  }

  if(status === 'completed' && (loadedComments && loadedComments.length > 0)){
    comments = <CommentsList comments = {loadedComments}/>
  }

  if(status === 'completed' && (!loadedComments || loadedComments.length === 0)){
    comments = <p className='centered'>No comments were added yet!</p>
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={params.quoteId} onAddedComment={addedCommentHanlder}/>}
      {comments}
    </section>
  );
};

export default Comments;
