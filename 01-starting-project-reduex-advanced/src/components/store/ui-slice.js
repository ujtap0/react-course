import {createSlice} from '@reduxjs/toolkit'

const initialState = {cartIsVisible: false, notification: null}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers:{
    toggle(state){
      //mutating code를 쓸 수 있는 이유는 리덕스 툴킷을 사용했기 때문에
      state.cartIsVisible = !state.cartIsVisible
    },
    showNotification(state, action){
      state.notification = {
        staus: action.payload.status,
        title: action.payload.titile,
        message: action.payload.message
      };
    }
  }
})

export const uiActions = uiSlice.actions;

export default uiSlice