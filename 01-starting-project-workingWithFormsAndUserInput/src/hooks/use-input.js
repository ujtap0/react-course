import {useReducer} from 'react';

const initialInputState ={
  value: '',
  isTouched: false
}

const inputStateReducer = (state, action) => {
  if(action.type === 'INPUT'){
    return{ value: action.value, isTouched: state.isTouched }
    //isTouched는 값을 바꾸지 않기 위해 이전state 값을 불러옴
  }
  if(action.type === 'BLUR'){
    return{ value: state.value, isTouched: true }
  }
  if(action.type === 'RESET'){
    return{ value: '', isTouched: false }
  }
  return initialInputState
}

const useInput = (validateValue) => {
  const [inputState, dispatch]=useReducer(inputStateReducer, initialInputState )

  const valueIsValid = validateValue(inputState.value);
  
  const hasError = !valueIsValid && inputState.isTouched;

  const valueInputHandler = event => {
    dispatch({type: 'INPUT', value: event.target.value});
  }

  const InputBlurHanlder = () => {
    dispatch({type: 'BLUR'})
    setIsTouched(true)
  }

  const reset = () => {
    dispatch({type: 'RESET'})
  }
  
  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueInputHandler,
    InputBlurHanlder,
    reset
  }
};

export default useInput