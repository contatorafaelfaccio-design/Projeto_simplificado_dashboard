import React, { createContext, useContext, useState, useEffect } from 'react';
import ExcelReader from '../services/ExcelReader';
import DataProcessor from '../services/DataProcessor';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [rawData, setRawData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const savedData = localStorage.getItem('dashboardData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setRawData(data);
        const processed = DataProcessor.processData(data);
        setProcessedData(processed);
      } catch (err) {
        console.error('Erro ao carregar dados salvos:', err);
      }
    }
  }, []);

  /**
   * Processa arquivo Excel
   */
  const loadExcelFile = async (file) => {
    console.log('[DataContext] Iniciando upload...', file.name);
    setLoading(true);
    setError(null);

    try {
      // Validar tipo de arquivo
      if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        throw new Error('Arquivo deve ser do tipo Excel (.xlsx ou .xls)');
      }

      // Ler arquivo
      console.log('[DataContext] Chamando ExcelReader...');
      const data = await ExcelReader.readFile(file);
      console.log('[DataContext] Dados lidos:', data);
      setRawData(data);

      // Processar dados
      console.log('[DataContext] Chamando DataProcessor...');
      const processed = DataProcessor.processData(data);
      console.log('[DataContext] Dados processados:', processed);
      
      // 🧪 TESTE: Verificar vendasPorProduto
      if (processed.vendasPorProduto) {
        console.log('✅ [TESTE] vendasPorProduto disponível!');
        console.log('📊 [TESTE] Vendedores:', Object.keys(processed.vendasPorProduto.porVendedor));
        console.log('📊 [TESTE] Total de vendas:', processed.vendasPorProduto.totais.vendas);
        console.log('📊 [TESTE] Total de faturamento:', processed.vendasPorProduto.totais.faturamento);
      } else {
        console.warn('⚠️ [TESTE] vendasPorProduto NÃO disponível!');
      }
      setProcessedData(processed);

      // Salvar no localStorage
      localStorage.setItem('dashboardData', JSON.stringify(data));

      setLoading(false);
      return { success: true, data: processed };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  /**
   * Limpa dados
   */
  const clearData = () => {
    setRawData(null);
    setProcessedData(null);
    setError(null);
    localStorage.removeItem('dashboardData');
  };

  /**
   * Verifica se há dados carregados
   */
  const hasData = () => {
    return processedData !== null;
  };

  const value = {
    rawData,
    processedData,
    loading,
    error,
    loadExcelFile,
    clearData,
    hasData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

