import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './ComparacoesNoTempo.css';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

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

  const formatTime = (minutes) => {
    if (!minutes || minutes === 0) return '0h';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
      return `${hours}h${mins}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${mins}m`;
    }
  };

  const formatVariacao = (variacao) => {
    if (variacao === 0 || variacao === null || variacao === undefined) {
      return { text: '0%', class: 'neutral' };
    }
    const text = `${variacao > 0 ? '+' : ''}${variacao.toFixed(1)}%`;
    const className = variacao > 0 ? 'positive' : 'negative';
    return { text, class: className };
  };

  // Preparar dados para o gráfico de evolução de vendas
  const prepareVendasEvolutionChartData = (semanas) => {
    if (!semanas || semanas.length === 0) return null;

    const labels = semanas.map(s => {
      if (s.semana === 'Semana Atual') return 'Atual';
      return s.semana.replace('Semana ', 'S');
    });

    const data = semanas.map(s => s.vendas);

    return {
      labels,
      datasets: [
        {
          label: 'Vendas',
          data,
          backgroundColor: '#00A9E0', // Azul para todas as barras
          borderRadius: 8,
          maxBarThickness: 80,
        }
      ]
    };
  };

  // Preparar dados para o gráfico de evolução de faturamento
  const prepareFaturamentoEvolutionChartData = (semanas) => {
    if (!semanas || semanas.length === 0) return null;

    const labels = semanas.map(s => {
      if (s.semana === 'Semana Atual') return 'Atual';
      return s.semana.replace('Semana ', 'S');
    });

    const data = semanas.map(s => s.faturamento);

    return {
      labels,
      datasets: [
        {
          label: 'Faturamento',
          data,
          backgroundColor: '#8DC63F', // Verde para todas as barras
          borderRadius: 8,
          maxBarThickness: 80,
        }
      ]
    };
  };

  const faturamentoEvolutionChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Evolução de Faturamento (4 Semanas)',
        font: {
          size: 16,
          weight: '600',
          family: 'Inter'
        },
        color: '#2C3E50',
        padding: {
          bottom: 30
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
            return ` Faturamento: ${formatCurrency(context.parsed.y)}`;
          }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#2C3E50',
        font: {
          size: 14,
          weight: '700',
          family: 'Inter'
        },
        formatter: (value) => formatCurrency(value)
      }
    },
    scales: {
      x: {
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
      },
      y: {
        display: false,
        beginAtZero: true
      }
    }
  };

  const vendasEvolutionChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Evolução de Vendas (4 Semanas)',
        font: {
          size: 16,
          weight: '600',
          family: 'Inter'
        },
        color: '#2C3E50',
        padding: {
          bottom: 30
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
            return ` Vendas: ${formatNumber(context.parsed.y)}`;
          }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#2C3E50',
        font: {
          size: 14,
          weight: '700',
          family: 'Inter'
        },
        formatter: (value) => formatNumber(value)
      }
    },
    scales: {
      x: {
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
                    <th>Tempo de Ligação</th>
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
                      <td>{formatTime(semana.tempoLigacao)}</td>
                      <td className="highlight">{formatNumber(semana.vendas)}</td>
                      <td className="highlight">{formatCurrency(semana.faturamento)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Gráficos de Evolução - Layout 2 Colunas */}
            <div className="charts-row-evolution">
              {/* Gráfico de Evolução de Vendas */}
              {prepareVendasEvolutionChartData(semanas) && (
                <div className="chart-container-evolution">
                  <Bar data={prepareVendasEvolutionChartData(semanas)} options={vendasEvolutionChartOptions} />
                </div>
              )}

              {/* Gráfico de Evolução de Faturamento */}
              {prepareFaturamentoEvolutionChartData(semanas) && (
                <div className="chart-container-evolution">
                  <Bar data={prepareFaturamentoEvolutionChartData(semanas)} options={faturamentoEvolutionChartOptions} />
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default ComparacoesNoTempo;

