import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, ProgressBar, SectionTitle, TransactionRow } from '../components/UI';
import { useAppTheme } from '../context/ThemeContext';
import { money } from '../utils';
import { useFinance } from '../context/FinanceContext';

export default function HomeScreen({ goTo }) {
  const { colors } = useAppTheme();
  const { transactions, totals, budgets, goals } = useFinance();
  const [hidden, setHidden] = useState(false);
  const spent = totals.expenses;
  const budgetTotal = budgets.reduce((s, b) => s + b.limit, 0);
  const budgetUsage = budgetTotal > 0 ? spent / budgetTotal * 100 : 0;
  const recent = transactions.slice(0, 4);

  return <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
      <View>
        <Text style={{ color: colors.text, fontSize: 25, fontWeight: '800' }}>Olá, André 👋</Text>
        <Text style={{ color: colors.muted, marginTop: 3 }}>Seu resumo financeiro</Text>
      </View>
      <View style={{ backgroundColor: colors.successSoft, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 22, flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="leaf-outline" color={colors.primary} size={15} />
        <Text style={{ color: colors.primary, fontWeight: '700', marginLeft: 5, fontSize: 12 }}>Saudável</Text>
      </View>
    </View>

    <View style={{ backgroundColor: colors.balanceSurface, borderRadius: 23, padding: 21, marginBottom: 23 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: colors.balanceMuted, fontWeight: '700', fontSize: 12, letterSpacing: 0.5 }}>SALDO GERAL DISPONÍVEL</Text>
        <TouchableOpacity onPress={() => setHidden(!hidden)}><Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} color={colors.balanceText} size={22} /></TouchableOpacity>
      </View>
      <Text style={{ color: colors.balanceText, fontSize: 31, fontWeight: '800', marginTop: 14 }}>{hidden ? '••••••••' : money(totals.balance)}</Text>
      <View style={{ flexDirection: 'row', marginTop: 19, backgroundColor: colors.balanceOverlay, borderRadius: 14, padding: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.balanceIncome, fontSize: 12 }}>↓ Receitas</Text>
          <Text numberOfLines={1} style={{ color: colors.balanceText, fontWeight: '700', marginTop: 4 }}>{money(totals.income)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.balanceExpense, fontSize: 12 }}>↑ Despesas</Text>
          <Text numberOfLines={1} style={{ color: colors.balanceText, fontWeight: '700', marginTop: 4 }}>{money(totals.expenses)}</Text>
        </View>
      </View>
    </View>

    <SectionTitle title="Ações frequentes" />
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22 }}>
      {[['add-circle-outline', 'Despesa', 'expense'], ['trending-up-outline', 'Receita', 'income'], ['swap-horizontal-outline', 'Transferir', 'transfer']].map(([icon, label, type]) =>
        <TouchableOpacity key={label} onPress={() => goTo('add', type)} style={{ alignItems: 'center', width: '31%' }}>
          <View style={{ width: 58, height: 58, borderRadius: 18, backgroundColor: type === 'expense' ? colors.expenseSoft : colors.surfaceMid, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={icon} size={25} color={type === 'expense' ? colors.expense : colors.primary} />
          </View>
          <Text style={{ color: colors.text, fontWeight: '600', fontSize: 12, marginTop: 7 }}>{label}</Text>
        </TouchableOpacity>
      )}
    </View>

    <Card style={{ marginBottom: 17 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <Text style={{ color: colors.text, fontWeight: '700', fontSize: 16 }}>Orçamento mensal</Text>
        <Text style={{ color: colors.primary, fontWeight: '700' }}>{Math.min(100, Math.round(budgetUsage))}% usado</Text>
      </View>
      <ProgressBar value={budgetUsage} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 9 }}>
        <Text style={{ color: colors.muted, fontSize: 12 }}>Gasto: {money(spent)}</Text>
        <Text style={{ color: colors.muted, fontSize: 12 }}>Previsto: {money(budgetTotal)}</Text>
      </View>
    </Card>

    {goals[0] ? <TouchableOpacity onPress={() => goTo('goals')} style={{ backgroundColor: colors.surfaceMid, borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 22 }}>
      <View style={{ width: 45, height: 45, borderRadius: 14, backgroundColor: colors.incomeSoft, alignItems: 'center', justifyContent: 'center' }}><Ionicons name="wallet-outline" size={24} color={colors.primary} /></View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{ color: colors.text, fontWeight: '700' }}>{goals[0].name}</Text>
        <Text style={{ color: colors.muted, fontSize: 12, marginTop: 3 }}>Meta: {Math.round(goals[0].current / goals[0].target * 100)}% atingido</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.primary} />
    </TouchableOpacity> : null}

    <SectionTitle title="Últimas transações" action="Ver todas →" onAction={() => goTo('statement')} />
    {recent.map(item => <TransactionRow key={item.id} item={item} />)}
  </ScrollView>;
}
