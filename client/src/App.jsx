import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categoria/:category' element={<CategoryPage />} />
      </Routes>
    </div>
  );
};

export default App;
