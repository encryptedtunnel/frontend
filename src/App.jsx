import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Inbox from "./pages/Inbox";
import CheckAuth from "./components/CheckAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<CheckAuth><Inbox /></CheckAuth>} />
        {/* <Route path="/dashboard/:id" element={<CheckAuth><Inbox /></CheckAuth>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;