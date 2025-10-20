import React from 'react';
import { useData } from '../../contexts/DataContext';
import './ResultadosGerais.css';

const ResultadosGerais = () => {
  const { processedData, hasData } = useData();

  if (!hasData()) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">Resultados Gerais</h2>
          <p className="page-subtitle">Nenhum dado disponível</p>
        </div>
        <div className="empty-state">
          <p>Faça upload da planilha de dados para visualizar os resultados</p>
        </div>
      </div>
    );
  }

  const { porVendedor, porFunil, periodo } = processedData;

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

  // Ordenar vendedores por vendas
  const vendedoresOrdenados = [...porVendedor].sort((a, b) => b.vendas - a.vendas);

  // Ordenar funis por faturamento
  const funisOrdenados = [...porFunil].sort((a, b) => b.faturamento - a.faturamento);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Resultados Gerais</h2>
        <p className="page-subtitle">Período: {periodo.descricao}</p>
      </div>

      {/* Ranking de Vendedores */}
      <div className="section-card">
        <h3 className="section-title">Ranking de Vendedores</h3>
        <div className="table-container">
          <table className="ranking-table">
            <thead>
              <tr>
                <th className="rank-col">Posição</th>
                <th>Vendedor</th>
                <th>Tentativas</th>
                <th>Negócios</th>
                <th>Vendas</th>
                <th>Conversão</th>
                <th>Faturamento</th>
                <th>Ticket Médio</th>
                <th>Tempo</th>
              </tr>
            </thead>
            <tbody>
              {vendedoresOrdenados.map((vendedor, index) => (
                <tr key={vendedor.nome} className={index === 0 ? 'top-performer' : ''}>
                  <td className="rank-col">
                    <div className={`rank-badge rank-${index + 1}`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </div>
                  </td>
                  <td className="vendedor-name">{vendedor.nome}</td>
                  <td>{formatNumber(vendedor.tentativasLigacao)}</td>
                  <td>{formatNumber(vendedor.negociosTrabalhados)}</td>
                  <td className="highlight">{formatNumber(vendedor.vendas)}</td>
                  <td>
                    <span className={`badge ${vendedor.conversao > 5 ? 'success' : vendedor.conversao > 0 ? 'warning' : 'danger'}`}>
                      {vendedor.conversao.toFixed(1)}%
                    </span>
                  </td>
                  <td className="highlight">{formatCurrency(vendedor.faturamento)}</td>
                  <td>{formatCurrency(vendedor.ticketMedio)}</td>
                  <td>{formatTime(vendedor.tempoLigacao)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance por Funil */}
      <div className="section-card">
        <h3 className="section-title">Performance por Funil</h3>
        <div className="funil-cards">
          {funisOrdenados.map((funil, index) => (
            <div key={funil.nome} className="funil-performance-card">
              <div className="funil-header">
                <h4>{funil.nome}</h4>
                {index === 0 && <span className="top-badge">Top Funil</span>}
              </div>
              <div className="funil-metrics">
                <div className="metric">
                  <span className="metric-label">Vendas</span>
                  <span className="metric-value">{formatNumber(funil.vendas)}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Faturamento</span>
                  <span className="metric-value">{formatCurrency(funil.faturamento)}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Conversão</span>
                  <span className="metric-value">{funil.conversao.toFixed(1)}%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Ticket Médio</span>
                  <span className="metric-value">{formatCurrency(funil.ticketMedio)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparação Visual */}
      <div className="section-card">
        <h3 className="section-title">Comparação de Performance</h3>
        <div className="comparison-bars">
          {vendedoresOrdenados.map((vendedor) => {
            const maxVendas = Math.max(...vendedoresOrdenados.map(v => v.vendas));
            const maxFaturamento = Math.max(...vendedoresOrdenados.map(v => v.faturamento));
            const percentVendas = (vendedor.vendas / maxVendas) * 100;
            const percentFaturamento = (vendedor.faturamento / maxFaturamento) * 100;

            return (
              <div key={vendedor.nome} className="comparison-item">
                <div className="comparison-label">{vendedor.nome}</div>
                <div className="comparison-row">
                  <span className="row-label">Vendas</span>
                  <div className="bar-container">
                    <div className="bar bar-vendas" style={{ width: `${percentVendas}%` }}></div>
                    <span className="bar-value">{formatNumber(vendedor.vendas)}</span>
                  </div>
                </div>
                <div className="comparison-row">
                  <span className="row-label">Faturamento</span>
                  <div className="bar-container">
                    <div className="bar bar-faturamento" style={{ width: `${percentFaturamento}%` }}></div>
                    <span className="bar-value">{formatCurrency(vendedor.faturamento)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultadosGerais;

