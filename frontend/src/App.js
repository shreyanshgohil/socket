import { useUserContext } from 'context/User';
import { useEffect, useRef } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { HomePage, LoginPage } from './pages';

function App() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const socketRef = useRef(io('ws://localhost:5000'));
  // If user not exist sending to login page
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  // JSX
  return (
    <Routes>
      <Route path="/" element={<HomePage socketRef={socketRef} />} />
      <Route path="/login" element={<LoginPage socketRef={socketRef} />} />
    </Routes>
  );
}

export default App;
