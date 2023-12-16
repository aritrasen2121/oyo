import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Carddetails = () => {
  const [hotalDetails, setHotalDetails] = useState();
  const { id } = useParams();
  const navigate = useNavigate()

  const getHotelReq = async () => {
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/v1/hotel/${id}`)
      .then((res) => setHotalDetails(res.data.hotel))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getHotelReq();
  }, []);
  const handleCheckout = async (amount) => {
    console.log(localStorage.getItem('name'));
    if(localStorage.getItem('name')!=null){
      const {
        data: { key },
      } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/getkey`);
  
      const {
        data: { order },
      } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/checkout`, {
        amount,
      });
      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "OYO rooms",
        description: "Test Transaction",
        order_id: order.id,
        callback_url: `${import.meta.env.VITE_BASE_URL}/api/v1/paymentverification`,
        prefill: {
          name: localStorage.getItem('name'),
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#f54257",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    }
    else{

      navigate('/login')
    }
  };
  const policies = [
    "Couples are welcome",
    "Guests can check in using any local or outstation ID proof PAN card not accepted.",
    "As a complimentary benefit, your stay is now insured by Acko.",
    "This hotel is serviced under the trade name of The Orchid Residency as per quality standards of OYO",
  ];
  return (
    <>
      {hotalDetails && (
        <>
          <div className="h-96 flex justify-center">
            <img height={"100%"} src={hotalDetails.image} alt="" />
          </div>

          <div className="p-2 flex h-44 md:mx-20">
            <div className="w-2/3">
              <div className="flex justify-between">
                <div className=" font-bold text-4xl">
                  {hotalDetails.name} [{hotalDetails.location}]
                </div>
                <div className="text-xl p-3 bg-yellow-300 rounded-md text-white">
                  {hotalDetails.ratings}{" "}
                </div>
              </div>
              <div className="w-4/5 text-xl">{hotalDetails.description} </div>
              <p className="font-semibold text-lg mt-5">Amenities</p>
              <div className="flex gap-5 justify-between my-2">
                {[
                  "AC",
                  "Free Wifi",
                  "TV Geyser",
                  "Power backup",
                  "Daily housekeeping",
                ].map((item) => {
                  return <p key={item}>{item}</p>;
                })}
              </div>
              <p className="font-semibold text-lg mt-5 mb-3">Hotel policies</p>
              <div className="flex gap-5">
                <div className="mb-3">
                  <p>check in</p>
                  <p className="py-2 font-semibold">12:00 PM</p>
                </div>
                <div>
                  <p>check out</p>
                  <p className="py-2 font-semibold">11:00 AM</p>
                </div>
              </div>
              <ul className="list-disc pl-5">
                {policies.map((item) => {
                  return <li key={item}>{item}</li>;
                })}
              </ul>
              <div className="font-semibold text-lg mt-5 mb-3">
                Find on maps
              </div>
            </div>
            <div className="border-2 w-1/3 rounded-md h-96">
              <div className="h-10 rounded-sm text-center text-white pt-1 bg-gradient-to-r from-rose-500 via-red-500 to-pink-500">
              LOGIN NOW TO GET UPTO 15% LOWER PRICES
              </div>
              <div className="px-8">
              <div className="flex m-3 gap-2">
                <p className="text-2xl font-semibold">₹{hotalDetails.price}</p>
                <p className="text-red-500">77% off</p>
              </div>
              <div className="flex border-2 h-14 text-lg justify-around items-center rounded-md">
                <div>sat, 16 Dec - sun, 17 Dec</div>
                <div>1 room</div>
              </div>
              <div className="flex justify-between text-xl mt-3">
                <div>Total price</div>
                <div>₹{hotalDetails.price}</div>
              </div>
              <p className="text-xs">Including taxes & fees</p>
              <button
                className="bg-green-500 text-white text-xl px-5 h-10 mt-5 rounded-md w-full"
                id="rzp-button1"
                onClick={() => handleCheckout(hotalDetails.price)}
              >
                Book Now
              </button>
              <p className="text-xs mt-2 text-green-500 font-semibold">Cancellation Policy</p>
              <p className="text-xs text-green-500 font-semibold">Follow safety measures advised at the hotel</p>
              <p className=" font-semibold">By proceeding, you agree to our Guest Policies.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Carddetails;
