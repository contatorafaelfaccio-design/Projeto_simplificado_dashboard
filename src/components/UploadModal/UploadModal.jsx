import React, { useState, useRef } from 'react';
import { useData } from '../../contexts/DataContext';
import './UploadModal.css';

const UploadModal = ({ isOpen, onClose }) => {
  const { loadExcelFile, loading } = useData();
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    setUploadStatus({ type: 'loading', message: 'Processando planilha...' });

    const result = await loadExcelFile(file);

    if (result.success) {
      setUploadStatus({
        type: 'success',
        message: 'Dados carregados com sucesso!',
      });
      setTimeout(() => {
        onClose();
        setUploadStatus(null);
      }, 1500);
    } else {
      setUploadStatus({
        type: 'error',
        message: result.error || 'Erro ao processar planilha',
      });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Atualizar Dados do Dashboard</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {!uploadStatus && (
            <>
              <div
                className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="upload-icon">📊</div>
                <h3>Arraste o arquivo Excel aqui</h3>
                <p>ou</p>
                <button className="btn-select-file" onClick={handleButtonClick}>
                  Selecionar Arquivo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="upload-info">
                <h4>Formato da Planilha:</h4>
                <ul>
                  <li>Arquivo Excel (.xlsx)</li>
                  <li>Aba: "Dados CRM - Semana Atual"</li>
                  <li>Aba: "Histórico Semanal"</li>
                  <li>Aba: "Dados Intranet"</li>
                </ul>
              </div>
            </>
          )}

          {uploadStatus && (
            <div className={`upload-status ${uploadStatus.type}`}>
              {uploadStatus.type === 'loading' && (
                <div className="spinner"></div>
              )}
              {uploadStatus.type === 'success' && <div className="icon-success">✓</div>}
              {uploadStatus.type === 'error' && <div className="icon-error">✕</div>}
              <p>{uploadStatus.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;

