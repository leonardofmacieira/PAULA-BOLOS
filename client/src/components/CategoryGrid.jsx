import React from "react";
import { 
  Users, Heart, Rocket, PawPrint, Sun, Car, Smile, Gift, Calendar, Book, Crown, Globe, Church, Baby, ShoppingBag, Puzzle, PartyPopper, Castle 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: <PartyPopper size={32} />, title: "Ocasiões & Etapas de Vida" },
  { icon: <Castle size={32} />, title: "Personagens & Franquias – Disney" },
  { icon: <Heart size={32} />, title: "Personagens & Franquias – Outras" },
  { icon: <Book size={32} />, title: "Animes & Mangá" },
  { icon: <Puzzle size={32} />, title: "Games & Cultura Geek" },
  { icon: <Rocket size={32} />, title: "Super-Heróis" },
  { icon: <PawPrint size={32} />, title: "Animais & Natureza" },
  { icon: <Sun size={32} />, title: "Espaço & Astronomia" },
  { icon: <Car size={32} />, title: "Transportes & Velocidade & Profissões" },
  { icon: <Smile size={32} />, title: "Parques, Circo & Diversão" },
  { icon: <Gift size={32} />, title: "Festas Temáticas & Estilos" },
  { icon: <Calendar size={32} />, title: "Sazonais & Festas Populares" },
  { icon: <Book size={32} />, title: "Contos & Clássicos Infantis" },
  { icon: <Crown size={32} />, title: "Realeza & Medieval" },
  { icon: <Globe size={32} />, title: "Esportes" },
  { icon: <Globe size={32} />, title: "Cultural/Regional & Temas Adulto" },
  { icon: <Church size={32} />, title: "Religioso/Bíblico" },
  { icon: <Baby size={32} />, title: "Baby & First Years" },
  { icon: <ShoppingBag size={32} />, title: "Coleções/Marcas específicas" },
  { icon: <Users size={32} />, title: "Interativos/Mecânicos" },
];


const CategoryGrid = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 py-10 px-4 sm:px-10 md:px-20">
      {categories.map((cat, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-white rounded-xl shadow-md p-5 hover:scale-105 transition-transform duration-200 cursor-pointer border border-gray-100"
          onClick={() => navigate(`/categoria/${encodeURIComponent(cat.title)}`)}
        >
          <div className="mb-2 text-[#E87C86]">{cat.icon}</div>
          <div className="text-center text-sm font-medium text-[#4B3A2B]">{cat.title}</div>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
