import React, { useState } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FinanceProvider, useFinance } from './src/context/FinanceContext';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import GoalsScreen from './src/screens/GoalsScreen';
import HomeScreen from './src/screens/HomeScreen';
import StatementScreen from './src/screens/StatementScreen';
import { ThemeProvider, useAppTheme } from './src/context/ThemeContext';
import { money } from './src/utils';

const tabs = [
  { key: 'home', label: 'Início', icon: 'home-outline' },
  { key: 'statement', label: 'Extrato', icon: 'receipt-outline' },
  { key: 'goals', label: 'Planejamento', icon: 'pie-chart-outline' },
  { key: 'profile', label: 'Perfil', icon: 'person-outline' },
];

function ProfileScreen() {
  const { totals } = useFinance();
  const { theme, toggleTheme, colors } = useAppTheme();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ color: colors.text, fontSize: 25, fontWeight: '800', marginBottom: 18 }}>Perfil</Text>
      <View style={{ alignItems: 'center', backgroundColor: colors.surface, borderRadius: 18, padding: 24 }}>
        <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: colors.surfaceMid, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="person-outline" size={34} color={colors.primary} />
        </View>
        <Text style={{ color: colors.text, fontSize: 19, fontWeight: '800', marginTop: 12 }}>André</Text>
        <Text style={{ color: colors.muted, marginTop: 4 }}>Resumo da sua conta FinFlow</Text>
      </View>
      <View style={{ backgroundColor: colors.surface, borderRadius: 18, padding: 18, marginTop: 14 }}>
        <Text style={{ color: colors.muted, fontSize: 13 }}>Saldo atual</Text>
        <Text style={{ color: colors.primary, fontSize: 22, fontWeight: '800', marginTop: 5 }}>{money(totals.balance)}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 18, padding: 18, marginTop: 14 }}>
        <View style={{ flex: 1, marginRight: 12 }}>
          <Text style={{ color: colors.text, fontSize: 15, fontWeight: '700' }}>Tema escuro</Text>
          <Text style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}>Altere a aparência do aplicativo</Text>
        </View>
        <Switch
          accessibilityLabel="Ativar tema escuro"
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.outline, true: colors.primaryLight }}
          thumbColor={colors.surface}
        />
      </View>
    </View>
  );
}

function AppContent() {
  const { theme, colors } = useAppTheme();
  const [screen, setScreen] = useState('home');
  const [returnScreen, setReturnScreen] = useState('home');
  const [transactionType, setTransactionType] = useState('expense');

  const goTo = (destination, type) => {
    if (destination === 'add') {
      setReturnScreen(screen);
      setTransactionType(type || 'expense');
    }
    setScreen(destination);
  };

  const renderTab = (tab) => {
    const active = screen === tab.key;
    return (
      <TouchableOpacity
        key={tab.key}
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        onPress={() => setScreen(tab.key)}
        style={{ flex: 1, alignItems: 'center', paddingVertical: 5 }}
      >
        <Ionicons name={tab.icon} size={22} color={active ? colors.primary : colors.muted} />
        <Text style={{ color: active ? colors.primary : colors.muted, fontSize: 10, fontWeight: active ? '700' : '500', marginTop: 3 }}>
          {tab.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const content = screen === 'add'
    ? <AddTransactionScreen
        initialType={transactionType}
        onDone={() => setScreen(returnScreen)}
        onCancel={() => setScreen(returnScreen)}
      />
    : screen === 'statement'
      ? <StatementScreen />
      : screen === 'goals'
        ? <GoalsScreen />
        : screen === 'profile'
          ? <ProfileScreen />
          : <HomeScreen goTo={goTo} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} backgroundColor={colors.background} />
      <View style={{ flex: 1 }}>{content}</View>
      {screen !== 'add' ? (
        <View style={{ flexDirection: 'row', backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.outline, paddingTop: 8, paddingBottom: 4 }}>
          {tabs.slice(0, 2).map(renderTab)}
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Adicionar transação"
            onPress={() => goTo('add')}
            style={{ flex: 1, alignItems: 'center', paddingBottom: 2 }}
          >
            <View style={{ width: 60, height: 60, borderRadius: 30, marginTop: -28, backgroundColor: colors.surfaceMid, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: colors.surface, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 6 }}>
                <Ionicons name="add" size={30} color={colors.onPrimary} />
              </View>
            </View>
            <Text style={{ color: colors.primary, fontSize: 9, fontWeight: '700', marginTop: 1 }}>Adicionar</Text>
          </TouchableOpacity>
          {tabs.slice(2).map(renderTab)}
        </View>
      ) : null}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <FinanceProvider>
        <AppContent />
      </FinanceProvider>
    </ThemeProvider>
  );
}
