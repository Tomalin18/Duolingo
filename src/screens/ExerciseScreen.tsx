import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Spacing } from '../constants/Spacing';

const { width, height } = Dimensions.get('window');

const ExerciseScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = "l'homme";
  const correctAnswer = "the man";
  const options = [
    { id: '1', text: 'the boy', image: '👦' },
    { id: '2', text: 'one', image: '1️⃣' },
    { id: '3', text: 'the man', image: '👨' },
    { id: '4', text: 'the cat', image: '🐱' },
  ];

  const handleAnswerSelect = (optionId: string, optionText: string) => {
    setSelectedAnswer(optionId);
    const correct = optionText === correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleContinue = () => {
    // Navigate to next exercise or results
    setShowResult(false);
    setSelectedAnswer(null);
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
            <View style={[styles.progressFill, { width: '25%' }]} />
          </View>
        </View>
      </View>

      {/* NEW WORD badge */}
      <View style={styles.badgeContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeIcon}>✨</Text>
          <Text style={styles.badgeText}>NEW WORD</Text>
        </View>
      </View>

      {/* Exercise content */}
      <View style={styles.content}>
        <Text style={styles.instruction}>Select the correct image</Text>
        
        {/* Question with audio */}
        <View style={styles.questionContainer}>
          <TouchableOpacity style={styles.audioButton}>
            <Text style={styles.audioIcon}>🔊</Text>
          </TouchableOpacity>
          <Text style={styles.questionText}>{question}</Text>
        </View>

        {/* Options grid */}
        <View style={styles.optionsGrid}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedAnswer === option.id && (isCorrect ? styles.correctOption : styles.incorrectOption)
              ]}
              onPress={() => handleAnswerSelect(option.id, option.text)}
              disabled={showResult}
            >
              <Text style={styles.optionImage}>{option.image}</Text>
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Result feedback */}
      {showResult && (
        <View style={[styles.resultContainer, isCorrect ? styles.correctResult : styles.incorrectResult]}>
          <View style={styles.resultContent}>
            <Text style={styles.resultIcon}>{isCorrect ? '✓' : '✕'}</Text>
            <Text style={styles.resultText}>{isCorrect ? 'Correct!' : 'Incorrect'}</Text>
            {!isCorrect && (
              <View style={styles.correctAnswerContainer}>
                <Text style={styles.correctAnswerLabel}>Correct Answer:</Text>
                <Text style={styles.correctAnswerText}>{correctAnswer}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>GOT IT</Text>
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
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.duoPurple,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  instruction: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 32,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  audioButton: {
    width: 60,
    height: 60,
    backgroundColor: Colors.duoBlue,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    shadowColor: '#000',
  },
  audioIcon: {
    fontSize: 24,
    color: Colors.white,
  },
  questionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.duoPurple,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: (width - 60) / 2,
    aspectRatio: 1,
    backgroundColor: Colors.background,
    borderWidth: 3,
    borderColor: Colors.border,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    shadowColor: '#000',
  },
  correctOption: {
    borderColor: Colors.success,
    backgroundColor: '#E8F5E8',
  },
  incorrectOption: {
    borderColor: Colors.error,
    backgroundColor: '#FFF0F0',
  },
  optionImage: {
    fontSize: 60,
    marginBottom: 15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  correctResult: {
    backgroundColor: Colors.success,
  },
  incorrectResult: {
    backgroundColor: Colors.error,
  },
  resultContent: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  resultIcon: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 10,
  },
  correctAnswerContainer: {
    marginTop: 5,
  },
  correctAnswerLabel: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: '600',
  },
  correctAnswerText: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: 'bold',
    marginTop: 2,
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

export default ExerciseScreen; 