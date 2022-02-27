import { Fragment, Component } from 'react';

import classes from './UserFinder.module.css'
import Users from './Users';

const DUMMY_USERS = [
  {id: 'u1', name: 'Max'},
  {id: 'u2', name: 'Manuel'},
  {id: 'u3', name: 'Julie'}
];

class UserFinder extends Component {
  constructor(){
    super();
    this.state={
      filteredUsers: DUMMY_USERS,
      searchTerm: '',
    };
  }
  componentDidUpdate(prevProps, prevState){
    //무한 loop를 막기 위해 if문으로 prevState.searchUter이 바뀌었을 때만 함수를 state를 업데이트 하도록 해준다
    if(prevState.searchTerm !== this.state.searchTerm){
      this.setState({filteredUsers: DUMMY_USERS.filter((user) => user.name.includes(this.state.searchTerm))}) 
    }
  }
  componentDidMount(){
    //send http request...
    this.setState({filteredUsers: DUMMY_USERS})
  }

  searchChangeHandler(event){
    this.setState({searchTerm: event.target.value});
  };
  render(){
    return (
      <Fragment>
        <input type='search' onChange={this.searchChangeHandler.bind(this)} className={classes.finder} />
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <input type='search' onChange={searchChangeHandler} className={classes.finder} />
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;