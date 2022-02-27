import { useState, useCallback } from 'react';
import React from 'react';
import DemoOutput from './components/UI/Button/DemoOutput';
import Button from './components/UI/Button/Button';
import './App.css';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);
  console.log('APP RUNNING');
  const toggleParagraphHandler = useCallback(() => {
    if(allowToggle){
      setShowParagraph((prevShowParagraph)=>!prevShowParagraph);
    }
    //함수 클로저: 함수 내부의 있는 변수는 함수 내부에서만 사용가능
    //allowToggle은 app의 지역변수로 useCallback함수의 콜백함수에서 사용
    // 그러므로 자바스크립트는 allowToggle을 함수안에 저장시킴
    //toggleParagraphHandler가 실행되면 해당 함수 안에 저장된 allowToggle이 사용됨
    // useCallback은 리액트에게 function을 저장하라고 시키고 function은 메모리 어딘가에 저장됨
    // app function이 toggle state가 변해서 re-evaluate / re-execute될 때
    // 리액트는 useCallback으로 저장한 함수를 재생산하지 않으므로  allowToggle은 처음 컴포넌트가 실행되었을 떄 값으로 저장되서 업데이트가 되지 못함
    //그래서 deps에 넣어줄 값으로 해당 값이 바뀔 때마다 함수를 재생산하고 다시 저장시켜
    // 그래서 최신의 값을 사용할 수 있도록 만들어줌
  }, [allowToggle]);
  const allowToggleHandler=()=>{
    setAllowToggle(true)
  }
  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph}/>
      {/* 부모 컴포넌트가 re-evaluate될 때 같이 re-excute되지 않고 show가 변할 때만 re-excute되도록 만들어 주고 싶음 */}
      <Button onClick={allowToggleHandler}>Allow Toggling</Button>
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    </div>
  );
}

export default App;

//함수들은 컴포넌트가 리렌더링 될 때 마다 새로 만들어집니다. 함수를 선언하는 것 자체는 사실 메모리도, CPU 도 리소스를 많이 차지 하는 작업은 아니기 때문에 함수를 새로 선언한다고 해서 그 자체 만으로 큰 부하가 생길일은 없지만, 한번 만든 함수를 필요할때만 새로 만들고 재사용하는 것은 여전히 중요합니다.

//deps: 배열 내의 값이 변경될 때까지 저장해놓고 재사용

//주의 하실 점은, 함수 안에서 사용하는 상태 혹은 props 가 있다면 꼭, deps 배열안에 포함시켜야 된다는 것 입니다. 만약에 deps 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면, 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조 할 것이라고 보장 할 수 없습니다. props 로 받아온 함수가 있다면, 이 또한 deps 에 넣어주어야 해요.

//useCallback은 특정 함수를 새로 만들지 않고 재사용하고 싶을 때 사용
// 리액트에게 function을 저장하고 싶다고 말해줌 즉 매번 re-execution될 때마다 function을 재생산하지 않고
// 같은 메모리 위치에 same function object가 저장됨
// 그러므로 비교가 가능해짐
// let obj1={}
// let obj2={}
// obj1 === obj2 ...false
// obj2 = obj1
// obj1을 obj2의 메모리 위치를 가리키도록 만듦
// obj1 === obj2 ...true
// 위와 같은 원리로 useCallback이 동작
// 그래서 component가 re-execute될 때마다 function을 새로 만들지 않고 저장된 function을 가져다씀