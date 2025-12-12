import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors, spacing } from '@/theme';

type Props = {
  size?: 'small' | 'large';
};

export const LoadingSpinner: React.FC<Props> = ({ size = 'large' }) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

