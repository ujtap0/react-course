import Card from './Card';
import useCounter from '../hooks/use-counter'

const ForwardCounter = () => {
  const counter = useCounter();

  return <Card>{counter}</Card>;
};

export default ForwardCounter;


//Custom Hook
//일반적인 function와 달리 커스텀 훅은 다른 react hook과 react state를 사용할 수 있다
// 그러므로 커스텀 훅은 useState와 useReducer와 함께 상태관리엥 영향력을 미칠 수 있다 