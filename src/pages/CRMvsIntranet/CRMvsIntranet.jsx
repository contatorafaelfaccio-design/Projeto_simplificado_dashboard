import React from 'react';
import { useData } from '../../contexts/DataContext';
import './CRMvsIntranet.css';

const CRMvsIntranet = () => {
  const { processedData, hasData } = useData();

  if (!hasData()) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">CRM x Intranet</h2>
          <p className="page-subtitle">Nenhum dado disponível</p>
        </div>
        <div className="empty-state">
          <p>Faça upload da planilha de dados para visualizar as divergências</p>
        </div>
      </div>
    );
  }

  const { divergenciasCRM, periodo } = processedData;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Comparação CRM x Intranet</h2>
        <p className="page-subtitle">Período: {periodo.descricao}</p>
      </div>

      {/* Resumo de Divergências */}
      <div className="summary-card">
        <div className="summary-icon">
          {divergenciasCRM.total === 0 ? '✓' : '⚠'}
        </div>
        <div className="summary-content">
          <h3>
            {divergenciasCRM.total === 0
              ? 'Nenhuma Divergência Encontrada'
              : `${divergenciasCRM.total} Divergência(s) Identificada(s)`}
          </h3>
          <p>
            {divergenciasCRM.total === 0
              ? 'Os dados do CRM e Intranet estão sincronizados'
              : 'Verifique os lançamentos abaixo e corrija as inconsistências'}
          </p>
        </div>
      </div>

      {/* Tabela de Comparação */}
      <div className="section-card">
        <h3 className="section-title">Detalhamento das Divergências</h3>
        
        {divergenciasCRM.total === 0 ? (
          <div className="no-divergencias">
            <p>Todos os dados estão consistentes entre CRM e Intranet</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th rowSpan="2">Vendedor</th>
                  <th rowSpan="2">Funil</th>
                  <th colSpan="3" className="group-header">Vendas</th>
                  <th colSpan="3" className="group-header">Faturamento</th>
                </tr>
                <tr>
                  <th>CRM</th>
                  <th>Intranet</th>
                  <th>Diferença</th>
                  <th>CRM</th>
                  <th>Intranet</th>
                  <th>Diferença</th>
                </tr>
              </thead>
              <tbody>
                {divergenciasCRM.items.map((item, index) => (
                  <tr key={index} className="divergencia-row">
                    <td className="vendedor-name">{item.vendedor}</td>
                    <td>{item.funil}</td>
                    
                    {/* Vendas */}
                    <td>{formatNumber(item.crmVendas)}</td>
                    <td>{formatNumber(item.intranetVendas)}</td>
                    <td>
                      <span className={`diff-badge ${item.diffVendas > 0 ? 'positive' : item.diffVendas < 0 ? 'negative' : 'neutral'}`}>
                        {item.diffVendas > 0 ? '+' : ''}{formatNumber(item.diffVendas)}
                      </span>
                    </td>
                    
                    {/* Faturamento */}
                    <td>{formatCurrency(item.crmFaturamento)}</td>
                    <td>{formatCurrency(item.intranetFaturamento)}</td>
                    <td>
                      <span className={`diff-badge ${item.diffFaturamento > 0 ? 'positive' : item.diffFaturamento < 0 ? 'negative' : 'neutral'}`}>
                        {item.diffFaturamento > 0 ? '+' : ''}{formatCurrency(item.diffFaturamento)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Ações Recomendadas */}
      {divergenciasCRM.total > 0 && (
        <div className="actions-card">
          <h3>Ações Recomendadas</h3>
          <ul>
            <li>Verificar se todas as vendas foram lançadas corretamente no CRM</li>
            <li>Confirmar se os valores de faturamento estão atualizados na Intranet</li>
            <li>Revisar possíveis vendas duplicadas ou não contabilizadas</li>
            <li>Atualizar os sistemas para sincronizar os dados</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CRMvsIntranet;

