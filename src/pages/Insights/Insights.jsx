import React from 'react';
import { useData } from '../../contexts/DataContext';
import './Insights.css';

const Insights = () => {
  const { processedData, hasData } = useData();

  if (!hasData()) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">Insights</h2>
          <p className="page-subtitle">Nenhum dado disponível</p>
        </div>
        <div className="empty-state">
          <p>Faça upload da planilha de dados para visualizar os insights</p>
        </div>
      </div>
    );
  }

  const { insights, periodo } = processedData;

  const getInsightIcon = (tipo) => {
    switch (tipo) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      case 'alert':
        return '!';
      default:
        return '•';
    }
  };

  const getInsightClass = (tipo) => {
    switch (tipo) {
      case 'success':
        return 'insight-success';
      case 'warning':
        return 'insight-warning';
      case 'info':
        return 'insight-info';
      case 'alert':
        return 'insight-alert';
      default:
        return 'insight-default';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Insights e Recomendações</h2>
        <p className="page-subtitle">Período: {periodo.descricao}</p>
      </div>

      {/* Resumo Executivo */}
      <div className="executive-summary">
        <h3>Resumo Executivo</h3>
        <p>
          Análise automática dos dados de performance do time comercial, identificando
          destaques, oportunidades de melhoria e recomendações estratégicas.
        </p>
      </div>

      {/* Insights Cards */}
      <div className="insights-grid">
        {insights.map((insight, index) => (
          <div key={index} className={`insight-card ${getInsightClass(insight.tipo)}`}>
            <div className="insight-icon">
              {getInsightIcon(insight.tipo)}
            </div>
            <div className="insight-content">
              <h4 className="insight-title">{insight.titulo}</h4>
              <p className="insight-text">{insight.mensagem}</p>
              {insight.recomendacao && (
                <div className="insight-recommendation">
                  <strong>Recomendação:</strong> {insight.recomendacao}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Ações Prioritárias */}
      <div className="priority-actions">
        <h3>Ações Prioritárias</h3>
        <div className="actions-list">
          {insights
            .filter((i) => i.tipo === 'alert' || i.tipo === 'warning')
            .map((insight, index) => (
              <div key={index} className="action-item">
                <div className="action-number">{index + 1}</div>
                <div className="action-content">
                  <h4>{insight.titulo}</h4>
                  <p>{insight.recomendacao || insight.mensagem}</p>
                </div>
              </div>
            ))}
          {insights.filter((i) => i.tipo === 'alert' || i.tipo === 'warning').length === 0 && (
            <div className="no-actions">
              <p>Nenhuma ação crítica identificada. Continue o bom trabalho!</p>
            </div>
          )}
        </div>
      </div>

      {/* Destaques Positivos */}
      <div className="positive-highlights">
        <h3>Destaques Positivos</h3>
        <div className="highlights-list">
          {insights
            .filter((i) => i.tipo === 'success')
            .map((insight, index) => (
              <div key={index} className="highlight-item">
                <div className="highlight-icon">✓</div>
                <div className="highlight-text">{insight.mensagem}</div>
              </div>
            ))}
          {insights.filter((i) => i.tipo === 'success').length === 0 && (
            <div className="no-highlights">
              <p>Nenhum destaque positivo identificado neste período.</p>
            </div>
          )}
        </div>
      </div>

      {/* Observações */}
      <div className="observations-card">
        <h3>Observações Gerais</h3>
        <ul>
          {insights
            .filter((i) => i.tipo === 'info')
            .map((insight, index) => (
              <li key={index}>{insight.mensagem}</li>
            ))}
          {insights.filter((i) => i.tipo === 'info').length === 0 && (
            <li>Nenhuma observação adicional para este período.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Insights;

