import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackParamList } from '@/navigation/types';
import { colors, spacing, typography } from '@/theme';
import { Button } from '@/components/common/Button';
import { useRole } from '@/context/RoleContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'DashboardPlaceholder'>;

export const DashboardPlaceholderScreen: React.FC<Props> = ({ navigation, route }) => {
  const { role } = route.params;
  const { setSelectedRole } = useRole();

  const handleLogout = () => {
    setSelectedRole(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'RoleSelection' }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Authenticated (mock)</Text>
        <Text style={styles.title}>{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</Text>
        <Text style={styles.subtitle}>
          This is a placeholder screen. Future milestones will replace this with the real
          role-based dashboard.
        </Text>
        <Button label="Back to role selection" onPress={handleLogout} fullWidth />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
    gap: spacing.md,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: typography.sizes.sm,
    textTransform: 'uppercase',
    fontWeight: typography.weights.semibold as any,
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold as any,
    color: colors.primary,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});

