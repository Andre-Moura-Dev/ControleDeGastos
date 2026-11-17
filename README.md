# FinFlow 📱💸

<p align="center">
  <b>Aplicativo mobile de finanças pessoais desenvolvido em React Native com Expo.</b>
</p>

---

## 📌 Visão Geral

O **FinFlow** é um aplicativo mobile focado no controle de finanças pessoais, projetado para oferecer uma experiência fluida, moderna e intuitiva de gestão financeira diretamente no smartphone. O projeto foi estruturado com foco em boas práticas de arquitetura frontend, suporte nativo a temas (Claro/Escuro) e persistência local eficiente.

---

## 🚀 Tecnologias e Stack

O ecossistema técnico do projeto é composto pelas seguintes tecnologias e bibliotecas:

* **Framework:** [React Native](https://reactnative.dev/) (`0.88.1`)
* **Plataforma / Ferramentas:** [Expo SDK](https://expo.dev/) (`58.0.x`)
* **Biblioteca de UI:** [React](https://react.dev/) (`19.3`)
* **Persistência de Dados:** `@react-native-async-storage/async-storage`
* **Ícones:** `@expo/vector-icons`
* **Gerenciamento de Layout:** `react-native-safe-area-context`

---

## ✨ Funcionalidades Principais

* 📊 **Dashboard Financeiro:** Visão consolidada do saldo atual, total de receitas, despesas do período e listagem das últimas transações.
* 👁️ **Privacidade de Saldo:** Alternância rápida para ocultar ou exibir valores monetários na tela inicial.
* 🌓 **Suporte a Tema Dinâmico:** Alternância nativa entre os modos Claro e Escuro, com salvamento automático da preferência do usuário.
* 💳 **Gestão de Transações:** Cadastro simplificado de novas receitas e despesas.
* 🔍 **Extrato Inteligente:** Histórico completo de movimentações com barra de pesquisa integrada e filtros avançados por tipo.
* 🎯 **Orçamentos por Categoria:** Acompanhamento de limites de gastos estipulados para diferentes categorias.
* 🏆 **Metas de Economia:** Criação e acompanhamento de objetivos financeiros de longo e curto prazo.
* 💾 **Persistência Local:** Armazenamento de dados 100% offline utilizando o AsyncStorage.

---

## ⚙️ Pré-requisitos

Certifique-se de possuir as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:
* **Node.js** (versão LTS recomendada)
* **npm** ou **yarn**
* **Expo Go** instalado no seu dispositivo móvel (ou um emulador Android/iOS configurado)

---

## 📦 Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto localmente:

1. **Extraia o arquivo ZIP** contendo o código-fonte do projeto.
2. Abra o terminal e **navegue até a pasta raiz** do projeto:

```bash
cd caminho/para/a/pasta/finflow
```

3. **Instale as dependências** do projeto:

```bash
npm install
```

4. **Inicie o servidor de desenvolvimento do Expo** limpando o cache:

```bash
npx expo start --clear
```

### Atalhos de Execução

* Para rodar diretamente no **Android**:

```bash
npx expo start --android
```

* Para rodar diretamente no **iOS** (macOS necessário):

```bash
npx expo start --ios
```

* Para abrir no **Navegador Web**:

```bash
npx expo start --web
```

---

## 📝 Notas e Observações

* **Dados Demonstrativos:** O aplicativo inicializa com um conjunto de dados mockados para facilitar testes e demonstrações visuais imediatas.
* **Escopo do Protótipo:** Trata-se de uma aplicação cliente (frontend-only). Não há integração com backends remotos, gateways de pagamento, APIs bancárias ou sistemas de autenticação real.
* **Transações:** A opção de transferência consta no layout conceitual do protótipo; as operações funcionais implementadas nesta versão concentram-se em receitas e despesas.
* **Perfil:** A seção de perfil atua como um painel descritivo/gerencial simplificado, uma vez que o protótipo de referência omitia essa tela específica.
* **Tipografia:** O design conceitual emprega a fonte *Plus Jakarta Sans*. O aplicativo utiliza fontes nativas como fallback seguro, podendo ter a tipografia customizada futuramente com fontes locais.
* **Caráter Acadêmico:** Este software tem finalidade exclusivamente educacional e demonstrativa.
