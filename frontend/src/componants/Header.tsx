"use client";

function Header() {
  const handleLogout = () => {};

  return (
    <div className=" flex justify-between px-8 py-3 shadow-md rounded-sm bg-white items-center">
      <div>Cod Delivery</div>

      <div className=" flex px-6 ">
        <p className=" hover:cursor-pointer" onClick={handleLogout}>
          Logout
        </p>
      </div>
    </div>
  );
}

export default Header;
