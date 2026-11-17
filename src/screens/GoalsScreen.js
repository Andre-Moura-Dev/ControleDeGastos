import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, ProgressBar, SectionTitle } from '../components/UI';
import { useAppTheme } from '../context/ThemeContext';
import { money } from '../utils';
import { useFinance } from '../context/FinanceContext';

export default function GoalsScreen() {
  const { colors } = useAppTheme();
  const { budgets, goals, transactions, addGoal, updateBudget } = useFinance();
  const [showNew, setShowNew] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const spentFor = (name) => transactions.filter(t => t.type === 'expense' && (t.category === name || (name.startsWith('Lazer') && t.category === 'Lazer') || (name.startsWith('Moradia') && t.category === 'Moradia'))).reduce((s, t) => s + t.amount, 0);

  const create = () => {
    const target = Number(goalTarget.replace(',', '.'));
    if (!goalName.trim() || !target || target <= 0) return Alert.alert('Confira os dados', 'Informe o nome da meta e um valor válido.');
    addGoal({ name: goalName.trim(), current: 0, target, icon: 'flag-outline' });
    setGoalName(''); setGoalTarget(''); setShowNew(false);
  };

  return <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 30 }}>
    <Text style={{ color: colors.muted, fontSize: 11, fontWeight: '800', letterSpacing: 1 }}>PLANEJAMENTO FINANCEIRO</Text>
    <Text style={{ color: colors.text, fontSize: 25, fontWeight: '800', marginTop: 4, marginBottom: 16 }}>Orçamentos e metas</Text>
    <Card style={{ marginBottom: 20 }}>
      <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 12 }}>● SAÚDE FINANCEIRA GERAL</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <View>
          <Text style={{ color: colors.text, fontSize: 27, fontWeight: '800' }}>{money(transactions.filter(t => t.type === 'expense').reduce((s,t) => s+t.amount,0))}</Text>
          <Text style={{ color: colors.muted, fontSize: 12 }}>Total de despesas registradas</Text>
        </View>
        <View style={{ width: 62, height: 62, borderRadius: 31, borderWidth: 6, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: colors.primary, fontWeight: '800' }}>59%</Text>
        </View>
      </View>
      <View style={{ backgroundColor: colors.surfaceLow, padding: 12, borderRadius: 12, marginTop: 15 }}>
        <Text style={{ color: colors.primary, fontWeight: '700' }}>✓  Acompanhe seus limites</Text>
        <Text style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}>Organize seus gastos para manter o planejamento em dia.</Text>
      </View>
    </Card>
    <SectionTitle title="Limites por categoria" action="Ajustar" onAction={() => Alert.alert('Limites', 'Toque em um limite para ajustar seu valor.')} />
    {budgets.map(b => {
      const spent = spentFor(b.name);
      const percent = spent / b.limit * 100;
      return <TouchableOpacity key={b.id} onPress={() => Alert.prompt ? Alert.prompt('Novo limite', `Limite para ${b.name}`, value => { const n = Number(String(value).replace(',', '.')); if (n > 0) updateBudget(b.id, n); }, 'plain-text', String(b.limit)) : Alert.alert('Ajustar limite', 'A edição de limite está disponível no iOS; no Android, podemos incluir um campo dedicado na próxima etapa.')} activeOpacity={0.8}>
        <Card style={{ marginBottom: 11 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text, fontWeight: '700', fontSize: 15 }}>{b.name}</Text>
              <Text style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}>Gasto: {money(spent)}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: colors.text, fontWeight: '800' }}>{money(b.limit)}</Text>
              <Text style={{ color: colors.muted, fontSize: 11 }}>limite</Text>
            </View>
          </View>
          <View style={{ marginTop: 12 }}><ProgressBar value={percent} color={percent > 85 ? colors.expense : colors.primary} /></View>
          <Text style={{ color: percent > 85 ? colors.expense : colors.primary, fontSize: 11, marginTop: 7, fontWeight: '700' }}>{Math.round(percent)}% consumido</Text>
        </Card>
      </TouchableOpacity>;
    })}
    <SectionTitle title="Cofres e metas de poupança" />
    {goals.map(g => {
      const percent = g.current / g.target * 100;
      return <Card key={g.id} style={{ marginBottom: 11 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 43, height: 43, borderRadius: 13, backgroundColor: colors.incomeSoft, alignItems: 'center', justifyContent: 'center' }}><Ionicons name={g.icon || 'flag-outline'} size={22} color={colors.primary} /></View>
          <View style={{ flex: 1, marginLeft: 11 }}>
            <Text style={{ color: colors.text, fontWeight: '700' }}>{g.name}</Text>
            <Text style={{ color: colors.muted, fontSize: 11, marginTop: 3 }}>{money(g.current)} acumulados</Text>
          </View>
          <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 17 }}>{Math.round(percent)}%</Text>
        </View>
        <View style={{ marginTop: 13 }}><ProgressBar value={percent} color={colors.income} /></View>
        <Text style={{ color: colors.muted, fontSize: 12, marginTop: 7 }}>Meta: {money(g.target)}</Text>
      </Card>;
    })}
    {showNew ? <Card style={{ marginBottom: 12 }}>
      <Text style={{ color: colors.text, fontWeight: '800', marginBottom: 10 }}>Nova meta de economia</Text>
      <TextInput value={goalName} onChangeText={setGoalName} placeholder="Nome da meta" placeholderTextColor={colors.muted} style={{ borderWidth: 1, borderColor: colors.outline, borderRadius: 12, padding: 12, marginBottom: 9, color: colors.text, backgroundColor: colors.surface }} />
      <TextInput value={goalTarget} onChangeText={setGoalTarget} keyboardType="decimal-pad" placeholder="Valor desejado (ex.: 5000)" placeholderTextColor={colors.muted} style={{ borderWidth: 1, borderColor: colors.outline, borderRadius: 12, padding: 12, marginBottom: 10, color: colors.text, backgroundColor: colors.surface }} />
      <TouchableOpacity onPress={create} style={{ backgroundColor: colors.primary, borderRadius: 12, padding: 13, alignItems: 'center' }}><Text style={{ color: colors.onPrimary, fontWeight: '800' }}>Salvar meta</Text></TouchableOpacity>
    </Card> : null}
    <TouchableOpacity onPress={() => setShowNew(!showNew)} style={{ backgroundColor: colors.surfaceMid, borderRadius: 15, padding: 16, alignItems: 'center', marginBottom: 15 }}>
      <Text style={{ color: colors.primary, fontWeight: '800' }}>{showNew ? 'Cancelar' : '+ Criar nova meta de economia'}</Text>
    </TouchableOpacity>
    <View style={{ backgroundColor: colors.surfaceMid, padding: 15, borderRadius: 15 }}>
      <Text style={{ color: colors.text, fontWeight: '700' }}>Regra 50–30–20</Text>
      <Text style={{ color: colors.muted, fontSize: 12, marginTop: 3 }}>Uma referência para equilibrar necessidades, desejos e objetivos financeiros.</Text>
    </View>
  </ScrollView>;
}
