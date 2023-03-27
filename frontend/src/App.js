import { useUserContext } from 'context/User';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomePage, LoginPage } from './pages';

function App() {
  const navigate = useNavigate();
  const { user } = useUserContext();

  // If user not exist sending to login page
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  // JSX
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
