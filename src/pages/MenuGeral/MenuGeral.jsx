import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import UploadModal from '../../components/UploadModal/UploadModal';
import './MenuGeral.css';

const MenuGeral = () => {
  const { processedData, hasData } = useData();
  const [modalOpen, setModalOpen] = useState(false);

  if (!hasData()) {
    return (
      <>
        <div className="page-container">
          <div className="page-header">
            <h2 className="page-title">Visão Geral do Time</h2>
            <p className="page-subtitle">Período: Aguardando dados...</p>
          </div>

          <div className="empty-state">
            <h3>Nenhum dado disponível</h3>
            <p>Faça upload da planilha de dados para visualizar o dashboard</p>
            <button className="btn-primary" onClick={() => setModalOpen(true)}>
              Carregar Dados
            </button>
          </div>
        </div>

        <UploadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  const { resumoGeral, periodo } = processedData;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const formatTime = (minutos) => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    if (horas === 0) return `${mins}m`;
    if (mins === 0) return `${horas}h`;
    return `${horas}h${mins}m`;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Visão Geral do Time</h2>
        <p className="page-subtitle">Período: {periodo.descricao}</p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: '#E3F2FD' }}>
            <span style={{ color: '#2196F3' }}>📞</span>
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Tentativas de Ligação</div>
            <div className="kpi-value">{formatNumber(resumoGeral.tentativasLigacao)}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: '#FFF3E0' }}>
            <span style={{ color: '#FF9800' }}>💼</span>
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Negócios Trabalhados</div>
            <div className="kpi-value">{formatNumber(resumoGeral.negociosTrabalhados)}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: '#E8F5E9' }}>
            <span style={{ color: '#4CAF50' }}>✓</span>
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Vendas Realizadas</div>
            <div className="kpi-value">{formatNumber(resumoGeral.vendas)}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: '#F3E5F5' }}>
            <span style={{ color: '#9C27B0' }}>💰</span>
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Faturamento Total</div>
            <div className="kpi-value">{formatCurrency(resumoGeral.faturamento)}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: '#FCE4EC' }}>
            <span style={{ color: '#E91E63' }}>%</span>
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Conversão Média</div>
            <div className="kpi-value">{resumoGeral.conversaoMedia.toFixed(1)}%</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: '#E0F2F1' }}>
            <span style={{ color: '#009688' }}>⏱</span>
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Tempo em Ligação</div>
            <div className="kpi-value">{formatTime(resumoGeral.tempoLigacao)}</div>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="info-card">
          <h3>Ticket Médio</h3>
          <div className="info-value">{formatCurrency(resumoGeral.ticketMedio)}</div>
          <p className="info-description">Valor médio por venda realizada</p>
        </div>

        <div className="info-card">
          <h3>Performance</h3>
          <div className="info-value">
            {resumoGeral.vendas} / {resumoGeral.negociosTrabalhados}
          </div>
          <p className="info-description">Vendas / Negócios trabalhados</p>
        </div>
      </div>
    </div>
  );
};

export default MenuGeral;

