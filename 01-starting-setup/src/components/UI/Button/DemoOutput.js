import React from "react"

import MyParagraph from "./MyParagraph"

const DemoOutput = (props) => {
  console.log('DemoOutput RUNNING')
  return <MyParagraph>{props.show?'This is new!':''}</MyParagraph>
}
export default React.memo(DemoOutput)
// 불필요한 re-rendering 피하기
// React.memo() : functional componenet를 최적화 해준다
// 리액트에게 인자로 받은 component의 props를 확인해서 모든 props의 새로운 value check
// 그 다음 이전 props의 값과 비교해서 props의 value값이 변화가 있을 때만 컴포넌트가 re-executed/re-evaluated되도록 해준다
// 만약 parent component에 변화가 있으나 해당 컴포넌트의 prop value에는 변화가 없을 경우 해당 컴포넌트의 re-execution은 스킵됨
// 왜 모든 컴포넌트에 React.memo()안쓰는가
// 왜냐면 최적화에도 비용이 듦
// 메모는 리액트에게 App컴포넌트가 바뀔 때마다 prop들의 값을 확인하라고 시킴
// 그러면 리액트는 두가지 일을 해야함
// 1. 이전의 prop의 값을 저장
// 2. prop value 비교작업
// 즉 react.memo를 쓰는 것은 re-evaluate작업의 비용과 컴포넌트의 prop의 value를 비교하는 작업 비용과 교환한 샘
// 어느 비용이 더 높은지 정확히 판단하는 것은 불가능하다 왜냐하면 그것은 얼마나 많은 prop이 있는지 혹은 컴포넌트의 복잡한 정도 혹은 컴포넌트의 자식 컴포넌트의 수에 따라 달라지기 때문에
// 만약 엄청큰 component tree에서는 react.memo가 유용
// 상단에 있는 component에 react-memo르 쓰면 불필요한 re-render cycles를 막을 수 있음
// 예를들어 DemoOutput에 react.memo 써줬더니 DemoOutput의 자식 컴포넌트인 MyParagraph의 re-eval도 막을 수 있었음
// 즉 parent component가 바뀔 때마다 child component의 prop의 value값이 변하는 경우에는 어차피 컴포넌트가 re-render되어야 하므로 react.memo를 쓸 필요가 없음
// 또한 component의 tree크기가 작을 경우도 유용하지 않음

// Button 컴포넌트의 경우 trigger가 되는 component이므로 prop-checking을 할 필요가 없고 변화되는 내용이 없는 컴포넌트

// 근데 memo는 원시형이 아닌 객체나 함수, 배열같은 값은 비교를 못함
// js입장에서는 [1, 2, 3] !== [1, 2, 3]임

//React.memo는 props를 비교할 때 얕은 비교를 진행하는데, 원시 값의 경우는 같은 값을 갖는지 확인하고 객체나 배열과 같은 참조 값은 같은 주소 값을 갖고 있는지 확인한다.

//함수의 내용은 같더라도 참조값이 다르다면 Button re-rendering이 발생하고, React.memo는 오히려 memoization에 쓸데없는 메모리만 낭비하는 것이다