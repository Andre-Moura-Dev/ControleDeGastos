import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeId } from '../utils';

const STORAGE_KEY = '@finflow:finance:v1';

const initialTransactions = [
  { id: 't1', title: 'Supermercado Pão de Açúcar', category: 'Alimentação', type: 'expense', amount: 246.80, date: '2025-03-12', account: 'Cartão Nubank' },
  { id: 't2', title: 'Salário Mensal', category: 'Renda / Salário', type: 'income', amount: 6150, date: '2025-03-11', account: 'TED Recebida' },
  { id: 't3', title: 'Posto Shell Combustível', category: 'Transporte', type: 'expense', amount: 180, date: '2025-03-10', account: 'Crédito Final 4120' },
  { id: 't4', title: 'Assinatura Netflix', category: 'Lazer', type: 'expense', amount: 55.90, date: '2025-03-08', account: 'Recorrente' },
  { id: 't5', title: 'Freelance UI Design', category: 'Renda extra', type: 'income', amount: 2400, date: '2025-03-11', account: 'Transferência Pix' },
  { id: 't6', title: 'Farmácia Droga Raia', category: 'Saúde', type: 'expense', amount: 89.40, date: '2025-03-12', account: 'Débito' },
  { id: 't7', title: 'Café Santo Grão', category: 'Alimentação', type: 'expense', amount: 22.50, date: '2025-03-12', account: 'Cartão' },
  { id: 't8', title: 'Uber Viagem', category: 'Transporte', type: 'expense', amount: 34.90, date: '2025-03-11', account: 'Aplicativo' },
  { id: 't9', title: 'Moradia e condomínio', category: 'Moradia', type: 'expense', amount: 1078.00, date: '2025-03-07', account: 'Débito automático' },
  { id: 't10', title: 'Compras do mês', category: 'Alimentação', type: 'expense', amount: 1100.00, date: '2025-03-06', account: 'Cartão' },
  { id: 't11', title: 'Restaurantes e lazer', category: 'Lazer', type: 'expense', amount: 692.00, date: '2025-03-05', account: 'Cartão' },
  { id: 't12', title: 'Contas e serviços', category: 'Moradia', type: 'expense', amount: 350.30, date: '2025-03-04', account: 'Débito automático' },
  { id: 't13', title: 'Outros recebimentos', category: 'Renda extra', type: 'income', amount: 3750.00, date: '2025-03-03', account: 'Transferência' },
];

const initialBudgets = [
  { id: 'b1', name: 'Alimentação', limit: 1800, icon: 'restaurant-outline', color: '#6ffbbe' },
  { id: 'b2', name: 'Lazer & Restaurantes', limit: 800, icon: 'fast-food-outline', color: '#ffdad8' },
  { id: 'b3', name: 'Moradia & Boletos', limit: 1500, icon: 'home-outline', color: '#dfe5ff' },
  { id: 'b4', name: 'Transporte', limit: 900, icon: 'car-outline', color: '#6ffbbe' },
];

const initialGoals = [
  { id: 'g1', name: 'Reserva de Emergência', current: 15000, target: 20000, icon: 'shield-checkmark-outline' },
  { id: 'g2', name: 'Viagem de Férias', current: 4200, target: 8000, icon: 'airplane-outline' },
];

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [budgets, setBudgets] = useState(initialBudgets);
  const [goals, setGoals] = useState(initialGoals);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const data = JSON.parse(raw);
          if (Array.isArray(data.transactions)) setTransactions(data.transactions);
          if (Array.isArray(data.budgets)) setBudgets(data.budgets);
          if (Array.isArray(data.goals)) setGoals(data.goals);
        }
      } catch (error) {
        console.warn('Não foi possível carregar os dados salvos:', error);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ transactions, budgets, goals }))
      .catch((error) => console.warn('Não foi possível salvar os dados:', error));
  }, [transactions, budgets, goals, loaded]);

  const addTransaction = (data) => {
    setTransactions((current) => [{
      id: makeId(),
      ...data,
      amount: Number(data.amount),
    }, ...current]);
  };

  const addGoal = (goal) => setGoals((current) => [...current, { id: makeId(), ...goal }]);
  const updateBudget = (id, limit) => setBudgets((current) => current.map((b) => b.id === id ? { ...b, limit } : b));

  const totals = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return { income, expenses, balance: 8450.20 + (income - 12300) - (expenses - 3849.80) };
  }, [transactions]);

  return (
    <FinanceContext.Provider value={{ transactions, budgets, goals, totals, addTransaction, addGoal, updateBudget }}>
      {loaded ? children : null}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);
