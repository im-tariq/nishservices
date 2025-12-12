import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, spacing, typography } from '@/theme';

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export const Input: React.FC<Props> = ({ label, error, ...textInputProps }) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor={colors.textSecondary}
        {...textInputProps}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: typography.sizes.base,
    color: colors.text,
    backgroundColor: colors.background,
  },
  inputError: {
    borderColor: colors.status.cancelled,
  },
  errorText: {
    marginTop: spacing.xs / 2,
    color: colors.status.cancelled,
    fontSize: typography.sizes.xs,
  },
});

