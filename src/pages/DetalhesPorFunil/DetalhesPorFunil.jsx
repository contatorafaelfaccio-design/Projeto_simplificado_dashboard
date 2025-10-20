import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './DetalhesPorFunil.css';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const DetalhesPorFunil = () => {
  const { processedData, rawData, hasData } = useData();
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

  // Preparar dados para o gráfico de tentativas
  const prepareChartData = () => {
    if (!funil || !rawData || !rawData.dadosCRM) return null;

    // Filtrar dados do CRM pelo funil selecionado
    const dadosFunil = rawData.dadosCRM
      .filter(item => item.funil === funilSelecionado)
      .map(item => ({
        nome: item.vendedor,
        tentativas: item.tentativasLigacao
      }))
      .sort((a, b) => b.tentativas - a.tentativas);

    if (dadosFunil.length === 0) return null;

    const colors = ['#8DC63F', '#00A9E0', '#FFA726', '#AB47BC', '#EC407A'];

    return {
      labels: dadosFunil.map(v => v.nome),
      datasets: [{
        label: 'Tentativas de Ligação',
        data: dadosFunil.map(v => v.tentativas),
        backgroundColor: colors.slice(0, dadosFunil.length),
        borderRadius: 8,
        maxBarThickness: 60,
      }]
    };
  };

  // Mapeamento de cores fixas por vendedor
  const getVendedorColor = (nome) => {
    const nomeNormalizado = nome.toLowerCase();
    if (nomeNormalizado.includes('vitor')) return '#8DC63F'; // Verde
    if (nomeNormalizado.includes('rafael')) return '#00A9E0'; // Azul
    if (nomeNormalizado.includes('andre')) return '#FFA726'; // Laranja
    return '#AB47BC'; // Roxo (fallback)
  };

  // Preparar dados para o gráfico de pizza (Vendas)
  const preparePieChartData = () => {
    if (!funil || !rawData || !rawData.dadosCRM) return null;

    // Filtrar dados do CRM pelo funil selecionado
    const dadosFunil = rawData.dadosCRM
      .filter(item => item.funil === funilSelecionado)
      .map(item => ({
        nome: item.vendedor,
        vendas: item.vendas
      }))
      .filter(v => v.vendas > 0) // Apenas vendedores com vendas
      .sort((a, b) => b.vendas - a.vendas);

    if (dadosFunil.length === 0) return null;

    const cores = dadosFunil.map(v => getVendedorColor(v.nome));

    return {
      labels: dadosFunil.map(v => v.nome),
      datasets: [{
        label: 'Vendas',
        data: dadosFunil.map(v => v.vendas),
        backgroundColor: cores,
        borderColor: '#FFFFFF',
        borderWidth: 3,
      }]
    };
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 13,
            family: 'Inter',
            weight: '500'
          },
          color: '#2C3E50',
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      title: {
        display: true,
        text: 'Distribuição de Vendas por Vendedor',
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
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return ` ${label}: ${value} vendas (${percentage}%)`;
          }
        }
      },
      datalabels: {
        color: '#FFFFFF',
        font: {
          size: 14,
          weight: '700',
          family: 'Inter'
        },
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        }
      }
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Tentativas de Ligação por Vendedor',
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
            return ` ${formatNumber(context.parsed.y)} tentativas`;
          }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#2C3E50',
        font: {
          size: 13,
          weight: '600',
          family: 'Inter'
        },
        formatter: (value) => formatNumber(value)
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            weight: '500'
          },
          color: '#2C3E50',
          maxRotation: 45,
          minRotation: 0
        },
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        beginAtZero: true
      }
    }
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

          {/* Gráficos - Layout 2 Colunas */}
          <div className="charts-row">
            {/* Gráfico de Tentativas */}
            {prepareChartData() && (
              <div className="chart-container-funil">
                <Bar data={prepareChartData()} options={chartOptions} />
              </div>
            )}

            {/* Gráfico de Pizza - Vendas */}
            {preparePieChartData() && (
              <div className="chart-container-funil">
                <Pie data={preparePieChartData()} options={pieChartOptions} />
              </div>
            )}
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

