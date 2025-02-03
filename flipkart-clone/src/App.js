import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Cart from './Cart';
import Header from './components/Header';
import Footer from './components/Footer';


const userId = 'user123'; // Replace with actual user authentication

const App = () => {
  return (
    <Router>
      {/* Header */}
      <Header />
      <nav>
        <Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home userId={userId} />} />
        <Route path="/Login" element={<Login userId={userId}/>} />
        <Route path="/Register" element={<Register userId={userId} />} />
        <Route path="/cart" element={<Cart userId={userId} />} />
      </Routes>
      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
