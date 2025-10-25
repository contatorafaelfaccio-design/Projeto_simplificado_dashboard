import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isVisible }) => {
  const menuItems = [
    { path: '/', label: 'Menu Geral' },
    { path: '/detalhes-funil', label: 'Detalhes por Funil' },
    { path: '/crm-intranet', label: 'CRM x Intranet' },
    { path: '/resultados-gerais', label: 'Resultados Gerais' },
    { path: '/comparacoes-tempo', label: 'Comparações no Tempo' },
    { path: '/vendas-produto', label: 'Vendas por Produto' },
    { path: '/insights', label: 'Insights' },
  ];

  return (
    <aside className={`sidebar ${!isVisible ? 'hidden' : ''}`}>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'active' : ''}`
            }
            end={item.path === '/'}
          >
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

