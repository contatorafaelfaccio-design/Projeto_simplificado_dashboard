/**
 * Serviço para processamento e análise de dados
 */
class DataProcessor {
  /**
   * Processa dados brutos e gera métricas agregadas
   */
  processData(rawData) {
    try {
      console.log('[DataProcessor] Iniciando processamento...', rawData);
      
      const result = {
      periodo: rawData.periodo,
      metadata: rawData.metadata,
      resumoGeral: this.calculateResumoGeral(rawData),
      porVendedor: this.aggregateByVendedor(rawData),
      porFunil: this.aggregateByFunil(rawData),
      divergenciasCRM: this.calculateDivergencias(rawData),
      evolucaoTemporal: this.calculateEvolucaoTemporal(rawData),
      insights: this.generateInsights(rawData),
      };
      
      console.log('[DataProcessor] Processamento concluído com sucesso');
      return result;
    } catch (error) {
      console.error('[DataProcessor] Erro no processamento:', error);
      throw error;
    }
  }

  /**
   * Calcula resumo geral da semana atual
   */
  calculateResumoGeral(data) {
    const { dadosCRM } = data;

    const totais = dadosCRM.reduce(
      (acc, item) => ({
        tentativasLigacao: acc.tentativasLigacao + item.tentativasLigacao,
        negociosTrabalhados: acc.negociosTrabalhados + item.negociosTrabalhados,
        vendas: acc.vendas + item.vendas,
        faturamento: acc.faturamento + item.faturamento,
        tempoLigacao: acc.tempoLigacao + item.tempoLigacao,
      }),
      {
        tentativasLigacao: 0,
        negociosTrabalhados: 0,
        vendas: 0,
        faturamento: 0,
        tempoLigacao: 0,
      }
    );

    return {
      ...totais,
      conversaoMedia:
        totais.negociosTrabalhados > 0
          ? (totais.vendas / totais.negociosTrabalhados) * 100
          : 0,
      ticketMedio: totais.vendas > 0 ? totais.faturamento / totais.vendas : 0,
    };
  }

  /**
   * Agrega dados por vendedor
   */
  aggregateByVendedor(data) {
    const { dadosCRM } = data;
    const vendedores = {};

    dadosCRM.forEach((item) => {
      if (!vendedores[item.vendedor]) {
        vendedores[item.vendedor] = {
          nome: item.vendedor,
          tentativasLigacao: 0,
          negociosTrabalhados: 0,
          vendas: 0,
          faturamento: 0,
          tempoLigacao: 0,
          funis: [],
        };
      }

      const v = vendedores[item.vendedor];
      v.tentativasLigacao += item.tentativasLigacao;
      v.negociosTrabalhados += item.negociosTrabalhados;
      v.vendas += item.vendas;
      v.faturamento += item.faturamento;
      v.tempoLigacao += item.tempoLigacao;
      v.funis.push({
        nome: item.funil,
        vendas: item.vendas,
        faturamento: item.faturamento,
      });
    });

    // Calcular métricas derivadas
    Object.values(vendedores).forEach((v) => {
      v.conversao =
        v.negociosTrabalhados > 0
          ? (v.vendas / v.negociosTrabalhados) * 100
          : 0;
      v.ticketMedio = v.vendas > 0 ? v.faturamento / v.vendas : 0;
    });

    return Object.values(vendedores);
  }

  /**
   * Agrega dados por funil
   */
  aggregateByFunil(data) {
    const { dadosCRM } = data;
    const funis = {};

    dadosCRM.forEach((item) => {
      if (!funis[item.funil]) {
        funis[item.funil] = {
          nome: item.funil,
          tentativasLigacao: 0,
          negociosTrabalhados: 0,
          vendas: 0,
          faturamento: 0,
          tempoLigacao: 0,
          vendedores: [],
        };
      }

      const f = funis[item.funil];
      f.tentativasLigacao += item.tentativasLigacao;
      f.negociosTrabalhados += item.negociosTrabalhados;
      f.vendas += item.vendas;
      f.faturamento += item.faturamento;
      f.tempoLigacao += item.tempoLigacao;
      f.vendedores.push({
        nome: item.vendedor,
        vendas: item.vendas,
        faturamento: item.faturamento,
        conversao: item.conversao,
      });
    });

    // Calcular métricas derivadas
    Object.values(funis).forEach((f) => {
      f.conversao =
        f.negociosTrabalhados > 0
          ? (f.vendas / f.negociosTrabalhados) * 100
          : 0;
      f.ticketMedio = f.vendas > 0 ? f.faturamento / f.vendas : 0;
    });

    return Object.values(funis);
  }

