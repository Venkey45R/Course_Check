import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Course from "./components/Course";
import Rate from "./components/Rate";
function App() {
  return (
    <div className="min-h-screen text-white bg-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/course" element={<Course />} />
          <Route path="/rate/:id" element={<Rate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
