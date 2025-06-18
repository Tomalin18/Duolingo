import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Spacing } from '../constants/Spacing';

const { width, height } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading time, then show the welcome screen
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    // First screenshot: Green screen with Duo eyes
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
        
        {/* Duo Eyes */}
        <View style={styles.eyesContainer}>
          <View style={styles.leftEye}>
            <View style={styles.eyeball} />
          </View>
          <View style={styles.rightEye}>
            <View style={styles.eyeball} />
          </View>
          {/* Orange beak */}
          <View style={styles.beak} />
        </View>

        {/* Bottom content */}
        <View style={styles.bottomContent}>
          <Text style={styles.duolingoText}>duolingo</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar} />
          </View>
          <Text style={styles.creditText}>curated by</Text>
        </View>
      </View>
    );
  }

  // Second screenshot: Welcome screen with full Duo character
  return (
    <View style={styles.welcomeContainer}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Duo character */}
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
      </View>

      {/* App title */}
      <Text style={styles.appTitle}>duolingo</Text>
      <Text style={styles.tagline}>Learn for free. Forever.</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Intro' as never)}
        >
          <Text style={styles.primaryButtonText}>GET STARTED</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Main' as never)}
        >
          <Text style={styles.secondaryButtonText}>I ALREADY HAVE AN ACCOUNT</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom content */}
      <View style={styles.welcomeBottomContent}>
        <Text style={styles.creditText}>curated by</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Splash screen styles (First screenshot)
  splashContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.3,
  },
  leftEye: {
    position: 'absolute',
    left: -25,
    top: 0,
    width: 70,
    height: 70,
    backgroundColor: Colors.white,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightEye: {
    position: 'absolute',
    right: -25,
    top: 0,
    width: 70,
    height: 70,
    backgroundColor: Colors.white,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeball: {
    width: 30,
    height: 30,
    backgroundColor: '#3C3C3C',
    borderRadius: 15,
  },
  beak: {
    position: 'absolute',
    top: 45,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FF9600',
  },
  bottomContent: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
    width: '100%',
  },
  duolingoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 20,
  },
  progressContainer: {
    width: width - 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginBottom: 15,
  },
  progressBar: {
    width: '30%',
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
  creditText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },

  // Welcome screen styles (Second screenshot)
  welcomeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingHorizontal: Spacing.screenHorizontal,
  },
  duoCharacter: {
    marginTop: height * 0.15,
    marginBottom: 40,
    alignItems: 'center',
  },
  duoBody: {
    width: 120,
    height: 140,
    backgroundColor: Colors.primary,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    // Add shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    shadowColor: '#000',
  },
  duoFace: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  duoLeftEye: {
    position: 'absolute',
    left: -15,
    top: 0,
    width: 35,
    height: 35,
    backgroundColor: Colors.white,
    borderRadius: 17.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  duoRightEye: {
    position: 'absolute',
    right: -15,
    top: 0,
    width: 35,
    height: 35,
    backgroundColor: Colors.white,
    borderRadius: 17.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  duoEyeball: {
    width: 15,
    height: 15,
    backgroundColor: '#3C3C3C',
    borderRadius: 7.5,
  },
  duoBeak: {
    position: 'absolute',
    top: 25,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FF9600',
  },
  appTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 60,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    // Add shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    shadowColor: '#000',
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  welcomeBottomContent: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
});

export default OnboardingScreen; 