  /**
   * Calcula divergências entre CRM e Intranet
   */
  calculateDivergencias(data) {
    const { dadosCRM, dadosIntranet } = data;
    const divergencias = [];

    dadosCRM.forEach((crm) => {
      const intranet = dadosIntranet.find(
        (i) => i.vendedor === crm.vendedor && i.funil === crm.funil
      );

      if (intranet) {
        const diffVendas = intranet.vendas - crm.vendas;
        const diffFaturamento = intranet.faturamento - crm.faturamento;

        if (diffVendas !== 0 || diffFaturamento !== 0) {
          divergencias.push({
            vendedor: crm.vendedor,
            funil: crm.funil,
            crmVendas: crm.vendas,
            intranetVendas: intranet.vendas,
            diffVendas,
            crmFaturamento: crm.faturamento,
            intranetFaturamento: intranet.faturamento,
            diffFaturamento,
            percentualVendas:
              crm.vendas > 0 ? (diffVendas / crm.vendas) * 100 : 0,
            percentualFaturamento:
              crm.faturamento > 0
                ? (diffFaturamento / crm.faturamento) * 100
                : 0,
          });
        }
      }
    });

    return {
      total: divergencias.length,
      items: divergencias,
    };
  }

  /**
   * Calcula evolução temporal (4 semanas)
   */
  calculateEvolucaoTemporal(data) {
    const { dadosCRM, historico, periodo } = data;

    // Agrupar histórico por vendedor
    const porVendedor = {};

    // Adicionar semana atual
    const semanaAtual = this.aggregateByVendedor({ dadosCRM });
    semanaAtual.forEach((v) => {
      porVendedor[v.nome] = [
        {
          semana: 'Semana Atual',
          periodo: periodo.descricao,
          ...v,
        },
      ];
    });

    // Adicionar histórico
    historico.forEach((h) => {
      if (!porVendedor[h.vendedor]) {
        porVendedor[h.vendedor] = [];
      }
      porVendedor[h.vendedor].push({
        semana: h.semana,
        periodo: h.periodo,
        tentativasLigacao: h.tentativasLigacao,
        negociosTrabalhados: h.negociosTrabalhados,
        vendas: h.vendas,
        faturamento: h.faturamento,
        tempoLigacao: h.tempoLigacao,
      });
    });

    // Calcular variações
    Object.keys(porVendedor).forEach((vendedor) => {
      const semanas = porVendedor[vendedor];
      if (semanas.length >= 2) {
        const atual = semanas[0];
        const anterior = semanas[1];

        atual.variacaoVendas = this.calculateVariacao(
          atual.vendas,
          anterior.vendas
        );
        atual.variacaoFaturamento = this.calculateVariacao(
          atual.faturamento,
          anterior.faturamento
        );
      }
    });

    return porVendedor;
  }

  /**
   * Calcula variação percentual
   */
  calculateVariacao(atual, anterior) {
    if (anterior === 0) return atual > 0 ? 100 : 0;
    return ((atual - anterior) / anterior) * 100;
  }

  /**
   * Gera insights automáticos
   */
  generateInsights(data) {
    const insights = [];

    // Calcular dados necessários (sem chamar processData para evitar loop)
    const resumoGeral = this.calculateResumoGeral(data);
    const vendedores = this.aggregateByVendedor(data);
    const topVendedor = vendedores.sort((a, b) => b.vendas - a.vendas)[0];
    if (topVendedor) {
      insights.push({
        tipo: 'destaque',
        titulo: 'Vendedor Destaque',
        descricao: `${topVendedor.nome} lidera em vendas com ${topVendedor.vendas} vendas e R$ ${topVendedor.faturamento.toFixed(2)} de faturamento.`,
        icone: '🏆',
      });
    }

    // Insight: Funil mais efetivo
    const funis = this.aggregateByFunil(data);
    const topFunil = funis.sort((a, b) => b.vendas - a.vendas)[0];
    if (topFunil && topFunil.vendas > 0) {
      insights.push({
        tipo: 'sucesso',
        titulo: 'Funil Mais Efetivo',
        descricao: `${topFunil.nome} gerou ${topFunil.vendas} vendas com conversão de ${topFunil.conversao.toFixed(1)}%.`,
        icone: '📈',
      });
    }

    // Insight: Funil com oportunidade
    const funilBaixaConversao = funis.find(
      (f) => f.tentativasLigacao > 100 && f.vendas === 0
    );
    if (funilBaixaConversao) {
      insights.push({
        tipo: 'alerta',
        titulo: 'Oportunidade de Melhoria',
        descricao: `${funilBaixaConversao.nome} teve ${funilBaixaConversao.tentativasLigacao} tentativas mas nenhuma venda. Revisar abordagem.`,
        icone: '⚠️',
      });
    }

    // Insight: Divergências CRM x Intranet
    const diverg = this.calculateDivergencias(data);
    if (diverg.total > 0) {
      insights.push({
        tipo: 'alerta',
        titulo: 'Divergências Identificadas',
        descricao: `${diverg.total} divergência(s) entre CRM e Intranet. Verificar lançamentos.`,
        icone: '🔍',
      });
    }

    // Insight: Conversão geral
    if (resumoGeral.conversaoMedia < 3) {
      insights.push({
        tipo: 'atencao',
        titulo: 'Conversão Abaixo da Meta',
        descricao: `Taxa de conversão geral está em ${resumoGeral.conversaoMedia.toFixed(1)}%. Meta sugerida: 5%.`,
        icone: '📊',
      });
    }

    return insights;
  }
}

export default new DataProcessor();

