import React, { useState } from 'react';

import './NewExpense.css'
import ExpenseForm from './ExpenseForm';

const NewExpense = (props) =>{

  const [isEditing, setIsEditing] = useState(false);

  const saveExpneseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    }
    props.onAddExpense(expenseData)
    setIsEditing(false)
  }

  const startEditingHanlder = () =>{
    setIsEditing(true);
  }
  const stopEditingHandler = () =>{
    setIsEditing(false)
  }
  return <div className='new-expense'>
    {!isEditing && <button onClick={startEditingHanlder}>Add New Expense</button>}
    {isEditing && <ExpenseForm onSaveExpenseData={saveExpneseDataHandler} onCancel={stopEditingHandler}/>}
  </div>
}

export default NewExpense;