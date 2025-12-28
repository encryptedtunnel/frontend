import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Inbox from "./pages/Inbox";
import NewChat from "./pages/NewChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inbox" element={<Inbox />}/>
        <Route path="/chat/:id" element={<Inbox />}/>
        <Route path="/new-chat" element={<Inbox/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;