import React from 'react';

import classes from './Input.module.css'

const Input = React.forwardRef((props,ref) => {
  return <div className={classes.input}>
    <label htmlFor={props.input.id}>{props.label}</label>
    <input ref={ref} {...props.input} />
  </div>
})
export default Input;

//React 컴포넌트를 forwardRef()라는 함수로 감싸주면, 해당 컴포넌트는 함수는 두 번째 매개 변수를 갖게 되는데, 이를 통해 외부에서 ref prop을 넘길 수 있습니다. 