import { useState } from "react";
import { supabase } from "../hooks/supabaseClient";

export function useCakeById() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchCakeById = async (id) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const { data, error } = await supabase
        .from("cakes")
        .select("*")
        .eq("id", id)
        .single();
      setLoading(false);
      if (error) setError(error);
      else setData(data);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return { loading, data, error, fetchCakeById };
}
