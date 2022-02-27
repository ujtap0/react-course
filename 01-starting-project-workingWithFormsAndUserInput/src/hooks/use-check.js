import { useState } from "react"

const useCheck = (validateValue) => {
  const [valueInput, setValueInput] = useState('');
  const [isTouched, setIsTouched] = useState(false)

  const valueIsValid = validateValue(valueInput);
  const hasError = !valueIsValid && isTouched;
  //hasError가 true가 되는 경우는 유저가 input 창을 터치 했고 잘못된 값을 넣었을 때

  const valueInputHandler = (event) =>{
    setValueInput(event.target.value)
  }

  const inputBlurHandler = () => {
    setIsTouched(true);
  }
  
  const reset = () => {
    setValueInput('')
    setIsTouched(false)
  }

  return{
    value:valueInput,
    isValid: valueIsValid,
    valueInputHandler,
    inputBlurHandler,
    hasError,
    reset
  }
}

export default useCheck;