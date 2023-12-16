import { useNavigate} from 'react-router-dom'

const PaymentSucessful = () => {
    const navigate = useNavigate()
    const handleClick = () =>{
        navigate('/')
    }
  return (
    <div className=" h-screen flex flex-col justify-center items-center text-5xl">
        <p>Payment Sucessful</p>
        <button className='text-2xl mt-5 bg-red-700 text-white rounded-md p-2' onClick={handleClick}>Go to Home</button>
    </div>
  )
}

export default PaymentSucessful