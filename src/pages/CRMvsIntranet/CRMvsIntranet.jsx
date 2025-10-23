import React from 'react';
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
import './CRMvsIntranet.css';

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

  // Preparar dados para o gráfico de vendas consolidadas
  const prepareVendasChartData = () => {
    if (!processedData.resumoGeral) return null;

    const totalVendasCRM = processedData.resumoGeral.vendas;
    const totalVendasIntranet = processedData.resumoGeral.vendasIntranet;

    return {
      labels: ['Vendas'],
      datasets: [
        {
          label: 'CRM',
          data: [totalVendasCRM],
          backgroundColor: '#00A9E0', // Azul
          borderRadius: 8,
          maxBarThickness: 80,
        },
        {
          label: 'Intranet',
          data: [totalVendasIntranet],
          backgroundColor: '#8DC63F', // Verde
          borderRadius: 8,
          maxBarThickness: 80,
        }
      ]
    };
  };

  const vendasChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    categoryPercentage: 0.5, // Reduz a largura da categoria (mais espaço entre grupos)
    barPercentage: 0.8, // Largura das barras dentro da categoria
    plugins: {
      legend: {
        display: true,
        position: 'top',
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
        text: 'Vendas Consolidadas - CRM x Intranet',
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
            return ` ${context.dataset.label}: ${formatNumber(context.parsed.y)} vendas`;
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
        <h2 className="page-title">Comparação CRM x Intranet</h2>
        <p className="page-subtitle">Período: {periodo.descricao}</p>
      </div>

      {/* Gráficos - Layout 2 Colunas */}
      <div className="charts-row-crm">
        {/* Gráfico de Vendas Consolidadas */}
        {prepareVendasChartData() && (
          <div className="chart-container-crm">
            <Bar data={prepareVendasChartData()} options={vendasChartOptions} />
          </div>
        )}

        {/* Espaço para o próximo gráfico (Faturamento) */}
        <div className="chart-container-crm chart-placeholder">
          <p style={{textAlign: 'center', color: '#7F8C8D', marginTop: '150px'}}>Próximo gráfico será adicionado aqui</p>
        </div>
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

