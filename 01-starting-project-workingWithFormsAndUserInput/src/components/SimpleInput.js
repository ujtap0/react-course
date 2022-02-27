import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    value : enteredValue,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    valueChangeHandler:nameChangeHandler, 
    InputBlurHanlder: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value=> value.trim() !== '')
;

  const{
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    InputBlurHanlder: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => value.includes('@'))


  let formIsValid = false;
  if(enteredNameIsValid && enteredEmailIsValid){
    formIsValid=true;
  }

  const formSubmissionHanlder = event => {
    event.preventDefault();
 
    console.log(enteredValue);
    console.log(enteredEmail)

    resetNameInput();
    resetEmailInput();
  }

  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputHasError ? 'form-control invalid': 'form-control';
  return (
    <form onSubmit={formSubmissionHanlder}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input  
        type='text' 
        id='name' 
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        value={enteredValue}
        />
        {nameInputHasError && <p className='error-text'>Name must not be empty.</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>Email</label>
        <input  
        type='text' 
        id='email'
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={enteredEmail}
        />
        {emailInputHasError && <p className='error-text'>Wrong Email!</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

