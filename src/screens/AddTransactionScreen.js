import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Field } from '../components/UI';
import { useAppTheme } from '../context/ThemeContext';
import { useFinance } from '../context/FinanceContext';

const categories = [
  { name: 'Alimentação', icon: 'restaurant-outline' },
  { name: 'Transporte', icon: 'car-outline' },
  { name: 'Moradia', icon: 'home-outline' },
  { name: 'Saúde', icon: 'medkit-outline' },
  { name: 'Compras', icon: 'bag-outline' },
  { name: 'Lazer', icon: 'film-outline' },
  { name: 'Educação', icon: 'school-outline' },
  { name: 'Outros', icon: 'add-outline' },
];

export default function AddTransactionScreen({ initialType = 'expense', onDone, onCancel }) {
  const { colors } = useAppTheme();
  const { addTransaction } = useFinance();
  const [type, setType] = useState(initialType === 'income' ? 'income' : initialType === 'transfer' ? 'transfer' : 'expense');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Alimentação');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [account, setAccount] = useState('Conta principal');
  const parsedAmount = useMemo(() => Number(amount.replace(',', '.')), [amount]);

  const save = () => {
    if (!title.trim()) return Alert.alert('Descrição necessária', 'Informe uma descrição para a transação.');
    if (!parsedAmount || parsedAmount <= 0) return Alert.alert('Valor inválido', 'Informe um valor maior que zero.');
    if (type === 'transfer') return Alert.alert('Transferência', 'A transferência está representada na interface. Para este protótipo, cadastre receitas e despesas.');
    addTransaction({ title: title.trim(), category: type === 'income' ? (category === 'Alimentação' ? 'Renda extra' : category) : category, type, amount: parsedAmount, date, account });
    Alert.alert('Tudo certo!', 'Transação adicionada ao FinFlow.');
    onDone();
  };

  return <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 30 }} keyboardShouldPersistTaps="handled">
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 17 }}>
      <TouchableOpacity onPress={onCancel} style={{ padding: 6, marginRight: 8 }}><Ionicons name="arrow-back" size={25} color={colors.text} /></TouchableOpacity>
      <Text style={{ color: colors.text, fontSize: 23, fontWeight: '800' }}>Nova transação</Text>
    </View>
    <View style={{ flexDirection: 'row', backgroundColor: colors.surfaceMid, borderRadius: 15, padding: 5, marginBottom: 20 }}>
      {[['expense', 'Despesa'], ['income', 'Receita'], ['transfer', 'Transferência']].map(([value, label]) =>
        <TouchableOpacity key={value} onPress={() => setType(value)} style={{ flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center', backgroundColor: type === value ? (value === 'expense' ? colors.expense : colors.primary) : 'transparent' }}>
          <Text style={{ color: type === value ? (value === 'expense' ? colors.onExpense : colors.onPrimary) : colors.text, fontWeight: '700', fontSize: 12 }}>{label}</Text>
        </TouchableOpacity>
      )}
    </View>
    <View style={{ backgroundColor: colors.surface, borderRadius: 20, padding: 22, alignItems: 'center', marginBottom: 20 }}>
      <Text style={{ color: colors.muted, fontWeight: '700', letterSpacing: 0.6, fontSize: 12 }}>VALOR DA OPERAÇÃO</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
        <Text style={{ color: colors.muted, fontSize: 24 }}>R$ </Text>
        <Text style={{ color: colors.text, fontSize: 35, fontWeight: '800' }}>{amount ? amount.replace('.', ',') : '0,00'}</Text>
      </View>
      <Text style={{ color: type === 'expense' ? colors.expense : colors.primary, backgroundColor: type === 'expense' ? colors.expenseSoft : colors.incomeSoft, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 8, fontSize: 12 }}>{type === 'expense' ? 'Saída de caixa' : type === 'income' ? 'Entrada de caixa' : 'Movimentação entre contas'}</Text>
    </View>
    <Text style={{ color: colors.text, fontWeight: '700', fontSize: 16, marginBottom: 11 }}>Categoria</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 18 }}>
      {categories.map(item => <TouchableOpacity key={item.name} onPress={() => setCategory(item.name)} style={{ width: '23.5%', minHeight: 92, marginBottom: 9, borderRadius: 15, backgroundColor: category === item.name ? colors.primary : colors.surfaceMid, alignItems: 'center', justifyContent: 'center', padding: 6 }}>
        <Ionicons name={item.icon} size={24} color={category === item.name ? colors.onPrimary : colors.primary} />
        <Text numberOfLines={1} style={{ color: category === item.name ? colors.onPrimary : colors.text, fontSize: 11, fontWeight: '600', marginTop: 7 }}>{item.name}</Text>
      </TouchableOpacity>)}
    </View>
    <Field label="Descrição" value={title} onChangeText={setTitle} placeholder="Ex.: Almoço no restaurante" />
    <Field label="Data (AAAA-MM-DD)" value={date} onChangeText={setDate} placeholder="2025-03-12" />
    <Field label="Conta / forma de pagamento" value={account} onChangeText={setAccount} placeholder="Conta principal" />
    <Field label="Valor (ex.: 145,50)" value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="0,00" />
    <TouchableOpacity onPress={save} style={{ minHeight: 54, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
      <Text style={{ color: colors.onPrimary, fontSize: 16, fontWeight: '800' }}>✓  Confirmar {type === 'income' ? 'receita' : type === 'expense' ? 'despesa' : 'transferência'}</Text>
    </TouchableOpacity>
  </ScrollView>;
}
