import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from "./Button";

const ScheduleForm = ({ onSubmit, loading, ocupadas = [] }) => {
  const [form, setForm] = useState({ nome: "", telefone: "", email: "", data: "", endereco: "", convidados: "" });
  const [calendarDate, setCalendarDate] = useState(null);


  const maskPhone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^([0-9]{2})([0-9])/, "($1) $2")
      .replace(/([0-9]{5})([0-9])/, "$1-$2")
      .replace(/(-[0-9]{4})[0-9]+?$/, "$1");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "telefone" ? maskPhone(value) : value,
    });
  };

  // Atualiza data do formulário ao selecionar no calendário
  const handleCalendarChange = (date) => {
    setCalendarDate(date);
    setForm({ ...form, data: date ? date.toISOString().split('T')[0] : "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="nome"
        type="text"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <input
        name="telefone"
        type="tel"
        placeholder="Telefone (__) ____-____"
        value={form.telefone}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="E-mail"
        value={form.email}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <input
        name="endereco"
        type="text"
        placeholder="Endereço da festa"
        value={form.endereco}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <input
        name="convidados"
        type="number"
        min="1"
        placeholder="Quantidade aproximada de convidados"
        value={form.convidados}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <label className="text-sm text-[#4B3A2B] font-medium mb-1">Data da reserva</label>
      <Calendar
        onChange={handleCalendarChange}
        value={calendarDate}
        minDate={new Date()}
        tileDisabled={({ date, view }) => {
          if (view !== 'month') return false;
          const iso = date.toISOString().split('T')[0];
          return ocupadas.includes(iso);
        }}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            const iso = date.toISOString().split('T')[0];
            if (ocupadas.includes(iso)) {
              return 'bg-red-200 text-red-700 cursor-not-allowed reserved-date';
            }
            if (date >= new Date() && !ocupadas.includes(iso)) {
              return 'bg-green-100 text-green-700 free-date';
            }
          }
          return null;
        }}
      />
      <style>{`
        .reserved-date {
          border: 2px solid #e53e3e !important;
          opacity: 1 !important;
        }
        .free-date {
          border: 2px solid #38a169 !important;
          opacity: 1 !important;
        }
      `}</style>
      <style>{`
        .reserved-date {
          border: 2px solid #e53e3e !important;
          opacity: 1 !important;
        }
      `}</style>
      {/* Legenda de cores do calendário */}
      <div className="flex items-center gap-4 mt-2 text-sm">
        <span className="flex items-center gap-1">
          <span style={{width:12,height:12,display:'inline-block',borderRadius:'50%',background:'#38a169',border:'1px solid #38a169'}}></span>
          Livre
        </span>
        <span className="flex items-center gap-1">
          <span style={{width:12,height:12,display:'inline-block',borderRadius:'50%',background:'#e53e3e',border:'1px solid #e53e3e'}}></span>
          Ocupado
        </span>
        <span className="flex items-center gap-1">
          <span style={{width:12,height:12,display:'inline-block',borderRadius:'50%',background:'#ecc94b',border:'1px solid #ecc94b'}}></span>
          Dia atual
        </span>
      </div>
      <Button type="submit" disabled={loading} className="w-full mt-2">
        {loading ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
};

export default ScheduleForm;
