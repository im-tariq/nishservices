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
import { API_URL } from '@/constants/api';

type Props = NativeStackScreenProps<AuthStackParamList, 'StudentLogin'>;

export const StudentLoginScreen: React.FC<Props> = ({ navigation }) => {
  const { setSelectedRole, setUserName } = useRole();
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Partial<Record<'studentNumber' | 'password', string>>>({});
  const [loading, setLoading] = useState(false);

  const disabled = useMemo(() => !studentNumber || !password || loading, [studentNumber, password, loading]);

  const validate = () => {
    const nextErrors: any = {};
    if (!studentNumber.trim()) {
      nextErrors.studentNumber = 'Student Number is required';
    } else if (studentNumber.trim().length < 6) {
      nextErrors.studentNumber = 'Enter a valid student number';
    }

    if (!password.trim()) {
      nextErrors.password = 'Password is required';
    } else if (password.trim().length < 6) {
      nextErrors.password = 'Password must be 6+ characters';
    }
    return nextErrors;
  };

  const handleSubmit = async () => {
    console.log('Login Button Pressed'); // DEBUG
    const validation = validate();
    console.log('Validation result:', validation); // DEBUG
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setLoading(true);

    try {
      console.log('Sending API Request to:', `${API_URL}/login`); // DEBUG
      console.log('Payload:', { studentNumber, password }); // DEBUG

      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentNumber, password }),
      });

      console.log('Response Status:', response.status); // DEBUG

      const data = await response.json();
      console.log('Response Data:', data); // DEBUG

      if (!response.ok) {
        Alert.alert('Login Failed', data.error || 'Invalid credentials');
        setLoading(false);
        return;
      }

      if (data.role !== 'student') {
        Alert.alert('Access Denied', `This account is for ${data.role}s.`);
        setLoading(false);
        return;
      }

      setSelectedRole('student');
      setUserName(data.name);

      if (Platform.OS === 'web') {
        alert(`Welcome back! Logged in as ${data.name}`);
        navigation.replace('Dashboard', { role: 'student' });
      } else {
        Alert.alert('Welcome back!', `Logged in as ${data.name}`, [
          {
            text: 'Continue',
            onPress: () =>
              navigation.replace('Dashboard', {
                role: 'student',
              }),
          },
        ]);
      }
    } catch (error) {
      console.error('FETCH ERROR:', error); // DEBUG
      Alert.alert('Error', 'Network connection failed.');
    } finally {
      setLoading(false);
    }
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

