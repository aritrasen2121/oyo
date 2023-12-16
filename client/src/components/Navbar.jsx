import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(localStorage.getItem("name"));
  const handleLogout = () => {
    localStorage.clear();
    setUser(null)
  };
  return (
    <div className="flex justify-between px-10 border-2 py-5">
      <div className=" font-bold text-2xl text-red-700">OYO</div>
      {user != null ? (
        <div>
          {user} <span> </span>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <Link to={"/login"}>
          <button className="text-lg">login / signup</button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
