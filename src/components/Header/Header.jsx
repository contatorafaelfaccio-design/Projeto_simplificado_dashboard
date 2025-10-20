import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-text">Nelogica</span>
        </div>
        <h1 className="header-title">Dashboard Comercial</h1>
      </div>
      
      <div className="header-right">
        <div className="period-info">
          <span className="period-label">Período:</span>
          <span className="period-value">Aguardando dados...</span>
        </div>
        <button className="btn-update">
          Atualizar Dados
        </button>
      </div>
    </header>
  );
};

export default Header;

