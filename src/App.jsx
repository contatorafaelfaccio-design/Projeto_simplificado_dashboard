import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MenuGeral from './pages/MenuGeral/MenuGeral';
import DetalhesPorFunil from './pages/DetalhesPorFunil/DetalhesPorFunil';
import CRMvsIntranet from './pages/CRMvsIntranet/CRMvsIntranet';
import ResultadosGerais from './pages/ResultadosGerais/ResultadosGerais';
import ComparacoesNoTempo from './pages/ComparacoesNoTempo/ComparacoesNoTempo';
import Insights from './pages/Insights/Insights';
import './styles/global.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar />
          <main className="app-content">
            <Routes>
              <Route path="/" element={<MenuGeral />} />
              <Route path="/detalhes-funil" element={<DetalhesPorFunil />} />
              <Route path="/crm-intranet" element={<CRMvsIntranet />} />
              <Route path="/resultados-gerais" element={<ResultadosGerais />} />
              <Route path="/comparacoes-tempo" element={<ComparacoesNoTempo />} />
              <Route path="/insights" element={<Insights />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

