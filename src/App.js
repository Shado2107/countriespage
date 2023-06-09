import { useEffect, useState } from 'react';
import {lightTheme, darkTheme, GlobalStyles} from './themes'
import styled, {ThemeProvider} from 'styled-components'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { CountryService } from './API/CountryService'; 

import { Home } from './pages/Home';
import { Details } from './pages/Details';
import NotFound from './pages/NotFound';
import { Layout } from './pages/Layout';

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  align-text: center;
`
function App() {

  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("themes")) || 'light')
  const [loading, setLoading] = useState(false)
  
  const [countries, setCountries] = useState([])

  async function getCountries(){
    setLoading(true)
    const countries = await CountryService.getAll()
    setCountries(countries)
    setLoading(false)
  }
  
  useEffect(() => {
     getCountries()
  }, [])

  useEffect(()=> {
    window.localStorage.setItem("theme", JSON.stringify(theme))
  },[theme])
  
  return (
    <ThemeProvider theme={theme === 'light'? lightTheme : darkTheme}>
      <GlobalStyles />
        <AppWrapper>
          <BrowserRouter>
            <Routes path='/' element={<Layout theme={theme} setTheme={setTheme} loading={loading}  />} >
              <Route index element={<Home countries={countries} />} />  
              <Route path="country/:name" element={<Details />}  />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

