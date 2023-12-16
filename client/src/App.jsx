import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Carddetails from './components/Carddetails';
import PaymentSucessful from './components/PaymentSucessful';

const App =() =>{

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/hotel/:id' element={<Carddetails/>} />
      <Route path='/paymentsuccessful' element={<PaymentSucessful/>} />
     </Routes>
    </>
  )
}

export default App
