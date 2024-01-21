import "./App.css";
import Header from "./componants/Header";
import Footer from "./componants/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Registration from "./componants/Registration";
import AuthCheck from "./componants/AuthCheck";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AuthCheck />}>
            <Route path="/" element={<Registration />} />
          </Route>
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
