import useCheck from "../hooks/use-check";

const BasicForm = (props) => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    valueInputHandler: firstNameInputHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    hasError: firstNameInputHasError,
    reset: resetFirstName,
  } = useCheck(value => value.trim() !== '');
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    valueInputHandler: lastNameInputHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    hasError: lastNameInputHasError,
    reset: resetLastName,
  } = useCheck(value => value.trim() !== '');
  const {
    value: emailValue,
    isValid: emailIsValid,
    valueInputHandler: emailInputHandler,
    inputBlurHandler: emailInputBlurHandler,
    hasError: emailInputHasError,
    reset: resetEmail,
  } = useCheck(value => value.includes('@'));

  let formIsValid = false;
  if(firstNameIsValid && lastNameIsValid && emailIsValid){
    formIsValid = true;
  }
  
  const formSubmissionHanlder =(event) => {
    event.preventDefault();

    //유저가 잘본된 정보를 입력하고 sybmit하는 것을 완벽 차단
    if(!formIsValid){
      return;
    }

    console.log(firstNameValue)
    console.log(lastNameValue)
    console.log(emailValue)

    resetFirstName()
    resetLastName()
    resetEmail()
  }
  const firstNameInputClasses = firstNameInputHasError ? 'form-control invalid' : 'form-control';
  const lastNameInputClasses = lastNameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHanlder}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input 
          type='text' 
          id='name'
          onChange={firstNameInputHandler}
          onBlur={firstNameInputBlurHandler}
          value={firstNameValue}
          />
          {firstNameInputHasError && <p className="error-text">Firstname must not be empty</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='name'>Last Name</label>
          <input 
          type='text' 
          id='name' 
          onChange={lastNameInputHandler}
          onBlur={lastNameInputBlurHandler}
          value={lastNameValue}
          />
          {lastNameInputHasError && <p className="error-text">Lastname must not be empty</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input 
        type='text' 
        id='name' 
        onChange={emailInputHandler}
        onBlur={emailInputBlurHandler}
        value={emailValue}
        />
      </div>
      {emailInputHasError && <p className="error-text">Wrong Email!</p>}
      <div className='form-actions'>
        <button disabled={!formIsValid }>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;


//formik - third party library for working with forms