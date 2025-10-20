import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import UploadModal from '../UploadModal/UploadModal';
import './Header.css';

const Header = ({ onToggleSidebar }) => {
  const { processedData } = useData();
  const [modalOpen, setModalOpen] = useState(false);

  const periodo = processedData?.periodo?.descricao || 'Aguardando dados...';

  return (
    <>
      <header className="header">
        <div className="header-left">
          <button className="btn-toggle-sidebar" onClick={onToggleSidebar} title="Mostrar/Ocultar Menu">
            ☰
          </button>
          <div className="logo">
            <span className="logo-text">Nelogica</span>
          </div>
          <h1 className="header-title">Dashboard Comercial</h1>
        </div>
        
        <div className="header-right">
          <div className="period-info">
            <span className="period-label">Período:</span>
            <span className="period-value">{periodo}</span>
          </div>
          <button className="btn-update" onClick={() => setModalOpen(true)}>
            Atualizar Dados
          </button>
        </div>
      </header>

      <UploadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Header;

