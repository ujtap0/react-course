import { useRef, useState } from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
//ref로 input에 입력된 값을 읽을 수 있음
//amountInputRef.current.value는 입력 type이 value가 number이라도 string으로 변환된다
const MealItemForm = (props) =>{
  const [amountIsValid, setAmountIsValid] = useState(true)
  const amountInputRef = useRef()

  const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber)
  }
  //context method를 호출하지 않고 props.onAddToCart를 호출 한 것은 MealItemForm에서는 수량값을 넣어줄 수 있는데 
  //이 외에 다른 정보(id/ price...)가 더 들어가야 하므로
  return <form className={classes.form} onSubmit={submitHandler}>
    <Input
      ref={amountInputRef}
      label="Amount"
      input={{
        id: 'amount_' + props.id,
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1'
      }}
    />
    <button>+ Add</button>
    {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
  </form>
}
export default MealItemForm