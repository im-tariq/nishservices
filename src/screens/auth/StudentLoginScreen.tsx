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
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { colors, spacing, typography } from '@/theme';
import { useRole } from '@/context/RoleContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'StudentLogin'>;

type StudentLoginErrors = Partial<Record<'studentNumber' | 'password', string>>;

export const StudentLoginScreen: React.FC<Props> = ({ navigation }) => {
  const { setSelectedRole } = useRole();
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<StudentLoginErrors>({});
  const [loading, setLoading] = useState(false);

  const disabled = useMemo(() => !studentNumber || !password || loading, [
    studentNumber,
    password,
    loading,
  ]);

  const validate = (): StudentLoginErrors => {
    const nextErrors: StudentLoginErrors = {};
    if (!studentNumber.trim()) {
      nextErrors.studentNumber = 'Student number is required';
    } else if (studentNumber.trim().length < 6) {
      nextErrors.studentNumber = 'Enter at least 6 characters';
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
    setSelectedRole('student');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert('Welcome back!', 'Mocked login successful.', [
        {
          text: 'Continue',
          onPress: () =>
            navigation.replace('DashboardPlaceholder', {
              role: 'student',
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
            <Text style={styles.eyebrow}>Student Portal</Text>
            <Text style={styles.title}>Sign in to access every campus service.</Text>
            <Text style={styles.subtitle}>
              Queue passes, NoteHub, mentors, reviews, and personalized updates in one feed.
            </Text>
          </View>

          <Input
            label="Student Number"
            value={studentNumber}
            onChangeText={setStudentNumber}
            keyboardType="default"
            placeholder="e.g. 20211234"
            autoCapitalize="none"
            error={errors.studentNumber}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Enter your password"
            error={errors.password}
          />

          <Button label="Login" onPress={handleSubmit} loading={loading} disabled={disabled} fullWidth />
          <Text style={styles.helperText}>Forgot password? Contact your faculty admin.</Text>
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

