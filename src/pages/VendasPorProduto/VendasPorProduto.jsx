import React from 'react';
import { useData } from '../../contexts/DataContext';
import './VendasPorProduto.css';

const VendasPorProduto = () => {
  const { processedData, hasData } = useData();

  if (!hasData()) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">Vendas por Produto</h2>
          <p className="page-subtitle">Nenhum dado disponível</p>
        </div>
        <div className="empty-state">
          <p>Faça upload da planilha de dados para visualizar as vendas por produto</p>
        </div>
      </div>
    );
  }

  const { vendasPorProduto, periodo } = processedData;

  // Verificar se há dados de vendas por produto
  if (!vendasPorProduto || !vendasPorProduto.porVendedor || Object.keys(vendasPorProduto.porVendedor).length === 0) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">Vendas por Produto</h2>
          <p className="page-subtitle">
            Período: {periodo.dataInicio} a {periodo.dataFim}
          </p>
        </div>
        <div className="empty-state">
          <p>Nenhum dado de vendas por produto encontrado na planilha.</p>
          <p className="empty-state-hint">
            Certifique-se de que a aba "Vendas por Produto" existe e contém dados válidos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Vendas por Produto</h2>
        <p className="page-subtitle">
          Período: {periodo.dataInicio} a {periodo.dataFim}
        </p>
      </div>

      {/* Conteúdo será adicionado nas próximas etapas */}
      <div className="vendas-produto-content">
        <p>Conteúdo em desenvolvimento...</p>
      </div>
    </div>
  );
};

export default VendasPorProduto;

