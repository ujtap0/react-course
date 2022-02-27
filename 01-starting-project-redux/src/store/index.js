import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import authReducer from './auth'

//리덕스 툴킷으로 슬라이스를 쪼개서 여러개의 파일로 관리할 수 있음

const store = configureStore({
  reducer: {counter: counterReducer, auth: authReducer}
});

export default store;