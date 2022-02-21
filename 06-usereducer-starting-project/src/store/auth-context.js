import React, { useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () =>{},
  onLogin: () => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () =>{
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }

  const loginHandler = () =>{
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true);
  }
  
  return <AuthContext.Provider 
  value={
    {isLoggedIn: isLoggedIn,
    onLogout: logoutHandler, 
    onLogin: loginHandler}}>
    {props.children}
  </AuthContext.Provider>
}

export default AuthContext;