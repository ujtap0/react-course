import { useSelector, useDispatch } from 'react-redux';

import classes from './Counter.module.css';

import { counterActions }from '../store/counter'

const Counter = () => {
  const dispatch = useDispatch();
  //store에서 어떤 데이터를 꺼내어 올건지 결정
  //매개변수로 들어있는 fn은 react-redux가 실행시켜줌
  const counter = useSelector(state => state.counter.value)
  const show = useSelector(state => state.counter.showCounter)

  const decrementHandler = () => {
    dispatch(counterActions.decrement())
  }
  const incrementHandler = () => {
    dispatch(counterActions.increment())
  }

  const increaseHandler = () => {
    dispatch(counterActions.increase(5))
    //payload data를 인자로 넘겨줌 어떤 데이터 타입도 넣어줄 수 있음
    //액션객체는 다음과 같음 {type: SOME_UNIQUE_IDENTIFIER, payload: 5}
    //payload key는 리덕스 툴킷이 default로 지정해둔 key name
  }
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
  };


  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>increment</button>
        <button onClick={increaseHandler}>increase by 5</button>
        <button onClick={decrementHandler}>Decremnet</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
 