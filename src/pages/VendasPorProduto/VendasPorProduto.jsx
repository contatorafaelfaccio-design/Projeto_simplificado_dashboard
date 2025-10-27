import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import './VendasPorProduto.css';

const VendasPorProduto = () => {
  const { processedData, hasData } = useData();
  const [vendedorSelecionado, setVendedorSelecionado] = useState(null);

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

  // Obter lista de vendedores
  const vendedores = Object.keys(vendasPorProduto.porVendedor);

  // Inicializar vendedor selecionado com o primeiro da lista
  if (vendedorSelecionado === null && vendedores.length > 0) {
    setVendedorSelecionado(vendedores[0]);
  }

  // Obter dados do vendedor selecionado
  const dadosVendedor = vendedorSelecionado ? vendasPorProduto.porVendedor[vendedorSelecionado] : null;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Vendas por Produto</h2>
        <p className="page-subtitle">
          Período: {periodo.dataInicio} a {periodo.dataFim}
        </p>
      </div>

      {/* Seleção de Vendedor */}
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

      {/* Cards de Resumo */}
      {dadosVendedor && (
        <div className="cards-resumo">
          <div className="card-resumo">
            <div className="card-icon" style={{ background: 'linear-gradient(135deg, #00A9E0 0%, #0088B8 100%)' }}>
              📦
            </div>
            <div className="card-info">
              <p className="card-label">Total de Vendas</p>
              <p className="card-value">{dadosVendedor.totalVendas}</p>
            </div>
          </div>

          <div className="card-resumo">
            <div className="card-icon" style={{ background: 'linear-gradient(135deg, #8DC63F 0%, #6FA82F 100%)' }}>
              💰
            </div>
            <div className="card-info">
              <p className="card-label">Faturamento Total</p>
              <p className="card-value">R$ {dadosVendedor.totalFaturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabela de Produtos */}
      {dadosVendedor && dadosVendedor.produtos && dadosVendedor.produtos.length > 0 && (
        <div className="tabela-produtos-container">
          <h3 className="tabela-titulo">Produtos do Vendedor</h3>
          <div className="tabela-wrapper">
            <table className="tabela-produtos">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Vendas</th>
                  <th>Faturamento</th>
                </tr>
              </thead>
              <tbody>
                {dadosVendedor.produtos.map((produto, index) => (
                  <tr key={index}>
                    <td className="produto-nome">{produto.nome}</td>
                    <td className="produto-vendas">{produto.vendas}</td>
                    <td className="produto-faturamento">
                      R$ {produto.faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendasPorProduto;

