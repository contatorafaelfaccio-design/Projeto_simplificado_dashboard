

## Requisitos do Projeto - Dashboard Comercial Nelogica

### Contexto Geral
- Projeto estratégico para desenvolver dashboard interativo e centralizado
- Análise de performance do time comercial educacional da Nelogica
- Substituir processo manual de análise de planilhas
- Plataforma web segura com análises rápidas e comparações históricas

### Requisitos Funcionais

#### 1. Interface e Navegação
- Menus laterais para diferentes análises
- Identidade visual e paleta de cores da Nelogica
- Acesso via link direto (sem necessidade de download)
- Layout com bordas arredondadas e informações centralizadas

#### 2. Menus do Dashboard
1. **Menu Geral**: Informações consolidadas do time
2. **Detalhes por Funil**: Seleção de funis com dados de desempenho do time e vendedores
3. **CRM x Intranet**: Comparação entre as duas fontes de dados
4. **Resultados Gerais**: Visão geral com gráficos e tabelas comparativas
5. **Comparações no Tempo**: Período atual vs 3 períodos anteriores
6. **Insights**: Análises automáticas e sugestões baseadas nos dados

#### 3. Estrutura de Dados
**Métricas principais:**
- Tentativas de ligação
- Mensagens enviadas
- Número de vendas
- Faturamento
- Tempo em ligação (formato: 1h25m)
- Número de negócios/clientes trabalhados
- Taxa de conversão (calculada via fórmulas)

**Dimensões:**
- Por vendedor
- Por funil de vendas
- Por período (semanal)

#### 4. Atualização de Dados
- Dados atualizados semanalmente
- Planilha padrão como fonte de atualização
- Estrutura: 4 períodos (semana atual + 3 anteriores)
- Formato de período: DD/MM/YYYY a DD/MM/YYYY (semana útil)
- Comparações: Semana atual x Semana anterior x Semana -2 x Semana -3

#### 5. CRM x Intranet
- Duas fontes de dados: CRM (principal) e Intranet
- Comparação de: Vendas por produto/funil, Vendedor, Faturamento
- Identificação de diferenças entre as fontes

#### 6. Insights Automáticos
- Geração automática de destaques da semana
- Análises de performance individual e coletiva
- Recomendações baseadas nos dados
- Identificação de tendências e padrões

### Requisitos Não-Funcionais
- Segurança: Plataforma web segura
- Usabilidade: Interface clara para apresentações a superiores
- Performance: Análises rápidas
- Manutenibilidade: Fácil atualização via planilha padrão

### Contexto do Chat "Manus"
- Projeto já em desenvolvimento
- Este projeto é uma versão abreviada/simplificada
- Objetivo: Ter algo pronto para mostrar na reunião semanal
- Preferência por backup de versões anteriores antes de implementar mudanças

### Informações Adicionais do Conhecimento Prévio
- Análise de Performance Semanal: Dropdown para seleção de vendedor
- Comparação de métricas individuais entre semanas
- Variação percentual com cores (verde: positivo, vermelho: negativo)
- Página inicial com título e descrição dos objetivos
- Processamento correto de fórmulas Excel

---



## Arquitetura Técnica - Dashboard Comercial Nelogica

### 1. Stack Tecnológico Recomendado

#### Frontend
**Framework:** React.js com Vite
- Componentização modular para cada menu
- Gerenciamento de estado com Context API ou Zustand
- Roteamento com React Router para navegação entre menus

**Bibliotecas de Visualização:**
- Chart.js ou Recharts para gráficos interativos
- Material-UI (MUI) ou TailwindCSS para componentes UI
- React Table para tabelas de dados complexas

**Processamento de Dados:**
- SheetJS (xlsx) para leitura de planilhas Excel
- Day.js para manipulação de datas e períodos

#### Backend (Opcional - Versão Simplificada)
**Opção 1: Frontend Puro (Recomendado para MVP)**
- Aplicação SPA (Single Page Application)
- Processamento de dados no cliente
- Upload de planilha via input file
- Armazenamento local (localStorage/IndexedDB)

**Opção 2: Backend Completo (Versão Futura)**
- Node.js com Express ou Fastify
- Banco de dados: PostgreSQL ou MongoDB
- API REST para CRUD de dados
- Autenticação JWT para segurança

#### Hospedagem e Deploy
**Recomendação para MVP:**
- Vercel ou Netlify (deploy automático, HTTPS gratuito)
- GitHub Pages (alternativa gratuita)
- Domínio personalizado (opcional)

**Vantagens:**
- Link direto acessível de qualquer lugar
- Deploy em minutos
- Atualizações instantâneas
- SSL/HTTPS automático

### 2. Arquitetura da Aplicação

#### Estrutura de Pastas
```
dashboard-nelogica/
├── public/
│   └── assets/
│       ├── logo-nelogica.png
│       └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Sidebar/
│   │   ├── Header/
│   │   ├── Cards/
│   │   ├── Charts/
│   │   └── Tables/
│   ├── pages/
│   │   ├── MenuGeral/
│   │   ├── DetalhesPorFunil/
│   │   ├── CRMvsIntranet/
│   │   ├── ResultadosGerais/
│   │   ├── ComparacoesNoTempo/
│   │   └── Insights/
│   ├── services/
│   │   ├── dataProcessor.js
│   │   ├── excelReader.js
│   │   └── insightsGenerator.js
│   ├── utils/
│   │   ├── calculations.js
│   │   ├── formatters.js
│   │   └── validators.js
│   ├── styles/
│   │   ├── theme.js (cores Nelogica)
│   │   └── global.css
│   ├── context/
│   │   └── DataContext.js
│   └── App.jsx
├── package.json
└── vite.config.js
```

#### Fluxo de Dados

**1. Upload de Planilha:**
```
Usuário → Input File → ExcelReader → Validação → DataProcessor → Context/State
```

**2. Processamento:**
```
Dados Brutos → Cálculos (conversões, variações %) → Agregações → Insights AI → Estado Global
```

**3. Visualização:**
```
Estado Global → Componentes de Página → Charts/Tables → Renderização
```

### 3. Módulos Principais

#### 3.1 ExcelReader Service
**Responsabilidades:**
- Ler arquivo .xlsx enviado pelo usuário
- Validar estrutura da planilha
- Extrair dados de múltiplas abas (se necessário)
- Converter para formato JSON padronizado

**Tecnologias:** SheetJS (xlsx)

#### 3.2 DataProcessor Service
**Responsabilidades:**
- Processar fórmulas Excel (taxas de conversão)
- Calcular variações percentuais entre períodos
- Agregar dados por vendedor, funil, período
- Preparar dados para visualização

**Funções principais:**
- `calculateConversionRate()`
- `calculatePercentageChange()`
- `aggregateByFunnel()`
- `aggregateBySeller()`
- `comparePeriodsData()`

#### 3.3 InsightsGenerator Service
**Responsabilidades:**
- Analisar dados processados
- Identificar tendências (crescimento, queda)
- Detectar outliers (melhores e piores performances)
- Gerar recomendações automáticas
- Integração com API OpenAI (opcional) para insights avançados

**Lógica de Insights:**
- Top performers da semana
- Maiores variações (positivas e negativas)
- Funis com melhor/pior conversão
- Alertas de discrepância CRM vs Intranet
- Sugestões de ações baseadas em padrões

#### 3.4 Componentes de Visualização

**Cards de Métricas:**
- Valor atual
- Variação percentual vs período anterior
- Indicador visual (cor verde/vermelho)
- Ícone representativo

**Gráficos:**
- Linha: Evolução temporal (4 semanas)
- Barras: Comparação entre vendedores
- Pizza: Distribuição por funil
- Barras agrupadas: CRM vs Intranet

**Tabelas:**
- Ordenação por coluna
- Filtros por vendedor/funil
- Destaque de valores extremos
- Export para CSV (opcional)

### 4. Gerenciamento de Estado

#### Context API Structure
```javascript
DataContext:
  - currentPeriod: Object
  - previousPeriods: Array[3]
  - sellers: Array
  - funnels: Array
  - crmData: Object
  - intranetData: Object
  - insights: Array
  - selectedFunnel: String
  - selectedSeller: String
```

