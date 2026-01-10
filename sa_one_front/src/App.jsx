import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import Home from './home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;