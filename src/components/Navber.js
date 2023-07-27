import { useUserContext } from "../hooks/useUserContext";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";

const Navber = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  const { user } = useUserContext();
  return (
    <nav className="w-full p-5 bg-slate-300 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl capitalize tracking-widest text-black font-semibold"
      >
        Cl<span className="text-green-900 lowercase">o</span>
        <span className="lowercase">ser</span>
      </Link>

      {!user && (
        <div className="lg:space-x-5 space-x-2">
          <Link to="/login" className=" btn btn-primary">
            Login
          </Link>
          <Link to="/signup" className=" btn btn-primary">
            Signup
          </Link>
        </div>
      )}
      {user && (
        <div className="lg:space-x-5 space-x-2">
          <span className="text-teal-900"> {user.email}</span>
          <button onClick={handleLogout} className="btn btn-neutral">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navber;
