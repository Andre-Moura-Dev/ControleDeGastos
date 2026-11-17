import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { Card, Pill, SectionTitle, TransactionRow } from '../components/UI';
import { useAppTheme } from '../context/ThemeContext';
import { money } from '../utils';
import { useFinance } from '../context/FinanceContext';

export default function StatementScreen() {
  const { colors } = useAppTheme();
  const { transactions, totals } = useFinance();
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => transactions.filter(t => {
    const matchesType = filter === 'Todos' || (filter === 'Despesas' ? t.type === 'expense' : t.type === 'income');
    const matchesSearch = `${t.title} ${t.category}`.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  }), [transactions, filter, search]);

  return <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 28 }} keyboardShouldPersistTaps="handled">
    <Text style={{ color: colors.text, fontSize: 25, fontWeight: '800', marginBottom: 16 }}>Extrato</Text>
    <TextInput value={search} onChangeText={setSearch} placeholder="Buscar por estabelecimento, categoria" placeholderTextColor={colors.muted} style={{ backgroundColor: colors.surfaceMid, borderRadius: 14, paddingHorizontal: 15, height: 48, color: colors.text, marginBottom: 13 }} />
    <View style={{ flexDirection: 'row', gap: 8, marginBottom: 17 }}>
      {['Todos', 'Despesas', 'Receitas'].map(f => <Pill key={f} label={f} active={filter === f} onPress={() => setFilter(f)} />)}
    </View>
    <Card style={{ marginBottom: 18 }}>
      <Text style={{ color: colors.primary, fontSize: 11, fontWeight: '800', letterSpacing: 0.6 }}>● FECHAMENTO PARCIAL</Text>
      <View style={{ flexDirection: 'row', marginTop: 12, gap: 9 }}>
        <View style={{ flex: 1, backgroundColor: colors.surfaceLow, padding: 12, borderRadius: 12 }}>
          <Text style={{ color: colors.muted, fontSize: 12 }}>↓ Total gasto</Text>
          <Text style={{ color: colors.expense, fontWeight: '800', fontSize: 17, marginTop: 4 }}>{money(totals.expenses)}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.surfaceLow, padding: 12, borderRadius: 12 }}>
          <Text style={{ color: colors.muted, fontSize: 12 }}>↑ Recebido</Text>
          <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 17, marginTop: 4 }}>{money(totals.income)}</Text>
        </View>
      </View>
      <Text style={{ color: colors.muted, marginTop: 15 }}>Saldo líquido acumulado</Text>
      <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 23, marginTop: 3 }}>{money(totals.balance)}</Text>
    </Card>
    <SectionTitle title="Histórico de transações" />
    {filtered.length ? filtered.map(item => <TransactionRow key={item.id} item={item} />) : <Card><Text style={{ color: colors.muted, textAlign: 'center' }}>Nenhuma transação encontrada.</Text></Card>}
  </ScrollView>;
}
