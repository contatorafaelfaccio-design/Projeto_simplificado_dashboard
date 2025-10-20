# Planejamento Estratégico: Dashboard de Performance Comercial

**Autor:** Manus AI
**Data:** 19 de outubro de 2025
**Versão:** 1.0

## 1. Introdução

Este documento apresenta o planejamento estratégico para o desenvolvimento de um dashboard interativo e centralizado para a análise de performance do time comercial educacional da Nelogica. O objetivo principal é substituir o processo manual de análise de planilhas por uma plataforma web segura, que permita análises rápidas, comparações históricas e a geração de insights automáticos para otimização de resultados. O projeto visa entregar uma versão funcional e simplificada para apresentação em reuniões semanais, com acesso facilitado via link direto.

## 2. Requisitos do Projeto

Esta seção detalha os requisitos funcionais e não-funcionais que guiarão o desenvolvimento do dashboard, garantindo que o produto final atenda às expectativas e necessidades do time comercial.

### 2.1. Requisitos Funcionais

| Categoria | Requisito | Detalhes |
| :--- | :--- | :--- |
| **Interface e Navegação** | Menus Laterais | O dashboard deverá possuir uma barra de navegação lateral para acesso rápido às diferentes seções de análise. |
| | Identidade Visual | A interface deverá seguir a identidade visual e a paleta de cores da Nelogica, garantindo consistência com a marca. |
| | Acesso Direto | O acesso será fornecido através de um link público, eliminando a necessidade de downloads ou instalações. |
| **Atualização de Dados** | Frequência Semanal | Os dados do dashboard serão atualizados semanalmente para refletir a performance mais recente. |
| | Fonte de Dados | A atualização será feita via upload de uma planilha Excel com formato padrão, contendo os dados de quatro períodos (semana atual e as três anteriores). |
| **Análise Comparativa** | Comparação Temporal | O sistema permitirá a comparação do desempenho da semana atual com os três períodos anteriores. |
| | CRM vs. Intranet | Uma seção dedicada comparará os dados de vendas e faturamento entre o CRM e a Intranet para identificar e quantificar discrepâncias. |
| **Geração de Insights** | Insights Automáticos | O dashboard gerará automaticamente destaques da semana, análises de performance e recomendações estratégicas com base nos dados processados. |

### 2.2. Menus do Dashboard

O dashboard será estruturado com os seguintes menus na barra de navegação lateral:

1.  **Menu Geral**: Apresenta uma visão consolidada do desempenho do time, com os principais indicadores (KPIs) e um resumo da performance individual.
2.  **Detalhes por Funil**: Permite a seleção de diferentes funis de venda para uma análise detalhada do desempenho do time e dos vendedores dentro daquele funil específico.
3.  **CRM x Intranet**: Seção dedicada à comparação dos dados de vendas e faturamento registrados no CRM versus os dados da Intranet.
4.  **Resultados Gerais**: Oferece uma visão ampla dos números do time, com rankings, gráficos comparativos e análises de distribuição.
5.  **Comparações no Tempo**: Focado na visualização da evolução das métricas ao longo dos quatro períodos (semana atual e as três anteriores).
6.  **Insights**: Um centro de análise inteligente que apresenta automaticamente destaques, pontos de atenção, oportunidades e recomendações estratégicas.

### 2.3. Métricas Principais

As seguintes métricas serão coletadas e analisadas:

*   Tentativas de ligação
*   Mensagens enviadas
*   Número de vendas
*   Faturamento
*   Tempo em ligação (formato `1h25m`)
*   Número de negócios/clientes trabalhados
*   Taxa de conversão (calculada automaticamente)

### 2.4. Requisitos Não-Funcionais

| Categoria | Requisito |
| :--- | :--- |
| **Segurança** | A plataforma web deverá ser segura, garantindo a confidencialidade dos dados comerciais. |
| **Usabilidade** | A interface deve ser clara, intuitiva e otimizada para apresentações a superiores e para o time. |
| **Performance** | O sistema deve permitir análises rápidas, com carregamento e processamento de dados eficientes. |
| **Manutenibilidade** | O processo de atualização via planilha deve ser simples e robusto, minimizando a necessidade de intervenção técnica. |

