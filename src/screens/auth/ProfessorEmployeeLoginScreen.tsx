import React, { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/types';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { colors, spacing, typography } from '@/theme';
import { useRole } from '@/context/RoleContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'ProfessorEmployeeLogin'>;

type Errors = Partial<Record<'email' | 'password', string>>;

export const ProfessorEmployeeLoginScreen: React.FC<Props> = ({ navigation, route }) => {
  const { role } = route.params;
  const { setSelectedRole } = useRole();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const disabled = useMemo(() => !email || !password || loading, [email, password, loading]);

  const headings = useMemo(
    () =>
      role === 'professor'
        ? {
            eyebrow: 'Professor Workspace',
            title: 'Inspire, mentor, and stay informed.',
            subtitle:
              'Review course feedback, update NoteHub, and stay synced with your department.',
          }
        : {
            eyebrow: 'Employee Hub',
            title: 'Operate student services efficiently.',
            subtitle: 'Manage queue desks, events, and campus communication in one place.',
          },
    [role],
  );

  const validate = (): Errors => {
    const nextErrors: Errors = {};
    if (!email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Enter a valid university email';
    }

    if (!password.trim()) {
      nextErrors.password = 'Password is required';
    } else if (password.trim().length < 6) {
      nextErrors.password = 'Password must be 6+ characters';
    }
    return nextErrors;
  };

  const handleSubmit = () => {
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    setSelectedRole(role);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert('Access granted', 'Mocked login successful.', [
        {
          text: 'Continue',
          onPress: () =>
            navigation.replace('DashboardPlaceholder', {
              role,
            }),
        },
      ]);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.eyebrow}>{headings.eyebrow}</Text>
            <Text style={styles.title}>{headings.title}</Text>
            <Text style={styles.subtitle}>{headings.subtitle}</Text>
          </View>

          <Input
            label="University Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="name@nisantasi.edu.tr"
            error={errors.email}
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Enter your password"
            error={errors.password}
          />

          <Button
            label="Login"
            onPress={handleSubmit}
            loading={loading}
            disabled={disabled}
            fullWidth
          />
          <Text style={styles.helperText}>Need access? Contact your supervisor.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold as any,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: spacing.sm,
    fontSize: typography.sizes['2xl'],
    color: colors.primary,
    fontWeight: typography.weights.bold as any,
  },
  subtitle: {
    marginTop: spacing.xs,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  helperText: {
    marginTop: spacing.md,
    textAlign: 'center',
    color: colors.textSecondary,
  },
});

