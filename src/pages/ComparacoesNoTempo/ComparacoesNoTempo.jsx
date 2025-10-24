import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import './ComparacoesNoTempo.css';

const ComparacoesNoTempo = () => {
  const { processedData, hasData } = useData();
  const [vendedorSelecionado, setVendedorSelecionado] = useState(null);

  if (!hasData()) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">Comparações no Tempo</h2>
          <p className="page-subtitle">Nenhum dado disponível</p>
        </div>
        <div className="empty-state">
          <p>Faça upload da planilha de dados para visualizar a evolução temporal</p>
        </div>
      </div>
    );
  }

  const { evolucaoTemporal, periodo } = processedData;

  // Obter lista de vendedores
  const vendedores = Object.keys(evolucaoTemporal);

  // Inicializar vendedor selecionado com o primeiro da lista
  if (vendedorSelecionado === null && vendedores.length > 0) {
    setVendedorSelecionado(vendedores[0]);
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const formatVariacao = (variacao) => {
    if (variacao === 0 || variacao === null || variacao === undefined) {
      return { text: '0%', class: 'neutral' };
    }
    const text = `${variacao > 0 ? '+' : ''}${variacao.toFixed(1)}%`;
    const className = variacao > 0 ? 'positive' : 'negative';
    return { text, class: className };
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Comparações no Tempo</h2>
        <p className="page-subtitle">Período Atual: {periodo.descricao}</p>
      </div>

      {/* Seleção de Vendedores */}
      <div className="vendedor-selector">
        <h3 className="selector-title">Selecione o Vendedor:</h3>
        <div className="vendedor-buttons">
          {vendedores.map((vendedor) => (
            <button
              key={vendedor}
              className={`vendedor-btn ${vendedorSelecionado === vendedor ? 'active' : ''}`}
              onClick={() => setVendedorSelecionado(vendedor)}
            >
              {vendedor}
            </button>
          ))}
        </div>
      </div>

      {/* Evolução do Vendedor Selecionado */}
      {vendedorSelecionado && evolucaoTemporal[vendedorSelecionado] && (() => {
        const vendedor = vendedorSelecionado;
        const semanas = evolucaoTemporal[vendedor];
        const semanaAtual = semanas[0];

        return (
          <div key={vendedor} className="vendedor-evolution-card">
            <div className="vendedor-header">
              <h3>{vendedor}</h3>
              {semanaAtual.variacaoVendas && (
                <div className="variacao-badges">
                  <span className={`variacao-badge ${formatVariacao(semanaAtual.variacaoVendas).class}`}>
                    Vendas: {formatVariacao(semanaAtual.variacaoVendas).text}
                  </span>
                  <span className={`variacao-badge ${formatVariacao(semanaAtual.variacaoFaturamento).class}`}>
                    Faturamento: {formatVariacao(semanaAtual.variacaoFaturamento).text}
                  </span>
                </div>
              )}
            </div>

            <div className="evolution-table-container">
              <table className="evolution-table">
                <thead>
                  <tr>
                    <th>Período</th>
                    <th>Tentativas</th>
                    <th>Negócios</th>
                    <th>Vendas</th>
                    <th>Faturamento</th>
                  </tr>
                </thead>
                <tbody>
                  {semanas.map((semana, index) => (
                    <tr key={index} className={index === 0 ? 'current-week' : ''}>
                      <td className="period-cell">
                        <div className="period-label">
                          {semana.semana === 'Semana Atual' ? (
                            <span className="current-badge">Atual</span>
                          ) : (
                            semana.semana
                          )}
                        </div>
                        <div className="period-date">{semana.periodo}</div>
                      </td>
                      <td>{formatNumber(semana.tentativasLigacao)}</td>
                      <td>{formatNumber(semana.negociosTrabalhados)}</td>
                      <td className="highlight">{formatNumber(semana.vendas)}</td>
                      <td className="highlight">{formatCurrency(semana.faturamento)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Gráfico de Barras Simples */}
            <div className="simple-chart">
              <h4>Evolução de Vendas</h4>
              <div className="chart-bars">
                {semanas.map((semana, index) => {
                  const maxVendas = Math.max(...semanas.map(s => s.vendas));
                  const percent = maxVendas > 0 ? (semana.vendas / maxVendas) * 100 : 0;

                  return (
                    <div key={index} className="chart-bar-item">
                      <div className="chart-bar-container">
                        <div 
                          className={`chart-bar ${index === 0 ? 'current' : ''}`}
                          style={{ height: `${percent}%` }}
                        >
                          <span className="bar-label">{semana.vendas}</span>
                        </div>
                      </div>
                      <div className="chart-label">
                        {semana.semana === 'Semana Atual' ? 'Atual' : semana.semana.replace('Semana ', 'S')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default ComparacoesNoTempo;

