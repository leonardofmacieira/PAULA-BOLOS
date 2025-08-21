
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCategoryData } from "../hooks/useCategoryData";
import Navbar from "../components/Navbar";

import CakeCard from "../components/CakeCard";

import Modal from "../components/Modal";
import ScheduleForm from "../components/ScheduleForm";
import Loader from "../components/Loader";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://rptwacnofhwqtfclthck.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwdHdhY25vZmh3cXRmY2x0aGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1OTA0NzUsImV4cCI6MjA3MDE2NjQ3NX0.XgeKRZUkzY2TLd3TC1eHL5BbRcxZyuMVNNfco6VKH_w";
const supabase = createClient(supabaseUrl, supabaseKey);


const CategoryPage = () => {
  const { category } = useParams();
  const { loading, data, error, fetchCategoryData } = useCategoryData();
  const [search, setSearch] = useState("");
  const [filterModal, setFilterModal] = useState(false);
  const [filterPrecoMin, setFilterPrecoMin] = useState("");
  const [filterPrecoMax, setFilterPrecoMax] = useState("");
  const [filterTamanho, setFilterTamanho] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterCor, setFilterCor] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCake, setSelectedCake] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [ocupadas, setOcupadas] = useState([]);

  useEffect(() => { if (category) fetchCategoryData(category); }, [category]);

  const handleSchedule = async (cake) => {
    setSelectedCake(cake);
    setFormSuccess(false);
    // Buscar datas ocupadas para esse bolo
    const { data: reservas, error } = await supabase
      .from('reservations')
      .select('event_date')
      .eq('cake_id', cake.id);
    if (!error && reservas) {
      setOcupadas(reservas.map(r => r.event_date));
    } else {
      setOcupadas([]);
    }
    setModalOpen(true);
  };

  const handleFormSubmit = async (form) => {
    setFormLoading(true);
    try {
      const { error } = await supabase
        .from('reservations')
        .insert([
          {
            nome_cliente: form.nome,
            telefone: form.telefone,
            email: form.email,
            event_date: form.data,
            cake_id: selectedCake?.id,
            endereco: form.endereco,
            qtde_convidados: form.convidados,
          }
        ]);
      if (!error) {
        // Envia para o webhook
        try {
          await fetch("https://automacao.conexaodireta.com.br/webhook/89d5256b-70f8-47f1-8020-fb4875c039657777", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nome_cliente: form.nome,
              telefone: form.telefone,
              email: form.email,
              event_date: form.data,
              cake_id: selectedCake?.id,
              cake_nome: selectedCake?.nome,
              endereco: form.endereco,
              qtde_convidados: form.convidados,
            }),
          });
        } catch {}
        setFormSuccess(true);
        setToast({ show: true, message: "Agendamento enviado com sucesso!", type: "success" });
      } else {
        let msg = "Erro ao enviar agendamento!";
        if (error.message.includes("unique") && error.message.includes("event_date")) {
          msg = "Esta data já está reservada. Escolha outra.";
        }
        setToast({ show: true, message: msg, type: "error" });
      }
    } catch (err) {
      setToast({ show: true, message: "Erro ao enviar agendamento!", type: "error" });
    }
    setFormLoading(false);
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {toast.show && (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded shadow-lg text-white font-semibold pointer-events-none ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {toast.message}
        </div>
      )}
      <Navbar />
      <div className="max-w-3xl mx-auto pt-24 py-10 px-4">
        <h2 className="text-2xl font-bold text-secondary mb-6 text-center">{category}</h2>
        <div className="flex flex-row gap-4 mb-6 items-start justify-between">
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full shadow hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Abrir filtros"
              type="button"
              onClick={() => setFilterModal(true)}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16l-6 8v4l-4 4v-8z"/></svg>
              Filtros
            </button>
            {(filterPrecoMin || filterPrecoMax || filterTamanho || filterTag) && (
              <button
                className="flex items-center gap-2 bg-gray-200 text-secondary px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-300"
                type="button"
                onClick={() => {
                  setFilterPrecoMin("");
                  setFilterPrecoMax("");
                  setFilterTamanho("");
                  setFilterTag("");
                }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Limpar filtros
              </button>
            )}
          </div>
      {/* Modal de filtros */}
      {filterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-secondary hover:text-primary text-2xl font-bold"
              onClick={() => setFilterModal(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <h3 className="text-xl font-bold text-primary mb-4 text-center">Filtros</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Preço mínimo</label>
                <input type="number" min="0" value={filterPrecoMin} onChange={e => setFilterPrecoMin(e.target.value)} className="border rounded px-3 py-2 w-full" placeholder="R$" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Preço máximo</label>
                <input type="number" min="0" value={filterPrecoMax} onChange={e => setFilterPrecoMax(e.target.value)} className="border rounded px-3 py-2 w-full" placeholder="R$" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Tamanho</label>
                <select value={filterTamanho} onChange={e => setFilterTamanho(e.target.value)} className="border rounded px-3 py-2 w-full">
                  <option value="">Todos</option>
                  {Array.from(new Set(data?.map(cake => cake.tamanho).filter(Boolean))).map(tamanho => (
                    <option key={tamanho} value={tamanho}>{tamanho}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Tag</label>
                <select value={filterTag} onChange={e => setFilterTag(e.target.value)} className="border rounded px-3 py-2 w-full">
                  <option value="">Todas</option>
                  {Array.from(new Set(data?.flatMap(cake => cake.tags || []))).map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
              <button
                className="bg-primary text-white px-4 py-2 rounded-full mt-2 w-full"
                onClick={() => setFilterModal(false)}
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
          <div className="relative w-full sm:w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-xl" aria-hidden="true">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <input
              type="text"
              placeholder="Pesquise por nome do bolo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border rounded-full pl-10 py-2 pr-4 focus:outline-none focus:ring-2 focus:ring-primary w-full text-base shadow-sm transition-all duration-200"
              aria-label="Buscar bolo por nome"
            />
          </div>
        </div>
  {loading && <Loader />}
        {error && <div className="text-center text-red-500">Erro ao buscar dados.</div>}
        {data?.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data
              .filter(cake => cake.nome.toLowerCase().includes(search.toLowerCase()))
              .filter(cake => {
                if (filterPrecoMin && cake.valor_base < Number(filterPrecoMin)) return false;
                if (filterPrecoMax && cake.valor_base > Number(filterPrecoMax)) return false;
                if (filterTamanho && cake.tamanho !== filterTamanho) return false;
                if (filterTag && !(cake.tags && cake.tags.includes(filterTag))) return false;
                return true;
              })
              .map((cake) => (
                <CakeCard key={cake.id} cake={cake} onSchedule={() => handleSchedule(cake)} />
              ))}
          </div>
        )}
        {data && data.length === 0 && !loading && (
          <div className="text-center text-secondary">Nenhum resultado encontrado.</div>
        )}
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {formLoading ? (
          <Loader />
        ) : formSuccess ? (
          <div className="text-center py-8">
            <div className="text-2xl text-primary font-bold mb-2">Agendamento enviado!</div>
            <div className="text-secondary mb-4">Em breve entraremos em contato.</div>
            <button className="bg-pink-primary text-white px-6 py-2 rounded-full" onClick={() => setModalOpen(false)}>Fechar</button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-pink-secondary mb-4 text-center">Agendar bolo: {selectedCake?.nome}</h3>
            <ScheduleForm onSubmit={handleFormSubmit} loading={formLoading} ocupadas={ocupadas} />
          </>
        )}
      </Modal>
    </div>
  );
};

export default CategoryPage;