## 3. Identidade Visual

A identidade visual do dashboard será baseada no branding da Nelogica, utilizando sua paleta de cores e elementos gráficos para criar uma experiência consistente e profissional. A pesquisa foi baseada no projeto de redesign da marca realizado pelo StudioBah [1].

### 3.1. Paleta de Cores

A paleta de cores principal a ser utilizada é a seguinte:

| Cor | Código Hex (Aprox.) | Uso Recomendado |
| :--- | :--- | :--- |
| **Verde Nelogica** | `#8DC63F` | Destaques, botões primários, gráficos de crescimento. |
| **Azul Ciano Nelogica** | `#00A9E0` | Gráficos, ícones, links, botões secundários. |
| **Cinza Escuro** | `#2C3E50` | Textos principais, títulos, fundos de header. |
| **Cinza Claro** | `#ECF0F1` | Fundos de seções, bordas, linhas de divisão. |
| **Branco** | `#FFFFFF` | Fundo principal da área de conteúdo. |
| **Verde Positivo** | `#27AE60` | Indicadores de variação positiva. |
| **Vermelho Negativo** | `#E74C3C` | Indicadores de variação negativa. |

### 3.2. Tipografia e Estilo

*   **Fonte:** Será utilizada uma fonte sans-serif moderna e de alta legibilidade, como Inter, Roboto ou Open Sans.
*   **Estilo dos Componentes:** Os elementos de interface, como cards e botões, terão bordas arredondadas e sombras sutis para criar uma aparência moderna e limpa, conforme a preferência do usuário por um layout claro e de fácil interpretação.

## 4. Arquitetura Técnica

A arquitetura foi projetada para ser escalável e de rápida implementação, priorizando uma solução acessível via link para a versão inicial (MVP).

### 4.1. Stack Tecnológico

*   **Frontend:** **React.js** com **Vite** para uma base de desenvolvimento moderna e performática. A componentização permitirá a criação de um sistema modular e reutilizável.
*   **Visualização de Dados:** **Chart.js** ou **Recharts** para a criação de gráficos interativos e customizáveis.
*   **Componentes de UI:** **Material-UI (MUI)** ou **TailwindCSS** para a construção de uma interface consistente e responsiva.
*   **Processamento de Dados:** A biblioteca **SheetJS (xlsx)** será utilizada no cliente (navegador) para ler e processar os dados da planilha Excel.
*   **Hospedagem:** A implantação será feita em plataformas como **Vercel** ou **Netlify**, que oferecem deploy contínuo, HTTPS gratuito e alta disponibilidade, permitindo o acesso via link direto.

### 4.2. Fluxo de Dados

O fluxo de dados ocorrerá inteiramente no lado do cliente para a versão MVP, garantindo segurança (os dados não saem do navegador) e simplicidade.

1.  **Upload:** O usuário seleciona a planilha Excel através de um input na interface.
2.  **Leitura e Validação:** A biblioteca SheetJS lê o arquivo. Uma camada de validação verifica a estrutura da planilha, a presença das abas e colunas necessárias e a consistência dos dados.
3.  **Processamento:** Os dados são transformados, e as métricas calculadas (taxas de conversão, variações, etc.) são geradas.
4.  **Armazenamento em Estado:** Os dados processados são armazenados no estado da aplicação (React Context ou Zustand) para serem consumidos pelos componentes.
5.  **Renderização:** Os componentes (gráficos, tabelas, cards) são renderizados com os dados atualizados.

## 5. Estrutura de Dados e Atualização

O coração do processo de atualização é uma planilha Excel padronizada, projetada para ser intuitiva e robusta.

### 5.1. Estrutura da Planilha Excel

A planilha conterá múltiplas abas para organizar os dados de forma clara:

