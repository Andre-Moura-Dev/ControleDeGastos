import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';

export function Card({ children, style }) {
  const { colors } = useAppTheme();
  return <View style={[{ backgroundColor: colors.surface, borderRadius: 18, padding: 16, borderWidth: 1, borderColor: colors.outline }, style]}>{children}</View>;
}

export function SectionTitle({ title, action, onAction }) {
  const { colors } = useAppTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>{title}</Text>
      {action ? <TouchableOpacity onPress={onAction}><Text style={{ color: colors.primary, fontWeight: '700' }}>{action}</Text></TouchableOpacity> : null}
    </View>
  );
}

export function Pill({ label, active, onPress }) {
  const { colors } = useAppTheme();
  return <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 16, paddingVertical: 9, borderRadius: 30, backgroundColor: active ? colors.primary : colors.surfaceLow }}>
    <Text style={{ color: active ? colors.onPrimary : colors.text, fontWeight: '600', fontSize: 13 }}>{label}</Text>
  </TouchableOpacity>;
}

export function ProgressBar({ value, color }) {
  const { colors } = useAppTheme();
  const width = `${Math.max(0, Math.min(100, value))}%`;
  return <View style={{ height: 10, borderRadius: 20, backgroundColor: colors.surfaceHigh, overflow: 'hidden' }}>
    <View style={{ height: '100%', width, backgroundColor: color || colors.primary, borderRadius: 20 }} />
  </View>;
}

export function TransactionRow({ item }) {
  const { colors } = useAppTheme();
  const income = item.type === 'income';
  const iconMap = { 'Alimentação': 'cart-outline', 'Transporte': 'car-outline', 'Moradia': 'home-outline', 'Saúde': 'medkit-outline', 'Lazer': 'film-outline', 'Renda / Salário': 'wallet-outline', 'Renda extra': 'cash-outline' };
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: 12, borderRadius: 17, marginBottom: 9 }}>
      <View style={{ width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: income ? colors.incomeSoft : colors.expenseSoft }}>
        <Ionicons name={iconMap[item.category] || 'receipt-outline'} size={21} color={income ? colors.primary : colors.expense} />
      </View>
      <View style={{ flex: 1, marginLeft: 11, minWidth: 0 }}>
        <Text numberOfLines={1} style={{ color: colors.text, fontWeight: '700', fontSize: 14 }}>{item.title}</Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: 12, marginTop: 3 }}>{item.category}  •  {item.account || 'Lançamento manual'}</Text>
      </View>
      <View style={{ alignItems: 'flex-end', marginLeft: 8 }}>
        <Text style={{ color: income ? colors.primary : colors.text, fontWeight: '700', fontSize: 14 }}>{income ? '+' : '−'} {item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
        <Text style={{ color: colors.muted, fontSize: 11, marginTop: 3 }}>{new Date(item.date + 'T12:00:00').toLocaleDateString('pt-BR')}</Text>
      </View>
    </View>
  );
}

export function Field({ label, ...props }) {
  const { colors } = useAppTheme();
  return <View style={{ marginBottom: 14 }}>
    <Text style={{ color: colors.muted, fontSize: 13, fontWeight: '600', marginBottom: 7 }}>{label}</Text>
    <TextInput placeholderTextColor={colors.muted} {...props} style={[{ minHeight: 50, borderWidth: 1, borderColor: colors.outline, borderRadius: 13, paddingHorizontal: 14, color: colors.text, backgroundColor: colors.surface, fontSize: 15 }, props.style]} />
  </View>;
}
