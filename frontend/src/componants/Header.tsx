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
    <div className=" flex justify-between px-4 py-3 shadow-md rounded-sm bg-white items-center">
      <div>
        <Link to="/">Cod Delivery </Link>
      </div>

      <div className=" flex px-3 items-center text-sm">
        <Link to="/report-new">
          {/* <Button className="mx-4 bg-red-500">Submit</Button> */}
          <div className=" bg-cyan-600 mx-4 text-white px-2 py-2 rounded-md shadow-md hover:bg-cyan-500"> Submit New</div>
        </Link>
        {token ? (
          <p className=" hover:cursor-pointer" onClick={handleLogout}>
            Logout
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Header;
