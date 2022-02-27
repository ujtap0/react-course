import { Component } from 'react';
import User from './User';

import classes from './Users.module.css';

class Users extends Component{
  constructor(){
    super()

    //useState를 class 기반 컴포넌트에서 구현하기
    //항상 객체여야함 왜냐하면 컴포넌트에 쓸 state가 하나의 객체로 묶여야 하기 때문이다. group all the state
    //state가 연관되어 있냐 아니냐에 관계없이 무조건 객체에 모든 state를 넣어줌
    this.state = {
      showUsers: true,
    }
  }
  toggleUsersHandler(){
    //Component에서 제공하는 setState사용
    //setState도 항상 객체를 넣어줌 setState를 쓰면 객체를 덮어쓰지 않고 this.state객체에 합쳐준다
    //functional component의 useState와 다름 useSatate는 old state를 덮어씀
    this.setState((curState) => {
      return { showUsers: !curState.showUsers }
    });
  }
  render(){
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );
  
    return (
      <div className={classes.users}>
        {/* bind(this) : toggleUsersHanlder 안의 this는 같은 context/ same value라는 것을 붙여줌*/}
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;



//class-based Component Lifecycle

//side-effect in Functional Component: useEffect();

//componentDidMount(): 컴포넌트가 elvaluate/render되면 한번 호출됨
// useEffect(...,[])와 같음
//componentDidUpdate(): 컴포넌트가 업데이트 되면 호출
// useEffect(..., [someValue])
//componentWillUnmount(): 컴포넌트가 Dom에서 제거되었을 때 호출
//useEffect(()=>{return ()=>{..}}, [])

