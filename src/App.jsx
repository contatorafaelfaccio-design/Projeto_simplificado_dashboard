import React, { useState } from 'react';
import { DataProvider } from './contexts/DataContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MenuGeral from './pages/MenuGeral/MenuGeral';
import DetalhesPorFunil from './pages/DetalhesPorFunil/DetalhesPorFunil';
import CRMvsIntranet from './pages/CRMvsIntranet/CRMvsIntranet';
import ResultadosGerais from './pages/ResultadosGerais/ResultadosGerais';
import ComparacoesNoTempo from './pages/ComparacoesNoTempo/ComparacoesNoTempo';
import Insights from './pages/Insights/Insights';
import VendasPorProduto from './pages/VendasPorProduto/VendasPorProduto';
import './styles/global.css';
import './App.css';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <DataProvider>
      <Router>
        <div className="app">
          <Header onToggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />
          <div className="app-body">
            <Sidebar isVisible={sidebarVisible} />
            <main className={`app-content ${!sidebarVisible ? 'sidebar-hidden' : ''}`}>
              <Routes>
                <Route path="/" element={<MenuGeral />} />
                <Route path="/detalhes-funil" element={<DetalhesPorFunil />} />
                <Route path="/crm-intranet" element={<CRMvsIntranet />} />
                <Route path="/resultados-gerais" element={<ResultadosGerais />} />
                <Route path="/comparacoes-tempo" element={<ComparacoesNoTempo />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/vendas-produto" element={<VendasPorProduto />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;

