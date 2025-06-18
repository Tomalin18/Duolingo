import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

const ListeningExerciseScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showSkipNotice, setShowSkipNotice] = useState(false);

  const options = ['gat', 'chat', 'nat', 'pat'];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSkipListening = () => {
    setShowSkipNotice(true);
  };

  const handleContinue = () => {
    if (showSkipNotice) {
      // Navigate to next exercise
      navigation.goBack();
    } else {
      // Continue with selected answer
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '40%' }]} />
          </View>
        </View>
      </View>

      {/* Exercise content */}
      <View style={styles.content}>
        <Text style={styles.instruction}>What do you hear?</Text>
        
        {/* Audio button */}
        <View style={styles.audioContainer}>
          <TouchableOpacity style={styles.audioButton}>
            <Text style={styles.audioIcon}>🔊</Text>
          </TouchableOpacity>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === option && styles.selectedOption
              ]}
              onPress={() => handleAnswerSelect(option)}
            >
              <Text style={[
                styles.optionText,
                selectedAnswer === option && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Skip listening notice */}
      {showSkipNotice && (
        <View style={styles.skipNoticeContainer}>
          <View style={styles.skipNoticeContent}>
            <Text style={styles.skipNoticeText}>We'll skip listening for{'\n'}15 minutes.</Text>
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom skip button (when no skip notice) */}
      {!showSkipNotice && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkipListening}>
            <Text style={styles.skipButtonText}>Can't listen now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  closeIcon: {
    fontSize: 18,
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.backgroundGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  instruction: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 60,
    marginTop: 40,
  },
  audioContainer: {
    marginBottom: 80,
  },
  audioButton: {
    width: 120,
    height: 120,
    backgroundColor: Colors.duoBlue,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    shadowColor: '#000',
  },
  audioIcon: {
    fontSize: 40,
    color: Colors.white,
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    width: '80%',
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: Colors.background,
    borderWidth: 3,
    borderColor: Colors.border,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    shadowColor: '#000',
  },
  selectedOption: {
    borderColor: Colors.primary,
    backgroundColor: '#E8F5E8',
  },
  optionText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  selectedOptionText: {
    color: Colors.primary,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  skipButtonText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
  skipNoticeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.warning,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  skipNoticeContent: {
    alignItems: 'center',
    marginBottom: 25,
  },
  skipNoticeText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 24,
  },
  continueButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default ListeningExerciseScreen; 