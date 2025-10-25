import * as XLSX from 'xlsx';

/**
 * Serviço para leitura e processamento de planilhas Excel
 */
class ExcelReader {
  /**
   * Lê o arquivo Excel e retorna os dados processados
   * @param {File} file - Arquivo Excel (.xlsx)
   * @returns {Promise<Object>} Dados processados
   */
  async readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          console.log('[ExcelReader] Lendo arquivo...');
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          console.log('[ExcelReader] Workbook carregado, abas:', workbook.SheetNames);

          // Validar estrutura
          this.validateWorkbook(workbook);

          // Processar cada aba
          const processedData = {
            periodo: this.extractPeriodo(workbook),
            dadosCRM: this.extractDadosCRM(workbook),
            historico: this.extractHistorico(workbook),
            dadosIntranet: this.extractDadosIntranet(workbook),
            vendasPorProduto: this.extractVendasPorProduto(workbook),
            metadata: {
              dataProcessamento: new Date().toISOString(),
              nomeArquivo: file.name,
            },
          };

          console.log('[ExcelReader] Dados processados com sucesso');
          resolve(processedData);
        } catch (error) {
          console.error('[ExcelReader] Erro:', error);
          reject(new Error(`Erro ao processar planilha: ${error.message}`));
        }
      };

      reader.onerror = () => {
        reject(new Error('Erro ao ler arquivo'));
      };

      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Valida se a planilha possui todas as abas necessárias
   */
  validateWorkbook(workbook) {
    const requiredSheets = [
      'Dados CRM - Semana Atual',
      'Histórico Semanal',
      'Dados Intranet',
    ];

    const missingSheets = requiredSheets.filter(
      (sheet) => !workbook.SheetNames.includes(sheet)
    );

    if (missingSheets.length > 0) {
      throw new Error(
        `Abas obrigatórias ausentes: ${missingSheets.join(', ')}`
      );
    }
  }

  /**
   * Extrai informações de período
   */
  extractPeriodo(workbook) {
    const sheet = workbook.Sheets['Dados CRM - Semana Atual'];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Período está na linha 2 (índice 1)
    const dataInicio = data[1][1]; // Coluna B
    const dataFim = data[1][2]; // Coluna C

    return {
      dataInicio: this.parseExcelDate(dataInicio),
      dataFim: this.parseExcelDate(dataFim),
      descricao: this.formatPeriodoDescricao(dataInicio, dataFim),
    };
  }

  /**
   * Extrai dados do CRM (semana atual)
   */
  extractDadosCRM(workbook) {
    const sheet = workbook.Sheets['Dados CRM - Semana Atual'];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Cabeçalhos estão na linha 4 (índice 3)
    const headers = data[3];
    const rows = data.slice(4); // Dados começam na linha 5

    return rows
      .filter((row) => row[0] && row[1]) // Vendedor e Funil preenchidos
      .map((row) => ({
        vendedor: row[0],
        funil: row[1],
        tentativasLigacao: this.parseNumber(row[2]),
        negociosTrabalhados: this.parseNumber(row[3]),
        vendas: this.parseNumber(row[4]),
        conversao: this.calculateConversao(row[4], row[3]),
        faturamento: this.parseNumber(row[6]),
        tempoLigacao: this.parseTempoLigacao(row[7]),
      }));
  }

  /**
   * Extrai histórico semanal
   */
  extractHistorico(workbook) {
    const sheet = workbook.Sheets['Histórico Semanal'];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Cabeçalhos na linha 3 (índice 2)
    const rows = data.slice(3); // Dados começam na linha 4

    return rows
      .filter((row) => row[0] && row[1]) // Vendedor e Semana preenchidos
      .map((row) => ({
        vendedor: row[0],
        semana: row[1], // "Semana -1", "Semana -2", etc.
        periodo: row[2],
        tentativasLigacao: this.parseNumber(row[3]),
        negociosTrabalhados: this.parseNumber(row[4]),
        vendas: this.parseNumber(row[5]),
        faturamento: this.parseNumber(row[6]),
        tempoLigacao: this.parseTempoLigacao(row[7]),
      }));
  }

  /**
   * Extrai dados da Intranet
   */
  extractDadosIntranet(workbook) {
    const sheet = workbook.Sheets['Dados Intranet'];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Cabeçalhos na linha 4 (índice 3)
    const rows = data.slice(4); // Dados começam na linha 5

    return rows
      .filter((row) => row[0] && row[1]) // Vendedor e Funil preenchidos
      .map((row) => ({
        vendedor: row[0],
        funil: row[1],
        vendas: this.parseNumber(row[2]),
        faturamento: this.parseNumber(row[3]),
      }));
  }

  /**
   * Converte data do Excel para formato JS
   */
  parseExcelDate(excelDate) {
    if (typeof excelDate === 'string') {
      return excelDate;
    }
    // Excel date to JS date
    const date = XLSX.SSF.parse_date_code(excelDate);
    return new Date(date.y, date.m - 1, date.d);
  }

  /**
   * Formata descrição do período
   */
  formatPeriodoDescricao(dataInicio, dataFim) {
    const inicio = this.parseExcelDate(dataInicio);
    const fim = this.parseExcelDate(dataFim);

    const formatDate = (date) => {
      if (typeof date === 'string') return date;
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    };

    return `${formatDate(inicio)} a ${formatDate(fim)}`;
  }

  /**
   * Parse de números (trata valores vazios, fórmulas, etc)
   */
  parseNumber(value) {
    if (value === null || value === undefined || value === '') {
      return 0;
    }
    if (typeof value === 'number') {
      return value;
    }
    // Se for string, tentar converter
    const num = parseFloat(String(value).replace(',', '.'));
    return isNaN(num) ? 0 : num;
  }

  /**
   * Calcula conversão percentual
   */
  calculateConversao(vendas, negocios) {
    const v = this.parseNumber(vendas);
    const n = this.parseNumber(negocios);
    if (n === 0) return 0;
    return (v / n) * 100;
  }

  /**
   * Parse de tempo em ligação (1h7m, 11m, 1h34, etc)
   */
  parseTempoLigacao(tempo) {
    if (!tempo) return 0;

    const str = String(tempo).toLowerCase().trim();
    let totalMinutos = 0;

    // Extrair horas
    const horasMatch = str.match(/(\d+)h/);
    if (horasMatch) {
      totalMinutos += parseInt(horasMatch[1]) * 60;
    }

    // Extrair minutos
    const minutosMatch = str.match(/(\d+)m/);
    if (minutosMatch) {
      totalMinutos += parseInt(minutosMatch[1]);
    }

    // Se não tem 'm' mas tem número após 'h', considerar como minutos
    if (!minutosMatch && horasMatch) {
      const restoMatch = str.match(/h(\d+)$/);
      if (restoMatch) {
        totalMinutos += parseInt(restoMatch[1]);
      }
    }

    return totalMinutos;
  }

  /**
   * Formata minutos de volta para string legível
   */
  formatTempoLigacao(minutos) {
    if (minutos === 0) return '0m';

    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;

    if (horas === 0) {
      return `${mins}m`;
    }
    if (mins === 0) {
      return `${horas}h`;
    }
    return `${horas}h${mins}m`;
  }

  /**
   * Extrai dados da aba "Vendas por Produto"
   */
  extractVendasPorProduto(workbook) {
    const sheetName = 'Vendas por Produto';
    
    // Verificar se a aba existe (opcional)
    if (!workbook.SheetNames.includes(sheetName)) {
      console.warn(`[ExcelReader] Aba "${sheetName}" não encontrada. Retornando array vazio.`);
      return [];
    }

    const sheet = workbook.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json(sheet);

    console.log(`[ExcelReader] Lendo aba "${sheetName}" - ${rawData.length} registros`);

    // Validar e processar dados
    const vendasPorProduto = rawData.map((row, index) => {
      // Validar colunas obrigatórias
      const vendedor = row['Vendedor'] || row['vendedor'];
      const produto = row['Produto'] || row['produto'];
      const vendas = row['Vendas'] || row['vendas'];
      const faturamento = row['Faturamento (R$)'] || row['Faturamento'] || row['faturamento'];

      if (!vendedor || !produto) {
        console.warn(`[ExcelReader] Linha ${index + 2} inválida: vendedor ou produto ausente`);
        return null;
      }

      return {
        vendedor: String(vendedor).trim(),
        produto: String(produto).trim(),
        vendas: this.parseNumber(vendas),
        faturamento: this.parseNumber(faturamento),
      };
    }).filter(item => item !== null); // Remover linhas inválidas

    console.log(`[ExcelReader] ${vendasPorProduto.length} registros válidos processados`);
    return vendasPorProduto;
  }
}

export default new ExcelReader();