| Aba | Propósito |
| :--- | :--- |
| **Instruções** | Guia detalhado sobre como preencher a planilha. |
| **Períodos** | Definição dos 4 períodos de análise (semana atual e 3 anteriores). |
| **Vendedores** | Cadastro dos vendedores do time. |
| **Funis** | Cadastro dos funis de venda. |
| **Dados_CRM** | Aba principal para inserção dos dados detalhados por vendedor, funil e período, extraídos do CRM. |
| **Dados_Intranet**| Aba para inserção dos dados de vendas e faturamento extraídos da Intranet, para fins de comparação. |

A aba `Dados_CRM` será a mais detalhada, contendo colunas para todas as métricas principais. O sistema usará fórmulas como `VLOOKUP` para preencher nomes automaticamente e validação de dados para garantir a integridade das informações inseridas.

### 5.2. Processo de Atualização

O usuário realizará o upload da planilha preenchida através do dashboard. O sistema validará o arquivo e, se tudo estiver correto, processará os dados e atualizará todas as visualizações instantaneamente. Em caso de erro, mensagens claras indicarão as correções necessárias na planilha.

## 6. Especificações Detalhadas dos Menus

Cada menu foi projetado para responder a perguntas específicas do negócio. Abaixo, um resumo das funcionalidades de cada um.

*   **Menu Geral**: Apresentará os KPIs mais importantes do time, como Faturamento e Vendas totais, com indicadores de variação em relação à semana anterior. Incluirá também um ranking simplificado dos vendedores e destaques automáticos da semana.

*   **Detalhes por Funil**: Permitirá uma análise granular ao selecionar um funil específico. Serão exibidos os KPIs daquele funil, um gráfico de conversão e uma tabela detalhada com o desempenho de cada vendedor dentro do funil selecionado.

*   **CRM x Intranet**: O foco desta seção é a transparência. Cards de resumo mostrarão as diferenças totais em vendas e faturamento. Uma tabela detalhada permitirá a identificação de discrepâncias por vendedor e por funil, com um status visual (OK, Atenção, Crítico) para cada linha.

*   **Resultados Gerais**: Esta área será dedicada a rankings e comparações. Incluirá um pódio visual para os top 3 vendedores, um gráfico de dispersão (Vendas vs. Taxa de Conversão) para identificar perfis de vendedores, e gráficos de pizza para mostrar a distribuição de resultados por funil.

*   **Comparações no Tempo**: Permitirá ao usuário selecionar uma métrica principal (ex: Faturamento) e visualizar sua evolução ao longo das últimas quatro semanas através de gráficos de linha. Também será possível comparar a evolução de todos os vendedores e funis lado a lado.

*   **Insights**: Esta seção funcionará como um analista de dados virtual. Serão apresentados insights categorizados em Destaques Positivos, Pontos de Atenção e Oportunidades de Crescimento. As recomendações serão geradas com base em regras e, futuramente, com o auxílio de modelos de IA, para sugerir ações estratégicas.

## 7. Cronograma de Desenvolvimento (Estimado)

O desenvolvimento será dividido em fases para permitir entregas incrementais e validação contínua.

| Fase | Duração Estimada | Entregáveis Principais |
| :--- | :--- | :--- |
| **Fase 1: Setup e Estrutura** | 2-3 dias | Projeto configurado, identidade visual aplicada, navegação básica funcional. |
| **Fase 2: Processamento de Dados** | 2-3 dias | Lógica de leitura e validação da planilha implementada, dados sendo processados. |
| **Fase 3: MVP Funcional** | 4-5 dias | Implementação do **Menu Geral** e **Detalhes por Funil**, sistema de atualização funcional. |
| **Fase 4: Expansão das Análises** | 3-4 dias | Implementação dos menus **CRM x Intranet** e **Comparações no Tempo**. |
| **Fase 5: Refinamento e IA** | 2-3 dias | Implementação dos menus **Resultados Gerais** e **Insights**, com lógica de geração de recomendações. |
| **Fase 6: Deploy e Testes** | 1 dia | Implantação em ambiente de produção (Vercel/Netlify), testes finais e documentação. |

**Total Estimado:** 14-19 dias úteis.

## 8. Referências

[1] StudioBah. *Nelogica Branding & Design*. Disponível em: <https://studiobah.com.br/nelogica-1>

