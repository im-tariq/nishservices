import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/theme';
import { Card } from '@/components/common/Card';
import { AuthStackParamList } from '@/navigation/types';
import { useRole, UserRole } from '@/context/RoleContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'RoleSelection'>;

const ROLE_CARDS: Array<{
  role: UserRole;
  title: string;
  description: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
}> = [
  {
    role: 'student',
    title: 'Student',
    description: 'Queues, notes, mentors, reviews & campus life tools.',
    icon: 'school-outline',
  },
  {
    role: 'professor',
    title: 'Professor',
    description: 'Engage students, share materials, manage reviews.',
    icon: 'people-outline',
  },
  {
    role: 'employee',
    title: 'Employee',
    description: 'Operate service desks, manage events & departments.',
    icon: 'briefcase-outline',
  },
];

export const RoleSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedRole, setSelectedRole } = useRole();

  const handleRolePress = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'student') {
      navigation.navigate('StudentLogin');
      return;
    }
    navigation.navigate('ProfessorEmployeeLogin', {
      role: role === 'professor' ? 'professor' : 'employee',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Select Your Role</Text>
        <Text style={styles.title}>Tailored dashboards for every university hero.</Text>
        <Text style={styles.subtitle}>
          Choose the experience that matches your responsibilities.
        </Text>
      </View>

      <View style={styles.cardGrid}>
        {ROLE_CARDS.map((card) => (
          <Card
            key={card.role}
            title={card.title}
            description={card.description}
            selected={selectedRole === card.role}
            onPress={() => handleRolePress(card.role)}
            icon={<Ionicons name={card.icon} size={32} color={colors.primary} />}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    backgroundColor: colors.surface,
  },
  header: {
    marginBottom: spacing.xl,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold as any,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  title: {
    marginTop: spacing.sm,
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold as any,
    color: colors.primary,
  },
  subtitle: {
    marginTop: spacing.xs,
    color: colors.textSecondary,
    fontSize: typography.sizes.base,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.md,
  },
});

