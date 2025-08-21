
import React from 'react';
import Navbar from '../components/Navbar';
import CategoryGrid from '../components/CategoryGrid';
import HeaderChamada from '../components/HeaderChamada';


const Home = () => (
  <div className="bg-gray-50 min-h-screen">
    <Navbar />
    <div className="pt-24 max-w-7xl mx-auto">
  <HeaderChamada />
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-secondary">Selecione a categoria do bolo:</h2>
      <CategoryGrid />
    </div>
  </div>
);

export default Home;
