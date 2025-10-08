# 🧭 PROJETO NAVGO GPS

Aplicação web desenvolvida em **Next.js**, simulando um sistema de **GPS online** com autenticação, mapa interativo, traçado de rotas e exibição de pontos de interesse (POIs).  
Projeto realizado como parte da **Unidade 2 – Desenvolvimento Web**.

---

## 📋 Descrição do Projeto

O **NAVGO** é uma aplicação web que integra interface interativa e consumo de APIs públicas (Nominatim, OSRM e Overpass) para traçar rotas, sugerir destinos e exibir informações geográficas em tempo real.  
O sistema permite que usuários criem contas, façam login, editem seu perfil, e visualizem histórico de rotas percorridas.  

---

## 🧩 Tecnologias Utilizadas

| Tecnologia | Finalidade |
|-------------|-------------|
| **Next.js** | Framework principal para front-end e back-end (API Routes) |
| **React.js** | Criação de componentes de interface |
| **Leaflet.js** | Mapa interativo e renderização das rotas |
| **Nominatim API** | Geocodificação (busca e sugestões de endereços) |
| **OSRM** | Cálculo de rotas e distâncias |
| **Overpass API** | Busca e exibição de pontos de interesse (postos, hotéis, etc.) |
| **Node.js + JSON local** | Armazenamento simples de usuários e perfis |
| **CSS Modules** | Estilização modular e responsiva |

---

## 📂 Estrutura do Projeto

```
/components       → Componentes reutilizáveis (MapaLeaflet, Layout)
/pages
  index.js        → Login
  cadastro.js     → Cadastro de usuários
  mapa.js         → Tela principal do GPS
  perfil.js       → Edição de perfil e histórico
  configuracoes.js→ Tema e posição do menu
  /api            → Rotas do back-end (auth, profile, nominatim, etc.)
/style            → Estilos (CSS Modules)
/data             → Armazenamento local (users.json)
```

---
## ⚙️ Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/PedroEmilioMartinelli/PROJETO-LORI-GPS.git
cd PROJETO-LORI-GPS
npm install
```
---

## 🚀 Executando o projeto

```bash
npm run dev
```
Acesse no navegador: [http://localhost:3000](http://localhost:3000)

---

## 🔗 APIs Utilizadas

| API | Descrição |
|------|------------|
| **Nominatim (OpenStreetMap)** | Busca e sugestão de endereços |
| **OSRM** | Cálculo de rotas e distâncias |
| **Overpass** | Consulta de pontos de interesse (POIs) |
| **HTML5 Geolocation** | Localização aproximada do usuário |

---

## 👥 Desenvolvido por

**Bruno de Souza**  
**Pedro Emílio Martinelli**  
**Viny Wottrich**

---
