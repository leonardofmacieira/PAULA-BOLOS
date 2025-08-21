import { useState } from "react";
import { supabase } from "../hooks/supabaseClient";

export function useCategoryData() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchCategoryData = async (category) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      // Debug: verifique o valor recebido
      console.log('Buscando categoria:', category);
      const { data, error } = await supabase
        .from("cakes")
        .select("*")
        .eq("categoria", category);
      setLoading(false);
      if (error) {
        console.error('Erro Supabase:', error);
        setError(error);
      } else {
        setData(data);
      }
    } catch (err) {
      setLoading(false);
      setError(err);
      console.error('Erro inesperado:', err);
    }
  };

  return { loading, data, error, fetchCategoryData };
}
