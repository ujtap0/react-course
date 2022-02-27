import { Fragment } from 'react/cjs/react.development'
import classes from './Layout.module.css'

import MainNavigation from './MainNavigation'

const Layout = (props) => {
  return <Fragment>
    <MainNavigation/>
    <main className={classes.main}>
      {props.children}
    </main>
  </Fragment>
}
export default Layout

//레이아웃 컴포넌트는 실질적으로 화면에 보여질 컴포넌트들을 짜는 코드
//원래는 APP 컴포넌트에서 했지만 거기는 라우터를 분류하는 곳으로 만듦
//그래서 레이아웃 컴포넌트는 앱컴포넌트를 감싸도록 해줌