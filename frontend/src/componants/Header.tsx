import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { jwtDecode } from "jwt-decode";

interface jwt {
  email: string;
  id: number;
}

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  return (
    <div className=" flex justify-between px-8 py-3 shadow-md rounded-sm bg-white items-center">
      <div>
        <Link to="/">Cod Delivery </Link>
      </div>

      <div className=" flex px-4 items-center text-sm">
        <Link to="/report-new">
          {/* <p className=" hover:cursor-pointer px-4">Submit New</p> */}
          <Button className="mx-4">Submit</Button>
        </Link>
        {token ? (
          <p className=" hover:cursor-pointer" onClick={handleLogout}>
            Logout
          </p>
        ) : (
          <Link to="/login">
            {/* <p className=" hover:cursor-pointer px-4">Submit New</p> */}
            <p className=" hover:cursor-pointer">Login</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
