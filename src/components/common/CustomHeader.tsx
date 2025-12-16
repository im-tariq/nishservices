import React from 'react';
import { View, StyleSheet, Image, Pressable, Platform, Dimensions, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme';
import { Ionicons } from '@expo/vector-icons';

interface CustomHeaderProps {
  userProfileImage?: string;
  onProfilePress?: () => void;
  userName?: string;
}

const { width } = Dimensions.get('window');
const NOTCH_WIDTH = width * 0.55; 
const HEADER_HEIGHT = 60;

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  userProfileImage,
  onProfilePress,
  userName,
}) => {
  const insets = useSafeAreaInsets();
  
  // Total height of the header area including status bar
  const headerContainerHeight = HEADER_HEIGHT + insets.top;

  return (
    <View style={[styles.container, { height: headerContainerHeight }]}>
      
      {/* Left Area - Welcome */}
      <View style={[styles.leftContainer, { top: insets.top + 10 }]}>
         <Text style={styles.welcomeText}>Welcome,</Text>
         <Text style={styles.userText} numberOfLines={1}>
            {userName || 'User'}
         </Text>
      </View>

      {/* Notch / Logo Area */}
      <View style={[styles.notch, { height: headerContainerHeight + 15 }]}>
         <Image
            source={require('../../../assets/images/header-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
      </View>

      {/* Profile Area (Right) */}
      <View style={[styles.rightContainer, { top: insets.top + 10 }]}>
         <Pressable onPress={onProfilePress} style={styles.profileButton}>
          {userProfileImage ? (
            <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
          ) : (
             <View style={styles.placeholderProfile}>
                <Ionicons name="person" size={20} color={colors.primary} />
             </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20, // Space for content below
    zIndex: 100,
  },
  leftContainer: {
    position: 'absolute',
    left: 20,
    zIndex: 2,
    maxWidth: (width - NOTCH_WIDTH) / 2 - 25,
    justifyContent: 'center',
    height: 40, // Match profile image height
  },
  welcomeText: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  userText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  notch: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    width: NOTCH_WIDTH,
    backgroundColor: colors.background, // Or white
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 15,
    // Add shadow
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1,
  },
  logo: {
    width: '80%',
    height: 40,
  },
  rightContainer: {
    position: 'absolute',
    right: 20,
    zIndex: 2,
  },
  profileButton: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.surface,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  placeholderProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  }
});
