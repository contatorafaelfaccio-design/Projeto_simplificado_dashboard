import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import UploadModal from '../../components/UploadModal/UploadModal';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './MenuGeral.css';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  // Preparar dados para o gráfico de barras (Top 5 Tentativas)
  const prepareBarChartData = () => {
    const sorted = [...processedData.porVendedor]
      .sort((a, b) => b.tentativasLigacao - a.tentativasLigacao)
      .slice(0, 5);

    const colors = ['#8DC63F', '#00A9E0', '#FFA726', '#AB47BC', '#EC407A'];

    return {
      labels: sorted.map(v => v.nome),
      datasets: [{
        label: 'Tentativas de Ligação',
        data: sorted.map(v => v.tentativasLigacao),
        backgroundColor: colors,
        borderRadius: 8,
        barThickness: 40,
      }]
    };
  };

  const barChartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Top 5 - Tentativas de Ligação por Vendedor',
        font: {
          size: 16,
          weight: '600',
          family: 'Inter'
        },
        color: '#2C3E50',
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(44, 62, 80, 0.9)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: (context) => {
            return ` ${formatNumber(context.parsed.x)} tentativas`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value) => formatNumber(value),
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      y: {
        ticks: {
          font: {
            size: 13,
            weight: '500'
          },
          color: '#2C3E50'
        },
        grid: {
          display: false
        }
      }
    }
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

        {/* Coluna Direita: Gráficos */}
        <div className="charts-column">
          <div className="chart-container">
            <Bar data={prepareBarChartData()} options={barChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuGeral;

