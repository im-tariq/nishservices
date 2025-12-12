import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/types';
import { colors, spacing, typography } from '@/theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

const logo = require('../../../assets/images/niu-logo.png');

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const scale = useRef(new Animated.Value(0.94)).current;
  const opacity = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('RoleSelection');
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigation]);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 0.94,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.85,
            duration: 900,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );
    animation.start();
    return () => {
      animation.stop();
    };
  }, [opacity, scale]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.Image
          source={logo}
          style={[styles.logo, { transform: [{ scale }], opacity }]}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>İstanbul Nişantaşı University</Text>
        <Text style={styles.caption}>One campus. One ecosystem. Every service.</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.brand}>NISHSERVICES</Text>
        <View style={styles.brandAccent} />
        <Text style={styles.footerCaption}>Modern access for every campus role</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  logo: {
    width: 260,
    height: 140,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  caption: {
    marginTop: spacing.lg,
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  brand: {
    fontSize: 30,
    letterSpacing: 8,
    fontWeight: typography.weights.semibold as any,
    color: colors.primary,
  },
  brandAccent: {
    width: 80,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  footerCaption: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});

