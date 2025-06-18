import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { Spacing } from '../../constants/Spacing';

interface UserProfileProps {
  name: string;
  streak: number;
  xp: number;
  level: number;
  avatar?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  name, 
  streak, 
  xp, 
  level, 
  avatar 
}) => {
  return (
    <View style={styles.container}>
      {/* 用戶頭像 */}
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.defaultAvatar}>
            <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
          </View>
        )}
      </View>

      {/* 用戶資訊 */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{name}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{streak}</Text>
            <Text style={styles.statLabel}>天連續</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{xp}</Text>
            <Text style={styles.statLabel}>總經驗</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{level}</Text>
            <Text style={styles.statLabel}>等級</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    // 陰影效果
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    marginRight: Spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  defaultAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...Typography.styles.h2,
    color: Colors.white,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...Typography.styles.h3,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    ...Typography.styles.body,
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 18,
  },
  statLabel: {
    ...Typography.styles.caption,
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.borderLight,
    marginHorizontal: Spacing.sm,
  },
});

export default UserProfile; 