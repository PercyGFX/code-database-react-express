import "./App.css";
import Header from "./componants/Header";
import Footer from "./componants/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Registration from "./componants/Registration";
import AuthCheck from "./componants/AuthCheck";
import Submit from "./pages/Submit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import CompletionCheck from "./componants/CompletionCheck";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AuthCheck />}>
            <Route path="/profile_complete" element={<Registration />} />
            <Route element={<CompletionCheck />}>
              <Route path="/report-new" element={<Submit />} />
            </Route>
            <Route path="/" element={<Search />} />
          </Route>
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
