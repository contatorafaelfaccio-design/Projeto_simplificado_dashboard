import React from 'react';
import './MenuGeral.css';

const MenuGeral = () => {
  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h2 className="page-title">Visão Geral do Time</h2>
        <p className="page-subtitle">Período: Aguardando dados...</p>
      </div>

      <div className="empty-state">
        <div className="empty-icon">📊</div>
        <h3>Nenhum dado disponível</h3>
        <p>Faça upload da planilha de dados para visualizar o dashboard</p>
        <button className="btn-primary">
          Carregar Dados
        </button>
      </div>
    </div>
  );
};

export default MenuGeral;

