import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./componants/Header";
import Footer from "./componants/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Registration from "./componants/Registration";
function App() {
  return (
    <div>
      <Header />
      <Register />

      <Footer />
    </div>
  );
}

export default App;
