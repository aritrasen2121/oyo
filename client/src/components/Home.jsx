import { useEffect, useState } from "react"
import Card from "./Card"
import Navbar from "./Navbar"
import axios from 'axios'


const Home = () => {
  const [hotels, setHotels] = useState()
  const [query, setQuery] = useState("")

  const getHotelByQueryReq = async () =>{
    if(query==='') getHotelReq()
    await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/hotel?query=${query}`).then(res => setHotels(res.data.hotel))
    .catch(err =>console.log(err))
  }

  const getHotelReq = async () =>{
    await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/hotels`).then(res =>setHotels(res.data.hotels))
    .catch(err =>console.log(err))
  }
  useEffect(() => {
    getHotelReq()
  }, [])
  
  return (
    <>
    <Navbar/>
    <div className="h-52 bg-red-700 ">
        <div className="md:text-4xl text-xl text-center py-5 text-white font-bold">Over 157,000 hotels and homes across 35 countries</div>
        <div className="mx-10 md:flex flex-row justify-center">
            <input type="text" onChange={e => setQuery(e.target.value)} className="h-10 md:h-16 md:w-72 border-2" placeholder="search by city hotel"/>
            <input type="date" name="" id="" className="h-10 md:h-16 md:w-40 border-2"/>
            <button onClick={getHotelByQueryReq} className="h-10 md:h-16 bg-green-500 md:p-5  text-white">search</button>
        </div>
    </div>
    <div className="flex flex-wrap gap-7 mx-5 mt-10 md:mx-16">
      {hotels && hotels.map(item => {
        return (
          <div key={item._id}>
          <Card name={item.name} image={item.image} description={item.description} id={item._id}/>
          </div>
        )
      })
      }
    </div>
    </>
  )
}

export default Home