#### Ações:
- `uploadData(file)`
- `selectFunnel(funnelId)`
- `selectSeller(sellerId)`
- `refreshInsights()`
- `exportData(format)`

### 5. Segurança e Performance

#### Segurança:
- Validação de tipo de arquivo (apenas .xlsx)
- Sanitização de dados de entrada
- Limite de tamanho de arquivo (5MB)
- Processamento client-side (dados não saem do navegador na versão MVP)

#### Performance:
- Lazy loading de componentes (React.lazy)
- Memoização de cálculos pesados (useMemo)
- Virtual scrolling para tabelas grandes
- Debounce em filtros e buscas
- Cache de dados processados

### 6. Responsividade

#### Breakpoints:
- Desktop: > 1024px (layout completo)
- Tablet: 768px - 1024px (sidebar colapsável)
- Mobile: < 768px (menu hambúrguer)

#### Adaptações:
- Gráficos responsivos (aspect ratio dinâmico)
- Tabelas com scroll horizontal em mobile
- Cards empilhados verticalmente em telas pequenas

### 7. Integração com IA (Insights Automáticos)

#### Opção 1: Regras Baseadas em Lógica
- Algoritmos pré-definidos para identificar padrões
- Sem custo adicional
- Insights mais previsíveis

#### Opção 2: Integração com LLM (OpenAI/Gemini)
- Análises mais sofisticadas e contextualizadas
- Geração de texto natural para insights
- Requer API key e custos por uso
- Implementação via variável de ambiente

**Fluxo com IA:**
```
Dados Processados → Prompt Engineering → API LLM → Parse Response → Exibição
```

### 8. Atualização de Dados

#### Processo Semanal:
1. Usuário acessa dashboard
2. Clica em "Atualizar Dados" (botão no header)
3. Faz upload da planilha semanal
4. Sistema valida estrutura
5. Processa e substitui dados
6. Regenera insights automaticamente
7. Exibe confirmação de sucesso

#### Persistência:
- **Versão MVP:** localStorage (dados persistem no navegador)
- **Versão Futura:** Backend com banco de dados

#### Histórico:
- Manter últimas 4 semanas sempre
- Opção de exportar histórico completo
- Backup automático antes de atualizar

### 9. Cronograma de Desenvolvimento Estimado

#### Fase 1: Setup e Estrutura (2-3 dias)
- Configuração do projeto (Vite + React)
- Estrutura de pastas e componentes base
- Tema e identidade visual Nelogica
- Sidebar e navegação

#### Fase 2: Processamento de Dados (2-3 dias)
- ExcelReader service
- DataProcessor service
- Validações e tratamento de erros
- Testes com planilha de exemplo

#### Fase 3: Menus Principais (4-5 dias)
- Menu Geral (1 dia)
- Detalhes por Funil (1 dia)
- Resultados Gerais (1 dia)
- Comparações no Tempo (1 dia)
- CRM x Intranet (1 dia)

#### Fase 4: Insights e Refinamentos (2 dias)
- InsightsGenerator service
- Menu de Insights
- Ajustes de UX/UI
- Testes de integração

#### Fase 5: Deploy e Testes Finais (1 dia)
- Deploy em Vercel/Netlify
- Testes em diferentes dispositivos
- Ajustes finais
- Documentação de uso

**Total Estimado: 11-14 dias úteis**

### 10. Tecnologias Alternativas

#### Opção Low-Code:
- **Streamlit (Python):** Dashboard rápido, menos customizável
- **Dash (Plotly):** Focado em visualizações científicas
- **Retool:** Plataforma low-code, requer assinatura

#### Opção Excel/Power BI:
- Power BI Embedded para web
- Maior curva de aprendizado
- Licenciamento Microsoft necessário

**Recomendação:** Manter stack React + Vite pela flexibilidade, performance e facilidade de deploy gratuito.

---





## Identidade Visual Nelogica

### Informações Coletadas

#### Fonte
- Behance - Projeto de Branding da Nelogica por StudioBah (2017)
- URL: https://www.behance.net/gallery/64685663/Nelogica?locale=en_US

#### Paleta de Cores Identificada

**Cores Principais:**

1. **Verde (Pantone 375 C)**
   - Verde vibrante, característico da marca
   - Usado no logotipo e elementos gráficos
   - Representa crescimento, prosperidade e tecnologia

2. **Azul Ciano (Pantone Process Cyan C)**
   - Azul vibrante/ciano
   - Usado no logotipo e elementos gráficos
   - Representa tecnologia, confiança e mercado financeiro

3. **Cinza Escuro/Grafite**
   - Usado em textos e elementos secundários
   - Representa solidez e profissionalismo

4. **Rosa Claro**
   - Usado como cor de fundo em algumas aplicações
   - Tom suave para contraste

5. **Azul Claro**
   - Usado como cor de fundo alternativa
   - Tom suave para contraste

### Características do Logotipo

**Elementos visuais:**
- Símbolo gráfico com duas formas geométricas angulares
- Uma forma verde e uma forma azul ciano
- Formas que remetem a gráficos ascendentes/crescimento
- Tipografia moderna e clean
- Nome "Nelogica" em preto com símbolo ® registrado

**Estilo:**
- Minimalista e moderno
- Formas geométricas angulares
- Linhas diagonais que sugerem movimento e crescimento
- Design clean e profissional

### Aplicações Visuais

**Fundos:**
- Fundo rosa claro para contraste com logo em preto
- Fundo azul claro como alternativa
- Fundo branco para aplicações principais

**Grafismos:**
- Linhas diagonais paralelas
- Padrões geométricos angulares
- Elementos que remetem a gráficos de mercado financeiro

### Tipografia
- Tipografia moderna e sans-serif
- Refinamento tipográfico mencionado no projeto de redesign
- Foco em legibilidade e profissionalismo

### Contexto da Marca
- Empresa de tecnologia para mercado financeiro
- Desenvolvimento de aplicações avançadas
- Foco em informação e análise técnica
- Público: investidores, traders e profissionais do mercado financeiro

### Recomendações para o Dashboard

#### Paleta de Cores Sugerida

**Cores Primárias:**
- Verde Nelogica: #8DC63F (aproximação do Pantone 375 C)
- Azul Ciano Nelogica: #00A9E0 (aproximação do Pantone Process Cyan C)
- Cinza Escuro: #2C3E50 ou #34495E

**Cores Secundárias:**
- Branco: #FFFFFF (fundos principais)
- Cinza Claro: #ECF0F1 (fundos secundários)
- Cinza Médio: #95A5A6 (textos secundários)

**Cores de Status:**
- Verde Positivo: #27AE60 (variações positivas)
- Vermelho Negativo: #E74C3C (variações negativas)
- Amarelo Alerta: #F39C12 (alertas e avisos)
- Azul Info: #3498DB (informações)

#### Aplicação no Dashboard

