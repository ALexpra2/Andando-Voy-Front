import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Marketplace from './pages/Marketplace';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/dashboard/Dashboard';
import AdminPanel from './pages/adminpanel/AdminPanel';
import Loginjwt from './pages/Loginjwt';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/marketplace' element={<Marketplace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin' element={<AdminPanel />} />  
        <Route path="/loginjwt" element={<Loginjwt />} />        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
