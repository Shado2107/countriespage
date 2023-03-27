import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { searchByCountry } from '../API/CountryService'

import { IoArrowBack } from 'react-icons/io5'
import { MyButton } from '../Components/Ui/MyButton'
import { Info } from '../Components/Info'

export const Details = () => {

  const {name} = useParams()
  const navigate = useNavigate()
  const [country, setCountry] = useState(null)
 
  useEffect(()=> {
    axios.get(searchByCountry(name)).then(
      ({data}) => setCountry(data[0])
    )
  }, [name])

  return (
    <div>
      <MyButton onClick={() => navigate(-1)}>
        <IoArrowBack />Back 
        </MyButton>
      
      {country && <Info navigate={navigate} {...country}/>}
      
      </div>
  )
}