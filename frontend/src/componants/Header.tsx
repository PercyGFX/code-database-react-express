import { Link } from "react-router-dom";

function Header() {
  const handleLogout = () => {};

  return (
    <div className=" flex justify-between px-8 py-3 shadow-md rounded-sm bg-white items-center">
      <div>Cod Delivery</div>

      <div className=" flex px-6 ">
        <p className=" hover:cursor-pointer" onClick={handleLogout}>
          Logout
        </p>
        <Link to="/report-new">
          <p className=" hover:cursor-pointer px-5">Submit New</p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