**Header/Navbar:**
- Fundo: Cinza Escuro (#2C3E50)
- Logo Nelogica no canto superior esquerdo
- Texto: Branco

**Sidebar:**
- Fundo: Branco ou Cinza Claro (#F8F9FA)
- Itens de menu: Cinza Escuro
- Item ativo: Verde Nelogica com ícone Azul Ciano
- Hover: Fundo verde/azul suave

**Cards de Métricas:**
- Fundo: Branco
- Bordas: Cinza Claro
- Bordas arredondadas (border-radius: 8-12px)
- Sombra suave (box-shadow)
- Ícones: Verde ou Azul Ciano Nelogica

**Gráficos:**
- Linha principal: Azul Ciano Nelogica
- Linha secundária: Verde Nelogica
- Área de preenchimento: Gradiente suave das cores principais
- Grid: Cinza Claro

**Botões:**
- Primário: Verde Nelogica (#8DC63F)
- Secundário: Azul Ciano Nelogica (#00A9E0)
- Hover: Tom mais escuro (darken 10%)

**Tipografia:**
- Fonte principal: Inter, Roboto ou Open Sans
- Títulos: Bold, Cinza Escuro
- Textos: Regular, Cinza Médio
- Números/Métricas: Bold, tamanho maior

#### Elementos Gráficos

**Ícones:**
- Estilo: Line icons ou filled icons modernos
- Cores: Verde ou Azul Ciano Nelogica
- Biblioteca sugerida: Lucide Icons, Heroicons ou Feather Icons

**Grafismos de Fundo (opcional):**
- Linhas diagonais sutis em cinza claro
- Padrões geométricos discretos
- Não devem interferir na legibilidade

**Indicadores de Variação:**
- Seta para cima (verde): ↑ ou ▲
- Seta para baixo (vermelho): ↓ ou ▼
- Percentual com cor correspondente

#### Consistência Visual

**Espaçamentos:**
- Padding interno dos cards: 20-24px
- Margem entre cards: 16-20px
- Espaçamento entre seções: 32-40px

**Bordas:**
- Border-radius: 8-12px (cards e botões)
- Border-width: 1px (linhas divisórias)
- Border-color: #E0E0E0 (cinza claro)

**Sombras:**
- Cards: box-shadow: 0 2px 8px rgba(0,0,0,0.08)
- Hover: box-shadow: 0 4px 12px rgba(0,0,0,0.12)
- Modais: box-shadow: 0 8px 24px rgba(0,0,0,0.15)

---



## Estrutura de Dados e Planilha de Atualização

### 1. Modelo de Dados

#### 1.1 Entidades Principais

##### Período
```javascript
{
  id: string,
  dataInicio: Date, // formato: DD/MM/YYYY
  dataFim: Date,    // formato: DD/MM/YYYY
  descricao: string, // ex: "Semana 1 - Out/2025"
  tipo: "atual" | "anterior_1" | "anterior_2" | "anterior_3"
}
```

##### Vendedor
```javascript
{
  id: string,
  nome: string,
  email: string,
  ativo: boolean
}
```

##### Funil
```javascript
{
  id: string,
  nome: string,
  descricao: string,
  ordem: number
}
```

##### Métrica por Vendedor/Funil/Período
```javascript
{
  periodoId: string,
  vendedorId: string,
  funilId: string,
  tentativasLigacao: number,
  mensagensEnviadas: number,
  numeroVendas: number,
  faturamento: number,
  tempoLigacao: string, // formato: "1h25m"
  tempoLigacaoMinutos: number, // calculado
  negociosTrabalhados: number,
  taxaConversao: number // calculado: (numeroVendas / negociosTrabalhados) * 100
}
```

##### Dados CRM vs Intranet
```javascript
{
  periodoId: string,
  vendedorId: string,
  funilId: string,
  fonte: "CRM" | "Intranet",
  numeroVendas: number,
  faturamento: number,
  diferenca: number, // calculado
  percentualDiferenca: number // calculado
}
```

### 2. Estrutura da Planilha Excel

#### 2.1 Formato Geral

**Nome do arquivo:** `Dados_Dashboard_Nelogica_[DATA].xlsx`

**Abas da Planilha:**
1. **Instruções** - Guia de preenchimento
2. **Períodos** - Definição dos 4 períodos
3. **Vendedores** - Cadastro de vendedores
4. **Funis** - Cadastro de funis de venda
5. **Dados_CRM** - Dados principais do CRM (4 períodos)
6. **Dados_Intranet** - Dados da Intranet para comparação
7. **Validação** - Aba oculta com listas de validação

#### 2.2 Aba: Instruções

**Conteúdo:**
- Como preencher a planilha
- Formatos esperados para cada campo
- Exemplos de preenchimento
- Observações importantes
- Contato para suporte

#### 2.3 Aba: Períodos

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| Período | Texto | Identificador do período | Semana Atual |
| Data Início | Data | Primeiro dia do período | 14/10/2025 |
| Data Fim | Data | Último dia do período | 18/10/2025 |
| Tipo | Lista | atual / anterior_1 / anterior_2 / anterior_3 | atual |

**Exemplo de preenchimento:**

| Período | Data Início | Data Fim | Tipo |
|---------|-------------|----------|------|
| Semana Atual | 14/10/2025 | 18/10/2025 | atual |
| Semana Anterior 1 | 07/10/2025 | 11/10/2025 | anterior_1 |
| Semana Anterior 2 | 30/09/2025 | 04/10/2025 | anterior_2 |
| Semana Anterior 3 | 23/09/2025 | 27/09/2025 | anterior_3 |

#### 2.4 Aba: Vendedores

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| ID Vendedor | Texto | Identificador único | VEND001 |
| Nome Completo | Texto | Nome do vendedor | João Silva |
| Email | Email | Email corporativo | joao.silva@nelogica.com.br |
| Ativo | Sim/Não | Status do vendedor | Sim |

**Exemplo de preenchimento:**

| ID Vendedor | Nome Completo | Email | Ativo |
|-------------|---------------|-------|-------|
| VEND001 | João Silva | joao.silva@nelogica.com.br | Sim |
| VEND002 | Maria Santos | maria.santos@nelogica.com.br | Sim |
| VEND003 | Pedro Oliveira | pedro.oliveira@nelogica.com.br | Sim |

#### 2.5 Aba: Funis

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| ID Funil | Texto | Identificador único | FUN001 |
| Nome do Funil | Texto | Nome descritivo | Profit |
| Descrição | Texto | Detalhes do funil | Plataforma de trading profissional |
| Ordem | Número | Ordem de exibição | 1 |

**Exemplo de preenchimento:**

| ID Funil | Nome do Funil | Descrição | Ordem |
|----------|---------------|-----------|-------|
| FUN001 | Profit | Plataforma de trading profissional | 1 |
| FUN002 | Chart | Sistema de análise gráfica | 2 |
| FUN003 | Data | Serviço de dados de mercado | 3 |

#### 2.6 Aba: Dados_CRM (Principal)

**Estrutura:**
- Dados de todos os vendedores
- Todos os funis
- Todos os 4 períodos
- Uma linha por combinação: Vendedor + Funil + Período

| Campo | Tipo | Formato | Obrigatório | Descrição |
|-------|------|---------|-------------|-----------|
| Período | Lista | Dropdown | Sim | Referência à aba Períodos |
| ID Vendedor | Lista | Dropdown | Sim | Referência à aba Vendedores |
| Nome Vendedor | Texto | Auto-preenchido | - | Preenchido automaticamente via VLOOKUP |
| ID Funil | Lista | Dropdown | Sim | Referência à aba Funis |
| Nome Funil | Texto | Auto-preenchido | - | Preenchido automaticamente via VLOOKUP |
| Tentativas de Ligação | Número | Inteiro | Sim | Quantidade de tentativas |
| Mensagens Enviadas | Número | Inteiro | Sim | Quantidade de mensagens |
| Número de Vendas | Número | Inteiro | Sim | Vendas concretizadas |
| Faturamento | Moeda | R$ 0.000,00 | Sim | Valor total faturado |
| Tempo em Ligação | Texto | 0h00m | Sim | Formato: 1h25m |
| Negócios Trabalhados | Número | Inteiro | Sim | Clientes/negócios em pipeline |
| Taxa de Conversão | Percentual | Fórmula | - | =([Número de Vendas]/[Negócios Trabalhados])*100 |

**Exemplo de preenchimento:**

| Período | ID Vendedor | Nome Vendedor | ID Funil | Nome Funil | Tentativas Ligação | Mensagens Enviadas | Nº Vendas | Faturamento | Tempo Ligação | Negócios Trabalhados | Taxa Conversão |
|---------|-------------|---------------|----------|------------|-------------------|-------------------|-----------|-------------|---------------|---------------------|----------------|
| Semana Atual | VEND001 | João Silva | FUN001 | Profit | 45 | 30 | 5 | R$ 25.000,00 | 2h30m | 20 | 25% |
| Semana Atual | VEND001 | João Silva | FUN002 | Chart | 30 | 20 | 3 | R$ 12.000,00 | 1h45m | 15 | 20% |
| Semana Anterior 1 | VEND001 | João Silva | FUN001 | Profit | 40 | 28 | 4 | R$ 20.000,00 | 2h15m | 18 | 22,22% |

#### 2.7 Aba: Dados_Intranet

**Estrutura:**
- Mesma estrutura da aba Dados_CRM
- Campos reduzidos (apenas os que existem na Intranet)
- Usado para comparação CRM vs Intranet

| Campo | Tipo | Formato | Obrigatório | Descrição |
|-------|------|---------|-------------|-----------|
| Período | Lista | Dropdown | Sim | Referência à aba Períodos |
| ID Vendedor | Lista | Dropdown | Sim | Referência à aba Vendedores |
| Nome Vendedor | Texto | Auto-preenchido | - | Preenchido automaticamente |
| ID Funil | Lista | Dropdown | Sim | Referência à aba Funis |
| Nome Funil | Texto | Auto-preenchido | - | Preenchido automaticamente |
| Número de Vendas | Número | Inteiro | Sim | Vendas registradas na Intranet |
| Faturamento | Moeda | R$ 0.000,00 | Sim | Valor total na Intranet |

**Exemplo de preenchimento:**

| Período | ID Vendedor | Nome Vendedor | ID Funil | Nome Funil | Nº Vendas | Faturamento |
|---------|-------------|---------------|----------|------------|-----------|-------------|
| Semana Atual | VEND001 | João Silva | FUN001 | Profit | 5 | R$ 25.000,00 |
| Semana Atual | VEND001 | João Silva | FUN002 | Chart | 4 | R$ 13.500,00 |

#### 2.8 Aba: Validação (Oculta)

**Conteúdo:**
- Listas de valores válidos para dropdowns
- Fórmulas auxiliares
- Tabelas de referência
- Não deve ser editada pelo usuário

### 3. Validações e Regras de Negócio

#### 3.1 Validações de Entrada

**Período:**
- Data Início deve ser anterior à Data Fim
- Períodos não podem se sobrepor
- Deve haver exatamente 4 períodos (atual + 3 anteriores)

**Vendedores:**
- ID único e não vazio
- Email válido (formato)
- Nome não vazio

**Funis:**
- ID único e não vazio
- Nome não vazio
- Ordem única

**Dados CRM:**
- Todos os campos numéricos >= 0
- Faturamento >= 0
- Tempo em ligação no formato correto (0h00m)
- Taxa de conversão calculada automaticamente
- Não permitir valores negativos

**Dados Intranet:**
- Mesmas validações dos Dados CRM
- Campos obrigatórios: apenas Vendas e Faturamento

#### 3.2 Cálculos Automáticos

**Taxa de Conversão:**
```excel
=SE([@[Negócios Trabalhados]]=0; 0; ([@[Número de Vendas]]/[@[Negócios Trabalhados]])*100)
```

**Tempo em Ligação (conversão para minutos):**
```javascript
// No processamento JavaScript
function parseTempoLigacao(tempo) {
  const regex = /(\d+)h(\d+)m/;
  const match = tempo.match(regex);
  if (match) {
    const horas = parseInt(match[1]);
    const minutos = parseInt(match[2]);
    return horas * 60 + minutos;
  }
  return 0;
}
```

**Variação Percentual entre Períodos:**
```javascript
function calcularVariacao(valorAtual, valorAnterior) {
  if (valorAnterior === 0) return valorAtual > 0 ? 100 : 0;
  return ((valorAtual - valorAnterior) / valorAnterior) * 100;
}
```

**Diferença CRM vs Intranet:**
```javascript
function calcularDiferenca(valorCRM, valorIntranet) {
  return valorCRM - valorIntranet;
}

function calcularPercentualDiferenca(valorCRM, valorIntranet) {
  if (valorIntranet === 0) return valorCRM > 0 ? 100 : 0;
  return ((valorCRM - valorIntranet) / valorIntranet) * 100;
}
```

#### 3.3 Formatação Condicional

**Na planilha Excel:**

1. **Taxa de Conversão:**
   - Verde: >= 25%
   - Amarelo: 15% - 24%
   - Vermelho: < 15%

2. **Variação de Vendas:**
   - Verde: crescimento > 0%
   - Vermelho: queda < 0%
   - Cinza: sem variação (0%)

3. **Diferença CRM vs Intranet:**
   - Verde: diferença = 0
   - Amarelo: diferença entre -5% e +5%
   - Vermelho: diferença > 5% ou < -5%

### 4. Processamento dos Dados

#### 4.1 Fluxo de Processamento

**Etapa 1: Leitura da Planilha**
```javascript
// Usar biblioteca SheetJS (xlsx)
import * as XLSX from 'xlsx';

function lerPlanilha(file) {
  const workbook = XLSX.read(file, { type: 'binary' });
  
  const periodos = XLSX.utils.sheet_to_json(workbook.Sheets['Períodos']);
  const vendedores = XLSX.utils.sheet_to_json(workbook.Sheets['Vendedores']);
  const funis = XLSX.utils.sheet_to_json(workbook.Sheets['Funis']);
  const dadosCRM = XLSX.utils.sheet_to_json(workbook.Sheets['Dados_CRM']);
  const dadosIntranet = XLSX.utils.sheet_to_json(workbook.Sheets['Dados_Intranet']);
  
  return { periodos, vendedores, funis, dadosCRM, dadosIntranet };
}
```

**Etapa 2: Validação dos Dados**
```javascript
function validarDados(dados) {
  const erros = [];
  
  // Validar períodos
  if (dados.periodos.length !== 4) {
    erros.push('Deve haver exatamente 4 períodos');
  }
  
  // Validar vendedores
  const idsVendedores = dados.vendedores.map(v => v['ID Vendedor']);
  if (new Set(idsVendedores).size !== idsVendedores.length) {
    erros.push('IDs de vendedores duplicados');
  }
  
  // Validar dados CRM
  dados.dadosCRM.forEach((linha, index) => {
    if (linha['Número de Vendas'] < 0) {
      erros.push(`Linha ${index + 2}: Número de vendas não pode ser negativo`);
    }
    // Mais validações...
  });
  
  return { valido: erros.length === 0, erros };
}
```

**Etapa 3: Transformação dos Dados**
```javascript
function transformarDados(dadosBrutos) {
  // Converter tempo de ligação para minutos
  dadosBrutos.dadosCRM = dadosBrutos.dadosCRM.map(linha => ({
    ...linha,
    tempoLigacaoMinutos: parseTempoLigacao(linha['Tempo em Ligação'])
  }));
  
  // Calcular agregações
  const agregadoPorPeriodo = agruparPorPeriodo(dadosBrutos.dadosCRM);
  const agregadoPorVendedor = agruparPorVendedor(dadosBrutos.dadosCRM);
  const agregadoPorFunil = agruparPorFunil(dadosBrutos.dadosCRM);
  
  return {
    ...dadosBrutos,
    agregadoPorPeriodo,
    agregadoPorVendedor,
    agregadoPorFunil
  };
}
```

**Etapa 4: Cálculo de Métricas Derivadas**
```javascript
function calcularMetricasDerivadas(dados) {
  // Variações entre períodos
  const variacoes = calcularVariacoesPeriodos(dados);
  
  // Comparação CRM vs Intranet
  const comparacaoCRMIntranet = compararCRMIntranet(
    dados.dadosCRM,
    dados.dadosIntranet
  );
  
  // Rankings
  const rankings = {
    topVendedores: calcularTopVendedores(dados),
    topFunis: calcularTopFunis(dados),
    maioresVariacoes: calcularMaioresVariacoes(dados)
  };
  
  return { variacoes, comparacaoCRMIntranet, rankings };
}
```

**Etapa 5: Geração de Insights**
```javascript
async function gerarInsights(dados, metricas) {
  const insights = [];
  
  // Insights baseados em regras
  insights.push(...gerarInsightsRegras(dados, metricas));
  
  // Insights com IA (opcional)
  if (process.env.OPENAI_API_KEY) {
    const insightsIA = await gerarInsightsComIA(dados, metricas);
    insights.push(...insightsIA);
  }
  
  return insights;
}
```

#### 4.2 Funções de Agregação

**Agrupar por Período:**
```javascript
function agruparPorPeriodo(dadosCRM) {
  const grupos = {};
  
  dadosCRM.forEach(linha => {
    const periodo = linha.Período;
    if (!grupos[periodo]) {
      grupos[periodo] = {
        tentativasLigacao: 0,
        mensagensEnviadas: 0,
        numeroVendas: 0,
        faturamento: 0,
        tempoLigacaoMinutos: 0,
        negociosTrabalhados: 0
      };
    }
    
    grupos[periodo].tentativasLigacao += linha['Tentativas de Ligação'];
    grupos[periodo].mensagensEnviadas += linha['Mensagens Enviadas'];
    grupos[periodo].numeroVendas += linha['Número de Vendas'];
    grupos[periodo].faturamento += linha.Faturamento;
    grupos[periodo].tempoLigacaoMinutos += linha.tempoLigacaoMinutos;
    grupos[periodo].negociosTrabalhados += linha['Negócios Trabalhados'];
  });
  
  // Calcular taxa de conversão agregada
  Object.keys(grupos).forEach(periodo => {
    const grupo = grupos[periodo];
    grupo.taxaConversao = grupo.negociosTrabalhados > 0
      ? (grupo.numeroVendas / grupo.negociosTrabalhados) * 100
      : 0;
  });
  
  return grupos;
}
```

**Agrupar por Vendedor:**
```javascript
function agruparPorVendedor(dadosCRM) {
  // Similar à função acima, mas agrupando por vendedor
  // Retorna métricas totais de cada vendedor no período atual
}
```

**Agrupar por Funil:**
```javascript
function agruparPorFunil(dadosCRM) {
  // Similar à função acima, mas agrupando por funil
  // Retorna métricas totais de cada funil no período atual
}
```

### 5. Exemplo de Planilha Completa

#### Resumo da Estrutura

**Abas:**
1. ✅ Instruções
2. ✅ Períodos (4 linhas)
3. ✅ Vendedores (N linhas)
4. ✅ Funis (M linhas)
5. ✅ Dados_CRM (N × M × 4 linhas)
6. ✅ Dados_Intranet (N × M × 4 linhas)
7. ✅ Validação (oculta)

**Exemplo com 3 vendedores e 3 funis:**
- Períodos: 4 linhas
- Vendedores: 3 linhas
- Funis: 3 linhas
- Dados_CRM: 36 linhas (3 × 3 × 4)
- Dados_Intranet: 36 linhas (3 × 3 × 4)

**Total de linhas de dados:** ~82 linhas

### 6. Template de Planilha

#### Recursos Necessários

**Formatação:**
- Cabeçalhos com fundo verde/azul Nelogica
- Texto branco nos cabeçalhos
- Bordas em todas as células
- Formatação condicional configurada
- Proteção de células com fórmulas

**Validação de Dados:**
- Dropdowns para Período, ID Vendedor, ID Funil
- Validação de formato para Email
- Validação de formato para Tempo em Ligação (regex: \d+h\d+m)
- Validação de valores numéricos (>= 0)

**Fórmulas:**
- VLOOKUP para auto-preencher nomes
- Fórmula de Taxa de Conversão
- Formatação condicional baseada em valores

**Instruções:**
- Guia passo a passo na aba Instruções
- Exemplos de preenchimento
- Dicas e observações
- Contato para suporte

### 7. Considerações de Implementação

#### 7.1 Biblioteca de Processamento

**SheetJS (xlsx):**
- Leitura e escrita de arquivos Excel
- Suporte a fórmulas
- Processamento no cliente (browser) ou servidor

**Instalação:**
```bash
npm install xlsx
```

**Uso básico:**
```javascript
import * as XLSX from 'xlsx';

// Ler arquivo
const file = event.target.files[0];
const reader = new FileReader();
reader.onload = (e) => {
  const data = new Uint8Array(e.target.result);
  const workbook = XLSX.read(data, { type: 'array' });
  // Processar workbook...
};
reader.readAsArrayBuffer(file);
```

#### 7.2 Persistência de Dados

**Opção 1: LocalStorage (MVP)**
```javascript
// Salvar dados processados
localStorage.setItem('dashboardData', JSON.stringify(dados));

// Recuperar dados
const dados = JSON.parse(localStorage.getItem('dashboardData'));
```

**Opção 2: IndexedDB (Melhor para grandes volumes)**
```javascript
// Usar biblioteca Dexie.js para facilitar
import Dexie from 'dexie';

const db = new Dexie('DashboardNelogica');
db.version(1).stores({
  periodos: '++id, tipo',
  vendedores: 'id, nome',
  funis: 'id, nome',
  metricas: '++id, periodoId, vendedorId, funilId'
});
```

**Opção 3: Backend + Banco de Dados (Versão Futura)**
- API REST para upload e processamento
- PostgreSQL para armazenamento
- Histórico completo de uploads
- Auditoria de alterações

#### 7.3 Tratamento de Erros

**Erros Comuns:**
1. Arquivo não é Excel (.xlsx)
2. Abas obrigatórias ausentes
3. Colunas obrigatórias ausentes
4. Valores inválidos (negativos, formato incorreto)
5. Referências inválidas (vendedor/funil não cadastrado)
6. Períodos duplicados ou sobrepostos

**Estratégia:**
- Validar estrutura antes de processar
- Mostrar mensagens de erro claras e específicas
- Permitir download de log de erros
- Não processar se houver erros críticos
- Alertar sobre avisos não-críticos

#### 7.4 Performance

**Otimizações:**
- Processar dados em Web Worker (não bloquear UI)
- Cache de dados processados
- Lazy loading de gráficos
- Virtualização de tabelas grandes
- Debounce em filtros e buscas

**Limites Recomendados:**
- Máximo 50 vendedores
- Máximo 20 funis
- Máximo 4.000 linhas de dados (50 × 20 × 4)
- Arquivo máximo: 5 MB

---



## Especificações Detalhadas dos Menus do Dashboard

### Estrutura Geral do Dashboard

#### Layout Principal

**Componentes fixos:**
- **Header Superior:** Logo Nelogica, título do dashboard, botão "Atualizar Dados", período atual
- **Sidebar Esquerda:** Menu de navegação com 6 itens
- **Área de Conteúdo:** Conteúdo dinâmico de acordo com o menu selecionado
- **Footer (opcional):** Última atualização, versão, créditos

#### Navegação (Sidebar)

**Estrutura do menu:**
1. 🏠 Menu Geral
2. 🎯 Detalhes por Funil
3. 🔄 CRM x Intranet
4. 📊 Resultados Gerais
5. 📈 Comparações no Tempo
6. 💡 Insights

**Comportamento:**
- Item ativo destacado com cor verde/azul Nelogica
- Hover com fundo suave
- Ícones à esquerda do texto
- Responsivo (colapsa em mobile)

---

## Menu 1: Menu Geral

### Objetivo
Apresentar uma visão consolidada e de alto nível do desempenho do time comercial no período atual, com comparação rápida com o período anterior.

### Estrutura da Página

#### 1.1 Header da Página
```
Título: "Visão Geral do Time"
Subtítulo: "Período: [Data Início] a [Data Fim]"
```

#### 1.2 Cards de Métricas Principais (KPIs)

**Layout:** Grid de 2×3 (6 cards)

**Card 1: Tentativas de Ligação**
- Valor atual (total do time)
- Variação percentual vs período anterior
- Ícone: 📞
- Cor de destaque: Azul Nelogica

**Card 2: Mensagens Enviadas**
- Valor atual (total do time)
- Variação percentual vs período anterior
- Ícone: 💬
- Cor de destaque: Verde Nelogica

**Card 3: Número de Vendas**
- Valor atual (total do time)
- Variação percentual vs período anterior
- Ícone: ✅
- Cor de destaque: Verde positivo

**Card 4: Faturamento**
- Valor atual formatado (R$ 0.000,00)
- Variação percentual vs período anterior
- Ícone: 💰
- Cor de destaque: Verde Nelogica

**Card 5: Tempo em Ligação**
- Valor atual formatado (Xh Ym)
- Variação percentual vs período anterior
- Ícone: ⏱️
- Cor de destaque: Azul Nelogica

**Card 6: Negócios Trabalhados**
- Valor atual (total do time)
- Variação percentual vs período anterior
- Ícone: 📋
- Cor de destaque: Azul Nelogica

**Estrutura de cada card:**
```html
┌─────────────────────────────┐
│ 📞 Tentativas de Ligação    │
│                             │
│      450                    │
│   ↑ +12.5% vs anterior      │
└─────────────────────────────┘
```

#### 1.3 Seção: Destaques da Semana

**Conteúdo:**
- Lista de 3-5 destaques gerados automaticamente
- Baseado em análise dos dados (maiores variações, recordes, etc.)
- Formato: bullet points com ícones

**Exemplos:**
- 🏆 João Silva alcançou o maior faturamento da semana: R$ 45.000
- 📈 Funil Profit teve crescimento de 25% em vendas
- ⚠️ Tempo médio em ligação caiu 15% - atenção necessária
- 🎯 Taxa de conversão geral subiu para 28%

#### 1.4 Gráfico: Evolução das Vendas (4 semanas)

**Tipo:** Gráfico de linhas
**Eixo X:** Períodos (Semana -3, Semana -2, Semana -1, Semana Atual)
**Eixo Y:** Número de vendas
**Linhas:**
- Linha principal: Total de vendas do time
- Linhas secundárias (opcional): Top 3 vendedores

**Interatividade:**
- Hover mostra valor exato
- Legenda clicável para mostrar/ocultar linhas

#### 1.5 Tabela: Performance por Vendedor (Resumo)

**Colunas:**
1. Nome do Vendedor
2. Vendas (período atual)
3. Faturamento (período atual)
4. Variação de Vendas (%)
5. Taxa de Conversão (%)
6. Status (ícone: 🟢 acima da meta, 🟡 na meta, 🔴 abaixo)

**Funcionalidades:**
- Ordenação por coluna (clique no header)
- Destaque da linha do melhor vendedor
- Link para análise detalhada do vendedor

**Exemplo:**
| Vendedor | Vendas | Faturamento | Variação | Taxa Conv. | Status |
|----------|--------|-------------|----------|------------|--------|
| João Silva | 12 | R$ 60.000 | +15% | 30% | 🟢 |
| Maria Santos | 10 | R$ 50.000 | +5% | 25% | 🟡 |
| Pedro Oliveira | 8 | R$ 40.000 | -10% | 20% | 🔴 |

#### 1.6 Seção: Comparação Rápida de Períodos

**Layout:** Cards horizontais (4 cards lado a lado)

**Conteúdo de cada card:**
- Nome do período (Semana Atual, Semana -1, Semana -2, Semana -3)
- Total de vendas
- Total de faturamento
- Taxa de conversão média

**Objetivo:** Permitir comparação visual rápida entre os 4 períodos

---

## Menu 2: Detalhes por Funil

### Objetivo
Permitir análise aprofundada de um funil específico, mostrando desempenho do time e individual dentro daquele funil.

### Estrutura da Página

#### 2.1 Header da Página
```
Título: "Análise por Funil de Vendas"
Dropdown: Seleção do funil (ex: Profit, Chart, Data)
```

#### 2.2 Seletor de Funil

**Componente:** Dropdown grande e destacado
**Posição:** Topo da página, centralizado
**Comportamento:** Ao selecionar, toda a página atualiza com dados do funil escolhido

#### 2.3 Cards de Métricas do Funil Selecionado

**Layout:** Grid de 2×3 (6 cards)

**Métricas:**
1. Tentativas de Ligação (total do funil)
2. Mensagens Enviadas (total do funil)
3. Número de Vendas (total do funil)
4. Faturamento (total do funil)
5. Tempo em Ligação (total do funil)
6. Taxa de Conversão (média do funil)

**Cada card inclui:**
- Valor atual
- Variação vs período anterior
- Comparação com média geral do time

#### 2.4 Gráfico: Distribuição de Vendas por Vendedor (no funil)

**Tipo:** Gráfico de barras horizontais
**Eixo X:** Número de vendas
**Eixo Y:** Nome dos vendedores
**Cores:** Gradiente de verde (maior) a cinza (menor)

**Interatividade:**
- Hover mostra detalhes (vendas, faturamento, taxa de conversão)
- Clique na barra abre detalhes do vendedor

#### 2.5 Tabela: Performance Individual no Funil

**Colunas:**
1. Vendedor
2. Tentativas de Ligação
3. Mensagens Enviadas
4. Negócios Trabalhados
5. Vendas
6. Faturamento
7. Tempo em Ligação
8. Taxa de Conversão
9. Variação de Vendas (%)

**Funcionalidades:**
- Ordenação por qualquer coluna
- Filtro por nome de vendedor
- Destaque do melhor e pior desempenho
- Export para CSV

**Formatação:**
- Taxa de conversão com cores (verde/amarelo/vermelho)
- Variação com setas e cores
- Faturamento formatado como moeda

#### 2.6 Gráfico: Evolução do Funil (4 semanas)

**Tipo:** Gráfico de linhas + barras combinado
**Eixo X:** Períodos (4 semanas)
**Eixo Y Esquerdo:** Número de vendas (barras)
**Eixo Y Direito:** Faturamento (linha)

**Objetivo:** Mostrar evolução temporal do funil específico

#### 2.7 Seção: Insights do Funil

**Conteúdo:**
- Análise automática do desempenho do funil
- Identificação de padrões (ex: "Funil Profit tem melhor conversão às terças-feiras")
- Sugestões de melhoria específicas para o funil
- Comparação com outros funis

**Formato:** Cards de insight com ícones

---

## Menu 3: CRM x Intranet

### Objetivo
Comparar os dados registrados no CRM com os dados da Intranet, identificando discrepâncias e facilitando a conciliação.

### Estrutura da Página

#### 3.1 Header da Página
```
Título: "Comparação CRM vs Intranet"
Subtítulo: "Identificação de Divergências"
```

#### 3.2 Cards de Resumo de Divergências

**Layout:** 3 cards horizontais

**Card 1: Total de Divergências**
- Número de registros com diferença
- Percentual do total
- Ícone: ⚠️

**Card 2: Diferença em Vendas**
- Total de vendas no CRM
- Total de vendas na Intranet
- Diferença absoluta e percentual
- Ícone: 📊

**Card 3: Diferença em Faturamento**
- Total de faturamento no CRM
- Total de faturamento na Intranet
- Diferença absoluta (R$) e percentual
- Ícone: 💰

#### 3.3 Gráfico: Comparação Visual CRM vs Intranet

**Tipo:** Gráfico de barras agrupadas
**Eixo X:** Funis ou Vendedores (selecionável via toggle)
**Eixo Y:** Número de vendas ou Faturamento (selecionável via toggle)
**Barras:**
- Barra azul: Dados CRM
- Barra verde: Dados Intranet
- Linha vermelha pontilhada: Diferença

**Interatividade:**
- Toggle para alternar entre visualização por Funil ou Vendedor
- Toggle para alternar entre Vendas ou Faturamento
- Hover mostra valores exatos e diferença

#### 3.4 Tabela Detalhada de Divergências

**Colunas:**
1. Vendedor
2. Funil
3. Vendas CRM
4. Vendas Intranet
5. Diferença Vendas (absoluta)
6. Diferença Vendas (%)
7. Faturamento CRM
8. Faturamento Intranet
9. Diferença Faturamento (R$)
10. Diferença Faturamento (%)
11. Status (🟢 OK, 🟡 Atenção, 🔴 Crítico)

**Funcionalidades:**
- Filtro por status (mostrar apenas divergências)
- Filtro por vendedor
- Filtro por funil
- Ordenação por diferença (maior divergência primeiro)
- Export para CSV
- Destaque de linhas com divergência > 5%

**Critérios de Status:**
- 🟢 OK: Diferença = 0% ou < 2%
- 🟡 Atenção: Diferença entre 2% e 5%
- 🔴 Crítico: Diferença > 5%

#### 3.5 Seção: Análise de Divergências

**Conteúdo:**
- Identificação dos vendedores/funis com maiores divergências
- Possíveis causas das divergências (geradas automaticamente)
- Sugestões de ações corretivas
- Histórico de divergências (se disponível)

**Formato:** Cards de alerta com ícones e cores

**Exemplos:**
- 🔴 João Silva - Funil Profit: Divergência de 15% no faturamento
- 🟡 Maria Santos - Funil Chart: 3 vendas não registradas na Intranet
- 💡 Sugestão: Verificar vendas do dia 15/10 - maior volume de divergências

#### 3.6 Botão de Ação

**Componente:** Botão destacado
**Texto:** "Exportar Relatório de Divergências"
**Ação:** Gera arquivo CSV ou PDF com todas as divergências para análise offline

---

## Menu 4: Resultados Gerais

### Objetivo
Fornecer uma visão abrangente dos resultados do time com múltiplos gráficos e tabelas comparativas.

### Estrutura da Página

#### 4.1 Header da Página
```
Título: "Resultados Gerais do Time"
Subtítulo: "Análise Completa de Performance"
```

#### 4.2 Seção: Ranking de Vendedores

**Layout:** Cards de pódio (Top 3) + Tabela completa

**Top 3 (Pódio):**
- 🥇 1º Lugar: Card grande com foto/avatar, nome, vendas, faturamento
- 🥈 2º Lugar: Card médio
- 🥉 3º Lugar: Card médio

**Tabela Completa:**
- Ranking de todos os vendedores
- Colunas: Posição, Nome, Vendas, Faturamento, Taxa de Conversão, Pontuação
- Ordenação por pontuação (métrica composta)

#### 4.3 Gráfico: Distribuição de Faturamento por Funil

**Tipo:** Gráfico de pizza (donut)
**Dados:** Faturamento total de cada funil
**Cores:** Paleta Nelogica (verde, azul, variações)
**Centro:** Faturamento total

**Interatividade:**
- Hover mostra valor e percentual
- Clique na fatia filtra dados do funil

#### 4.4 Gráfico: Comparação de Métricas entre Vendedores

**Tipo:** Gráfico de radar (spider chart)
**Eixos:** 5-6 métricas (Vendas, Faturamento, Tentativas, Mensagens, Tempo, Taxa Conv.)
**Linhas:** Cada vendedor é uma linha
**Cores:** Cores distintas para cada vendedor

**Seletor:** Checkbox para selecionar quais vendedores comparar (máximo 5)

**Objetivo:** Comparação visual multidimensional

#### 4.5 Gráfico: Funil de Conversão Geral

**Tipo:** Gráfico de funil
**Etapas:**
1. Tentativas de Ligação (100%)
2. Mensagens Enviadas (X%)
3. Negócios Trabalhados (Y%)
4. Vendas Realizadas (Z%)

**Cores:** Gradiente de azul (topo) a verde (base)
**Números:** Valor absoluto e percentual em cada etapa

**Objetivo:** Visualizar onde há maior perda no processo comercial

#### 4.6 Tabela: Comparação entre Funis

**Colunas:**
1. Funil
2. Tentativas de Ligação
3. Mensagens Enviadas
4. Negócios Trabalhados
5. Vendas
6. Faturamento
7. Taxa de Conversão
8. Ticket Médio
9. Tempo Médio em Ligação

**Funcionalidades:**
- Ordenação por coluna
- Destaque do melhor funil em cada métrica
- Gráfico sparkline inline (mini gráfico de evolução)

#### 4.7 Gráfico: Matriz de Performance (Vendedor × Funil)

**Tipo:** Heatmap (mapa de calor)
**Eixo X:** Funis
**Eixo Y:** Vendedores
**Cor:** Intensidade baseada em vendas ou faturamento (selecionável)
**Escala:** Verde claro (baixo) a Verde escuro (alto)

**Interatividade:**
- Hover mostra valor exato
- Clique na célula abre detalhes da combinação Vendedor+Funil

**Objetivo:** Identificar rapidamente quais vendedores performam melhor em quais funis

#### 4.8 Seção: Estatísticas Gerais

**Layout:** Grid de mini-cards (4×2)

**Métricas:**
1. Ticket Médio (R$)
2. Taxa de Conversão Média (%)
3. Tempo Médio em Ligação
4. Tentativas por Venda (média)
5. Mensagens por Venda (média)
6. Vendas por Vendedor (média)
7. Faturamento por Vendedor (média)
8. Negócios por Vendedor (média)

---

## Menu 5: Comparações no Tempo

### Objetivo
Analisar a evolução temporal das métricas, comparando o período atual com os 3 períodos anteriores.

### Estrutura da Página

#### 5.1 Header da Página
```
Título: "Análise Temporal de Performance"
Subtítulo: "Evolução das Últimas 4 Semanas"
```

#### 5.2 Seletor de Métrica Principal

**Componente:** Tabs ou Botões de seleção
**Opções:**
- Vendas
- Faturamento
- Tentativas de Ligação
- Mensagens Enviadas
- Taxa de Conversão
- Tempo em Ligação

**Comportamento:** Ao selecionar, todos os gráficos atualizam para a métrica escolhida

#### 5.3 Cards de Comparação Temporal

**Layout:** 4 cards lado a lado (um para cada período)

**Card de cada período:**
- Nome do período (Semana Atual, Semana -1, Semana -2, Semana -3)
- Data do período
- Valor da métrica selecionada
- Variação vs período anterior
- Mini gráfico de tendência

**Destaque:** Card da semana atual com borda colorida

#### 5.4 Gráfico: Evolução Temporal da Métrica Selecionada

**Tipo:** Gráfico de linhas + área
**Eixo X:** Períodos (4 semanas)
**Eixo Y:** Valor da métrica selecionada
**Linha:** Evolução da métrica
**Área:** Preenchimento suave abaixo da linha

**Elementos adicionais:**
- Linha de tendência (regressão linear)
- Marcadores nos pontos
- Anotações em picos ou vales

#### 5.5 Gráfico: Comparação de Todos os Vendedores (4 semanas)

**Tipo:** Gráfico de barras agrupadas
**Eixo X:** Vendedores
**Eixo Y:** Valor da métrica selecionada
**Barras:** 4 barras por vendedor (uma para cada semana)
**Cores:** Gradiente temporal (mais escuro = mais recente)

**Legenda:** Identificação de cada semana

**Objetivo:** Comparar evolução individual de cada vendedor

#### 5.6 Gráfico: Comparação de Todos os Funis (4 semanas)

**Tipo:** Gráfico de linhas múltiplas
**Eixo X:** Períodos (4 semanas)
**Eixo Y:** Valor da métrica selecionada
**Linhas:** Uma linha para cada funil
**Cores:** Cores distintas para cada funil

**Interatividade:**
- Legenda clicável para mostrar/ocultar funis
- Hover mostra valor exato

**Objetivo:** Identificar tendências de cada funil ao longo do tempo

#### 5.7 Tabela: Variações Percentuais Detalhadas

**Estrutura:** Tabela com agrupamento

**Seção 1: Por Vendedor**
| Vendedor | Semana Atual | Variação S-1 | Variação S-2 | Variação S-3 | Tendência |
|----------|--------------|--------------|--------------|--------------|-----------|
| João | 12 vendas | +15% | +8% | +5% | ↗️ Crescente |

**Seção 2: Por Funil**
| Funil | Semana Atual | Variação S-1 | Variação S-2 | Variação S-3 | Tendência |
|-------|--------------|--------------|--------------|--------------|-----------|
| Profit | R$ 60k | +10% | -5% | +12% | ↗️ Crescente |

**Funcionalidades:**
- Ordenação por tendência (crescente/decrescente)
- Filtro por vendedor/funil
- Destaque de maiores variações (positivas e negativas)
- Ícones de tendência (↗️ crescente, ↘️ decrescente, ➡️ estável)

#### 5.8 Seção: Análise de Tendências

**Conteúdo:**
- Identificação de tendências gerais (crescimento, queda, estabilidade)
- Vendedores/funis com crescimento consistente
- Vendedores/funis com queda preocupante
- Sazonalidades identificadas
- Projeção para próxima semana (opcional)

**Formato:** Cards de insight com gráficos mini

#### 5.9 Seletor de Vendedor Individual

**Componente:** Dropdown
**Comportamento:** Ao selecionar, exibe gráfico detalhado da evolução individual

**Gráfico Individual:**
- Tipo: Linhas múltiplas (uma para cada métrica)
- Mostra evolução de todas as métricas do vendedor
- Permite comparação visual entre métricas

---

## Menu 6: Insights

### Objetivo
Apresentar análises automáticas, recomendações e insights gerados por IA ou regras baseadas nos dados.

### Estrutura da Página

#### 6.1 Header da Página
```
Título: "Insights e Recomendações"
Subtítulo: "Análise Inteligente dos Dados"
Ícone: 💡
```

#### 6.2 Seção: Destaques Principais

**Layout:** 3 cards grandes destacados

**Card 1: Melhor Performance**
- Ícone: 🏆
- Título: "Destaque da Semana"
- Conteúdo: Vendedor ou funil com melhor desempenho
- Métricas principais
- Comparação com períodos anteriores

**Card 2: Maior Crescimento**
- Ícone: 📈
- Título: "Maior Evolução"
- Conteúdo: Quem mais cresceu vs período anterior
- Percentual de crescimento
- Métricas impactadas

**Card 3: Ponto de Atenção**
- Ícone: ⚠️
- Título: "Requer Atenção"
- Conteúdo: Vendedor ou funil com queda ou problema
- Métricas afetadas
- Sugestões de ação

#### 6.3 Seção: Insights Automáticos

**Layout:** Lista de cards de insight (6-10 insights)

**Categorias de Insights:**

**1. Performance Individual**
- "João Silva aumentou suas vendas em 25% - maior crescimento do time"
- "Maria Santos mantém taxa de conversão acima de 30% por 3 semanas consecutivas"
- "Pedro Oliveira precisa aumentar tentativas de ligação - abaixo da média do time"

**2. Performance por Funil**
- "Funil Profit representa 45% do faturamento total - principal fonte de receita"
- "Funil Chart teve queda de 15% em vendas - investigar causas"
- "Funil Data tem melhor taxa de conversão (32%) - replicar estratégias"

**3. Padrões Identificados**
- "Time tem melhor performance na terça e quarta-feira"
- "Vendas com mais de 2h de ligação têm taxa de conversão 40% maior"
- "Mensagens enviadas não correlacionam com vendas - revisar estratégia"

**4. Comparações**
- "Faturamento atual é 12% superior à média das últimas 3 semanas"
- "Taxa de conversão geral subiu de 22% para 28% - melhoria consistente"
- "Tempo médio em ligação caiu 20% mas vendas aumentaram - maior eficiência"

**5. Alertas**
- "Divergência de 18% entre CRM e Intranet no Funil Profit - verificar registros"
- "3 vendedores abaixo da meta de vendas - ação necessária"
- "Negócios trabalhados caíram 10% - pipeline precisa ser alimentado"

**Estrutura de cada card de insight:**
```html
┌─────────────────────────────────────────┐
│ 📈 Performance Individual               │
│                                         │
│ João Silva aumentou suas vendas em 25%  │
│ - maior crescimento do time             │
│                                         │
│ [Gráfico mini mostrando evolução]      │
│                                         │
│ Recomendação: Compartilhar estratégias │
│ com o time                              │
└─────────────────────────────────────────┘
```

#### 6.4 Seção: Recomendações de Ações

**Layout:** Cards de ação com checkbox

**Conteúdo:**
- Lista de ações sugeridas baseadas nos dados
- Prioridade (Alta, Média, Baixa)
- Responsável sugerido
- Prazo sugerido
- Checkbox para marcar como "feito" (opcional)

**Exemplos:**
- 🔴 Alta: "Treinar Pedro Oliveira em técnicas de prospecção - taxa de conversão 40% abaixo da média"
- 🟡 Média: "Revisar processo do Funil Chart - queda consistente por 2 semanas"
- 🟢 Baixa: "Documentar estratégias de João Silva para replicação no time"

**Estrutura de cada card de ação:**
```html
┌─────────────────────────────────────────┐
│ ☐ 🔴 Alta Prioridade                    │
│                                         │
│ Treinar Pedro Oliveira em técnicas de  │
│ prospecção                              │
│                                         │
│ Motivo: Taxa de conversão 40% abaixo   │
│ da média do time                        │
│                                         │
│ Responsável: Gestor Comercial          │
│ Prazo: Até 25/10/2025                  │
└─────────────────────────────────────────┘
```

#### 6.5 Gráfico: Correlações Identificadas

**Tipo:** Gráfico de dispersão (scatter plot)
**Eixo X:** Métrica 1 (selecionável)
**Eixo Y:** Métrica 2 (selecionável)
**Pontos:** Cada vendedor é um ponto
**Linha:** Linha de tendência (regressão)

**Opções de métricas:**
- Tentativas de Ligação
- Tempo em Ligação
- Mensagens Enviadas
- Negócios Trabalhados
- Vendas
- Faturamento

**Objetivo:** Identificar correlações entre métricas (ex: mais tempo em ligação = mais vendas?)

#### 6.6 Seção: Análise Preditiva (Opcional - com IA)

**Conteúdo:**
- Projeção de vendas para próxima semana
- Probabilidade de atingir metas
- Cenários otimista, realista e pessimista
- Fatores que podem influenciar resultados

**Requer:** Integração com API de IA (OpenAI/Gemini)

#### 6.7 Seção: Benchmarks e Metas

**Layout:** Cards comparativos

**Conteúdo:**
- Comparação com metas estabelecidas
- Percentual de atingimento
- Distância para a meta
- Projeção de atingimento

**Exemplo:**
```
Meta de Vendas: 50 vendas/semana
Realizado: 45 vendas
Atingimento: 90%
Faltam: 5 vendas para a meta
```

#### 6.8 Botão de Atualização de Insights

**Componente:** Botão
**Texto:** "Regenerar Insights"
**Ação:** Recalcula todos os insights com base nos dados atuais
**Uso:** Após atualizar dados ou fazer ajustes

---

## Funcionalidades Transversais (Todos os Menus)

### 1. Filtros Globais

**Componentes:**
- Filtro de Período (dropdown)
- Filtro de Vendedor (multi-select)
- Filtro de Funil (multi-select)
- Botão "Limpar Filtros"

**Posição:** Barra superior, abaixo do header
**Comportamento:** Filtros aplicam-se a todos os dados exibidos na página atual

### 2. Exportação de Dados

**Opções:**
- Exportar página atual como PDF
- Exportar dados da tabela como CSV
- Exportar gráfico como imagem (PNG)

**Posição:** Ícone de download no canto superior direito de cada seção

### 3. Responsividade

**Breakpoints:**
- Desktop (> 1024px): Layout completo
- Tablet (768-1024px): Sidebar colapsável, gráficos adaptados
- Mobile (< 768px): Menu hambúrguer, cards empilhados, tabelas com scroll horizontal

**Adaptações:**
- Gráficos redimensionam automaticamente
- Tabelas com scroll horizontal em telas pequenas
- Cards empilhados verticalmente
- Sidebar vira menu hambúrguer

### 4. Tooltips e Ajuda

**Componente:** Ícone de interrogação (?) ao lado de títulos
**Comportamento:** Hover ou clique mostra explicação da seção/métrica
**Conteúdo:** Texto explicativo curto e objetivo

### 5. Loading States

**Componentes:**
- Skeleton screens durante carregamento
- Spinners para ações assíncronas
- Mensagens de progresso para uploads

### 6. Estados Vazios

**Cenário:** Quando não há dados para exibir
**Componente:** Ilustração + Mensagem + Botão de ação
**Exemplo:** "Nenhum dado encontrado. Faça upload da planilha para começar."

### 7. Notificações

**Tipos:**
- Sucesso (verde): "Dados atualizados com sucesso"
- Erro (vermelho): "Erro ao processar planilha"
- Aviso (amarelo): "Alguns dados estão inconsistentes"
- Info (azul): "Nova versão disponível"

**Posição:** Toast no canto superior direito
**Duração:** 3-5 segundos (auto-dismiss)

---

## Considerações de UX/UI

### Princípios de Design

1. **Clareza:** Informação deve ser facilmente compreensível
2. **Hierarquia:** Dados mais importantes em destaque
3. **Consistência:** Padrões visuais mantidos em todo o dashboard
4. **Feedback:** Usuário sempre sabe o que está acontecendo
5. **Eficiência:** Ações comuns devem ser rápidas e fáceis

### Acessibilidade

- Contraste adequado (WCAG AA)
- Textos alternativos em imagens e ícones
- Navegação por teclado
- Tamanhos de fonte legíveis (mínimo 14px)
- Cores não como único indicador (usar ícones também)

### Performance

- Lazy loading de componentes pesados
- Virtualização de tabelas grandes
- Debounce em filtros (300ms)
- Cache de dados processados
- Otimização de gráficos (limitar pontos de dados)

### Animações

- Transições suaves entre páginas (300ms)
- Animação de entrada de cards (stagger)
- Hover effects sutis
- Loading animations
- Evitar animações excessivas (pode cansar)

