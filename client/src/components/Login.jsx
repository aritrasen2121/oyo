import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/v1/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        setLogin(!login);
      })
      .catch((err) => console.log(err));
  };

  const handleToggle = () => {
    setLogin(!login);
  };

  const handleLogin = async () => {
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/v1/login`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("name", res.data.user.name);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="mx-10 md:mx-28 pt-5">
      
      <div className="flex flex-col sm:flex-row">
      <h2 className="text-5xl font-bold mr-5">OYO</h2>
      <p className="text-black font-bold text-2xl pt-3">
        Hotels and homes across 800 cities, 24+ countries
      </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 pt-5">
        <div className="sm:w-2/3 flex justify-center ">
          <div className="flex justify-center sm:w-3/4 sm:pt-20">
            <div className="">
              <p className=" font-bold text-3xl sm:text-5xl text-justify">
                There’s a smarter way to OYO around
              </p>
              <p className=" text-sm sm:text-xl mt-5 text-justify">
                Sign up with your phone number and get exclusive access to
                discounts and savings on OYO stays and with our many travel
                partners.
              </p>
            </div>
          </div>
        </div>

        <div className=" md:w-1/3 border bg-slate-50">
          <p className="h-14 flex items-center px-10 bg-gradient-to-r from-red-300 to bg-red-600 text-lg font-bold text-white">
            Sign up & Get ₹500 OYO Money
          </p>
          <div className="px-10">
            <h3 className=" text-5xl font-bold my-5">Login / Signup</h3>
            <p className=" font-bold text-lg mb-1">
              Please enter your phone number to continue
            </p>
            {login ? (
              ""
            ) : (
              <input
                type="text"
                placeholder="Enter your name..."
                className=" outline-none border my-3 border-black px-3 py-1 w-full h-10"
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Enter your email..."
              className=" outline-none border my-3 border-black px-3 py-1 w-full h-10"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter yourt password..."
              className=" outline-none border my-3 border-black px-3 py-1 w-full h-10"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className=" w-full h-14 text-lg font-bold bg-red-500 hover:cursor-pointer hover:bg-red-600 text-white my-5 rounded-lg"
              onClick={login ? handleLogin : handleSignup}
            >
              {login ? "Login " : " Sign Up"}
            </button>
            <p className="mb-5 my-1 text-xl">
              <span>
                {login
                  ? "Don`t have an account ?"
                  : "Already have an account ?"}
              </span>
              <span
                className=" ml-1 border-b-2 border-red-500 text-red-600 pb-1 hover:cursor-pointer"
                onClick={handleToggle}
              >
                {" "}
                {login ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
