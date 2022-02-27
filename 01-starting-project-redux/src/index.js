import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import store from './store/index';
//react-redux에서 Provider 컴포넌트를 가져와서 App컴포넌트를 감싸주고
//
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
