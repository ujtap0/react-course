import { Component } from 'react';
//class기반 컴포넌트 만들 때 사용되며 중요한 몇가지의 property를 제공하는데
//props

import classes from './User.module.css';

class User extends Component{
  //render는 리액트로 부터 특정된 method
  //스크린에 어떤걸 띄워야 할지 함수형 컴포넌트의 return statement와 같은 역할

  //extends Component를 사용했으므로 this.props 사용 가능
  render(){
    return <li className={classes.user}>{this.props.name}</li>
  }
}

//class-based-component는 함수형 컴포넌트와 상호작용 가능

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
