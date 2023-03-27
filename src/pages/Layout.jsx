import { Outlet } from 'react-router-dom'

import { Header } from '../Components/Header';
import { Loader } from '../Components/loader/Loader';
import { Main } from '../Components/Main';

const Layout = (props) => {
  return (
    <>
        <Header theme={props.theme} setTheme={props.setTheme}  />

        <Main>
            {props.loading?
            <div style={{display:'flex', justifyContent: 'center', marginTop: '150px'}}><Loader /></div> 
            : <Outlet />}
        </Main>
        
    </>
  )
}

export { Layout }