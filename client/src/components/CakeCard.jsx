import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
const ArrowLeft = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
);
const ArrowRight = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>
);


const CakeCard = ({ cake, onSchedule }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
      {cake.imagens?.length ? (
        <div className="flex flex-col items-center mb-3">
          <div className="flex items-center gap-2">
            {cake.imagens.length > 1 && (
              <button
                className="bg-white bg-opacity-80 rounded-full p-1 text-secondary hover:bg-primary hover:text-white shadow"
                onClick={e => { e.stopPropagation(); setImgIndex((imgIndex - 1 + cake.imagens.length) % cake.imagens.length); }}
                style={{ zIndex: 2 }}
                disabled={imgIndex === 0}
                aria-label="Imagem anterior"
              >
                <ArrowLeft />
              </button>
            )}
            <img
              src={cake.imagens[imgIndex]}
              alt={cake.nome}
              className="w-32 h-32 object-cover rounded-lg border cursor-pointer"
              onClick={() => setModalOpen(true)}
              loading="lazy"
            />
            {cake.imagens.length > 1 && (
              <button
                className="bg-white bg-opacity-80 rounded-full p-1 text-secondary hover:bg-primary hover:text-white shadow"
                onClick={e => { e.stopPropagation(); setImgIndex((imgIndex + 1) % cake.imagens.length); }}
                style={{ zIndex: 2 }}
                disabled={imgIndex === cake.imagens.length - 1}
                aria-label="Próxima imagem"
              >
                <ArrowRight />
              </button>
            )}
          </div>
          {/* Bolinhas removidas do card, aparecem apenas no modal */}
          {/* índice removido conforme solicitado */}
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                src={cake.imagens[imgIndex]}
                alt={cake.nome}
                className="max-w-full max-h-[70vh] object-contain mx-auto rounded-lg"
                loading="lazy"
              />
              {cake.imagens.length > 1 && (
                <div className="flex items-center gap-2 mt-4 justify-center">
                  <button
                    className="bg-white bg-opacity-80 rounded-full p-2 text-secondary hover:bg-primary hover:text-white shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={() => setImgIndex((imgIndex - 1 + cake.imagens.length) % cake.imagens.length)}
                    aria-label="Imagem anterior"
                    style={{ zIndex: 2 }}
                    disabled={imgIndex === 0}
                    tabIndex={0}
                    role="button"
                  >
                    <ArrowLeft />
                  </button>
                  {cake.imagens.map((_, i) => (
                    <span
                      key={i}
                      className={`w-3 h-3 rounded-full ${imgIndex === i ? 'bg-primary' : 'bg-gray-300'} inline-block cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary`}
                      style={{ transition: 'background 0.2s' }}
                      onClick={() => setImgIndex(i)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Selecionar imagem ${i + 1}`}
                    />
                  ))}
                  <button
                    className="bg-white bg-opacity-80 rounded-full p-2 text-secondary hover:bg-primary hover:text-white shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={() => setImgIndex((imgIndex + 1) % cake.imagens.length)}
                    aria-label="Próxima imagem"
                    style={{ zIndex: 2 }}
                    disabled={imgIndex === cake.imagens.length - 1}
                    tabIndex={0}
                    role="button"
                  >
                    <ArrowRight />
                  </button>
                </div>
              )}
            </div>
          </Modal>
        </div>
      ) : (
        <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-lg text-gray-400 border mb-3">Sem imagem</div>
      )}
      <h3 className="text-lg font-bold text-primary mb-1 text-center">{cake.nome}</h3>
      <div className="flex flex-wrap gap-2 mb-2 justify-center">
        {cake.tags?.map((tag, i) => (
          <span key={i} className="bg-pink-100 text-primary px-2 py-0.5 rounded text-xs">{tag}</span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-2 justify-center">
        {cake.cores?.map((cor, i) => (
          <span key={i} className="bg-gray-200 text-secondary px-2 py-0.5 rounded text-xs">{cor}</span>
        ))}
      </div>
      <div className="text-sm text-secondary mb-1">Tamanho: {cake.tamanho || 'N/A'}</div>
      <div className="text-sm text-secondary mb-1">Valor base: {cake.valor_base ? `R$ ${cake.valor_base}` : 'Sob consulta'}</div>
      <div className="text-xs text-gray-400 text-center mb-2">Atualizado em: {cake.updated_at && new Date(cake.updated_at).toLocaleString('pt-BR')}</div>
      <Button onClick={onSchedule}>Agendar</Button>
    </div>
  );
};

export default CakeCard;
