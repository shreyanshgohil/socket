import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useState } from "react";
import Home from "./pages/Home";
function App() {
  const [userId, setUserId] = useState("");

  const changeUserIdHandler = (id = "") => {
    setUserId(id);
  };

  console.log(userId, "DDDDDDDDDDDDDDDDDD");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={<Login changeUserIdHandler={changeUserIdHandler} />}
      />
    </Routes>
  );
}

export default App;
