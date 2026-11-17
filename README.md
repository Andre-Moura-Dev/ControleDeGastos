# FinFlow — aplicativo mobile de finanças pessoais

Projeto React Native com Expo SDK 58, baseado nas quatro telas fornecidas pelo Stitch.

## Stack

- Expo SDK 58 (`expo` 58.0.x)
- React 19.3
- React Native 0.88.1
- JavaScript
- AsyncStorage para persistência local
- `@expo/vector-icons` para ícones
- `react-native-safe-area-context` para áreas seguras

## Instalação

1. Extraia o ZIP.
2. Abra a pasta do projeto no terminal.
3. Instale as dependências:

```bash
npm install
```

4. Inicie o Expo:

```bash
npx expo start --clear
```

Para abrir no Android:

```bash
npx expo start --android
```

## Funcionalidades incluídas

- Dashboard com saldo, receitas, despesas e últimas transações.
- Ocultar/mostrar saldo.
- Alternar entre tema claro e escuro, com preferência salva no dispositivo.
- Cadastro de receitas e despesas.
- Extrato com pesquisa e filtros por tipo.
- Orçamentos por categoria.
- Criação de metas de economia.
- Persistência local de transações, orçamentos e metas via AsyncStorage.

## Observações

- O aplicativo começa com dados demonstrativos para facilitar a apresentação.
- Não há backend, autenticação, integração bancária ou transações reais.
- A opção de transferência é exibida no formulário como parte do protótipo; o cadastro funcional nesta versão é de receitas e despesas.
- O item Perfil é apenas um painel simples, pois não foi fornecida uma tela de perfil no protótipo.
- A fonte usa a tipografia nativa como fallback. O guia visual indica Plus Jakarta Sans; ela pode ser adicionada como fonte local posteriormente.
- A tela e os dados são uma demonstração acadêmica, não um serviço financeiro real.
