import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { path: '/', icon: '🏠', label: 'Menu Geral' },
    { path: '/detalhes-funil', icon: '🎯', label: 'Detalhes por Funil' },
    { path: '/crm-intranet', icon: '⚖️', label: 'CRM x Intranet' },
    { path: '/resultados-gerais', icon: '📊', label: 'Resultados Gerais' },
    { path: '/comparacoes-tempo', icon: '📈', label: 'Comparações no Tempo' },
    { path: '/insights', icon: '💡', label: 'Insights' },
  ];

  return (
    <aside className="sidebar">
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
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

