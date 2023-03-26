import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useLocalStorage } from './hooks';
import { HomePage, LoginPage } from './pages';

function App() {
  const [userId, setUserId] = useLocalStorage('id');
  const navigate = useNavigate();

  // Changeing the user id
  const changeUserIdHandler = (id = '') => {
    setUserId(id);
  };

  // If user not exist sending to login page
  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, []);

  // JSX
  return (
    <Routes>
      <Route path="/" element={<HomePage userId={userId} />} />
      <Route
        path="/login"
        element={
          <LoginPage
            changeUserIdHandler={changeUserIdHandler}
            userId={userId}
          />
        }
      />
    </Routes>
  );
}

export default App;
