import { useState } from 'react';
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

      {/* Layout 2 Colunas: KPIs à esquerda | Gráficos à direita */}
      <div className="menu-geral-layout">
        {/* Coluna Esquerda: KPIs */}
        <div className="kpis-column">
          <div className="kpi-grid-two-cols">
            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Tentativas de Ligação</div>
                <div className="kpi-value">{formatNumber(resumoGeral.tentativasLigacao)}</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Negócios Trabalhados</div>
                <div className="kpi-value">{formatNumber(resumoGeral.negociosTrabalhados)}</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Vendas Realizadas</div>
                <div className="kpi-value">{formatNumber(resumoGeral.vendas)}</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Faturamento Total</div>
                <div className="kpi-value">{formatCurrency(resumoGeral.faturamento)}</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Conversão Média</div>
                <div className="kpi-value">{(resumoGeral.conversaoMedia || 0).toFixed(1)}%</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Tempo em Ligação</div>
                <div className="kpi-value">{formatTime(resumoGeral.tempoLigacao)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Gráficos (placeholder por enquanto) */}
        <div className="charts-column">
          <div className="chart-placeholder">
            <p>Gráficos serão adicionados nas próximas etapas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuGeral;

