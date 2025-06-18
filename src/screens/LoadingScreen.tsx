import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

const LoadingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [loadingText, setLoadingText] = useState('LOADING...');

  useEffect(() => {
    // Simulate loading progress
    const timer = setTimeout(() => {
      // Navigate to lesson or main screen after loading
      navigation.navigate('Main' as never);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* Header with logo */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>duolingo</Text>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Duo reading character */}
        <View style={styles.duoReading}>
          {/* Stack of books */}
          <View style={styles.bookStack}>
            {/* Bottom book - red */}
            <View style={[styles.book, styles.redBook]} />
            {/* Middle book - yellow */}
            <View style={[styles.book, styles.yellowBook]} />
            {/* Top book - blue (Duo is reading this) */}
            <View style={[styles.book, styles.blueBook]} />
          </View>

          {/* Duo character sitting on books */}
          <View style={styles.duoCharacter}>
            <View style={styles.duoBody}>
              <View style={styles.duoFace}>
                <View style={styles.duoLeftEye}>
                  <View style={styles.duoEyeball} />
                </View>
                <View style={styles.duoRightEye}>
                  <View style={styles.duoEyeball} />
                </View>
                <View style={styles.duoBeak} />
              </View>
            </View>
            {/* Shadow under Duo */}
            <View style={styles.duoShadow} />
          </View>
        </View>

        {/* Loading text */}
        <Text style={styles.loadingTitle}>{loadingText}</Text>
        
        {/* Tip text */}
        <Text style={styles.tipText}>
          By spending just 15 minutes a day on{'\n'}
          Duolingo, you could learn 100 French{'\n'}
          words a month!
        </Text>
      </View>

      {/* Bottom progress indicator */}
      <View style={styles.bottomIndicator}>
        <View style={styles.progressDot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  duoReading: {
    alignItems: 'center',
    marginBottom: 60,
  },
  bookStack: {
    position: 'relative',
    width: 120,
    height: 60,
    marginBottom: 20,
  },
  book: {
    position: 'absolute',
    width: 100,
    height: 15,
    borderRadius: 2,
  },
  redBook: {
    backgroundColor: '#FF6B6B',
    bottom: 0,
    left: 10,
    transform: [{ rotate: '-2deg' }],
  },
  yellowBook: {
    backgroundColor: '#FFD93D',
    bottom: 12,
    left: 5,
    transform: [{ rotate: '1deg' }],
  },
  blueBook: {
    backgroundColor: '#4ECDC4',
    bottom: 25,
    left: 0,
    transform: [{ rotate: '-1deg' }],
  },
  duoCharacter: {
    alignItems: 'center',
    position: 'relative',
  },
  duoBody: {
    width: 100,
    height: 120,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    // Add shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    shadowColor: '#000',
  },
  duoShadow: {
    position: 'absolute',
    bottom: -10,
    width: 80,
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 40,
  },
  duoFace: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  duoLeftEye: {
    position: 'absolute',
    left: -15,
    top: 0,
    width: 30,
    height: 30,
    backgroundColor: Colors.white,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  duoRightEye: {
    position: 'absolute',
    right: -15,
    top: 0,
    width: 30,
    height: 30,
    backgroundColor: Colors.white,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  duoEyeball: {
    width: 12,
    height: 12,
    backgroundColor: '#3C3C3C',
    borderRadius: 6,
  },
  duoBeak: {
    position: 'absolute',
    top: 25,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FF9600',
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textSecondary,
    letterSpacing: 2,
    marginBottom: 40,
    textAlign: 'center',
  },
  tipText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
  },
  bottomIndicator: {
    paddingBottom: 50,
    alignItems: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    backgroundColor: Colors.textLight,
    borderRadius: 4,
  },
});

export default LoadingScreen; 