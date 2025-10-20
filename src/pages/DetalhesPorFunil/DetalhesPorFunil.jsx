import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import './DetalhesPorFunil.css';

const DetalhesPorFunil = () => {
  const { processedData, hasData } = useData();
  const [funilSelecionado, setFunilSelecionado] = useState(null);

  if (!hasData()) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">Detalhes por Funil</h2>
          <p className="page-subtitle">Nenhum dado disponível</p>
        </div>
        <div className="empty-state">
          <p>Faça upload da planilha de dados para visualizar os detalhes por funil</p>
        </div>
      </div>
    );
  }

  const { porFunil, periodo } = processedData;

  // Selecionar primeiro funil automaticamente se nenhum estiver selecionado
  if (!funilSelecionado && porFunil.length > 0) {
    setFunilSelecionado(porFunil[0].nome);
  }

  const funil = porFunil.find((f) => f.nome === funilSelecionado);

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
        <h2 className="page-title">Detalhes por Funil</h2>
        <p className="page-subtitle">Período: {periodo.descricao}</p>
      </div>

      {/* Botões de Seleção de Funil */}
      <div className="funil-selector">
        {porFunil.map((f) => (
          <button
            key={f.nome}
            className={`funil-button ${funilSelecionado === f.nome ? 'active' : ''}`}
            onClick={() => setFunilSelecionado(f.nome)}
          >
            {f.nome}
          </button>
        ))}
      </div>

      {/* Conteúdo do Funil Selecionado */}
      {funil && (
        <>
          {/* KPIs do Funil */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: '#E3F2FD' }}>
                <span style={{ color: '#2196F3' }}>📞</span>
              </div>
              <div className="kpi-content">
                <div className="kpi-label">Tentativas de Ligação</div>
                <div className="kpi-value">{formatNumber(funil.tentativasLigacao)}</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: '#FFF3E0' }}>
                <span style={{ color: '#FF9800' }}>💼</span>
              </div>
              <div className="kpi-content">
                <div className="kpi-label">Negócios Trabalhados</div>
                <div className="kpi-value">{formatNumber(funil.negociosTrabalhados)}</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: '#E8F5E9' }}>
                <span style={{ color: '#4CAF50' }}>✓</span>
              </div>
              <div className="kpi-content">
                <div className="kpi-label">Vendas Realizadas</div>
                <div className="kpi-value">{formatNumber(funil.vendas)}</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: '#F3E5F5' }}>
                <span style={{ color: '#9C27B0' }}>💰</span>
              </div>
              <div className="kpi-content">
                <div className="kpi-label">Faturamento</div>
                <div className="kpi-value">{formatCurrency(funil.faturamento)}</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: '#FCE4EC' }}>
                <span style={{ color: '#E91E63' }}>%</span>
              </div>
              <div className="kpi-content">
                <div className="kpi-label">Conversão</div>
                <div className="kpi-value">{funil.conversao.toFixed(1)}%</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon" style={{ background: '#E0F2F1' }}>
                <span style={{ color: '#009688' }}>⏱</span>
              </div>
              <div className="kpi-content">
                <div className="kpi-label">Tempo em Ligação</div>
                <div className="kpi-value">{formatTime(funil.tempoLigacao)}</div>
              </div>
            </div>
          </div>

          {/* Tabela de Vendedores */}
          <div className="section-card">
            <h3 className="section-title">Performance dos Vendedores</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Vendedor</th>
                    <th>Vendas</th>
                    <th>Faturamento</th>
                    <th>Conversão</th>
                    <th>Ticket Médio</th>
                  </tr>
                </thead>
                <tbody>
                  {funil.vendedores.map((vendedor, index) => (
                    <tr key={index}>
                      <td className="vendedor-name">{vendedor.nome}</td>
                      <td>{formatNumber(vendedor.vendas)}</td>
                      <td>{formatCurrency(vendedor.faturamento)}</td>
                      <td>
                        <span className={`badge ${vendedor.conversao > 5 ? 'success' : vendedor.conversao > 0 ? 'warning' : 'danger'}`}>
                          {vendedor.conversao.toFixed(1)}%
                        </span>
                      </td>
                      <td>
                        {vendedor.vendas > 0
                          ? formatCurrency(vendedor.faturamento / vendedor.vendas)
                          : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


        </>
      )}
    </div>
  );
};

export default DetalhesPorFunil;

