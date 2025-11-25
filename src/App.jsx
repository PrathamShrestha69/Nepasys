import React from 'react'
import Homepage from "./pages/Homepage.jsx";
import CartItem from "./pages/CartItem.jsx";
import NavigationBar from './components/NavigationBar.jsx';
import { Route, Routes } from 'react-router';


const App = () => {
  return (
    <div>
      <NavigationBar/>
       <Routes>
        
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </div>
  )
}

export default App