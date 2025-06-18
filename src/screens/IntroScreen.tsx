import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';

const { width, height } = Dimensions.get('window');

const IntroScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    // Navigate to loading screen or main app
    navigation.navigate('Main' as never);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* Back arrow */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Speech bubble */}
      <View style={styles.speechBubbleContainer}>
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>Hi there! I'm Duo!</Text>
          {/* Speech bubble tail */}
          <View style={styles.speechTail} />
        </View>
      </View>

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
            {/* Small smile */}
            <View style={styles.duoMouth} />
          </View>
          {/* Body shadow */}
          <View style={styles.duoShadow} />
        </View>
      </View>

      {/* Continue button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: Colors.textSecondary,
  },
  speechBubbleContainer: {
    marginTop: height * 0.1,
    marginBottom: 40,
    alignItems: 'center',
  },
  speechBubble: {
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 10,
    position: 'relative',
    // Add shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    shadowColor: '#000',
  },
  speechText: {
    fontSize: 18,
    color: Colors.textPrimary,
    fontWeight: '500',
    textAlign: 'center',
  },
  speechTail: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.borderLight,
  },
  duoCharacter: {
    alignItems: 'center',
    marginBottom: height * 0.2,
  },
  duoBody: {
    width: 160,
    height: 180,
    backgroundColor: Colors.primary,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
    // Add shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    shadowColor: '#000',
  },
  duoShadow: {
    position: 'absolute',
    bottom: -15,
    width: 120,
    height: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 60,
  },
  duoFace: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  duoLeftEye: {
    position: 'absolute',
    left: -20,
    top: 0,
    width: 45,
    height: 45,
    backgroundColor: Colors.white,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  duoRightEye: {
    position: 'absolute',
    right: -20,
    top: 0,
    width: 45,
    height: 45,
    backgroundColor: Colors.white,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  duoEyeball: {
    width: 20,
    height: 20,
    backgroundColor: '#3C3C3C',
    borderRadius: 10,
  },
  duoBeak: {
    position: 'absolute',
    top: 35,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FF9600',
  },
  duoMouth: {
    position: 'absolute',
    top: 55,
    width: 20,
    height: 8,
    backgroundColor: '#2E7D32',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    paddingHorizontal: 20,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    // Add shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    shadowColor: '#000',
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default IntroScreen; 