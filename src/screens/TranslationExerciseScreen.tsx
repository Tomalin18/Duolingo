import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

const TranslationExerciseScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  // The sentence to translate: "un garçon et un chat" -> "a boy and a cat"
  const targetSentence = 'un garçon et un chat';
  const availableWords = ['woman', 'I', 'cat', 'and', 'man', 'boy', 'a', 'a', 'horse'];
  const correctTranslation = ['a', 'boy', 'and', 'a', 'cat'];

  const handleWordSelect = (word: string, index: number) => {
    if (selectedWords.length < 5) { // Max 5 words for this sentence
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleWordRemove = (index: number) => {
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
  };

  const handleCheck = () => {
    // Check if translation is correct
    const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(correctTranslation);
    console.log('Is correct:', isCorrect);
  };

  const handleShowHint = () => {
    setShowHint(true);
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
            <View style={[styles.progressFill, { width: '60%' }]} />
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
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.instruction}>Translate this sentence</Text>
        
        {/* Character and speech bubble */}
        <View style={styles.characterSection}>
          <View style={styles.character}>
            {/* Purple-haired character */}
            <View style={styles.characterBody}>
              <View style={styles.characterHead}>
                <View style={styles.characterHair} />
                <View style={styles.characterFace}>
                  <View style={styles.characterEyes} />
                  <View style={styles.characterMouth} />
                </View>
              </View>
            </View>
          </View>
          
          {/* Speech bubble */}
          <View style={styles.speechBubbleContainer}>
            <View style={styles.speechBubble}>
              <TouchableOpacity style={styles.audioButton}>
                <Text style={styles.audioIcon}>🔊</Text>
              </TouchableOpacity>
              <Text style={styles.sentenceText}>{targetSentence}</Text>
              {showHint && (
                <View style={styles.hintContainer}>
                  <Text style={styles.hintText}>Tap on a word to see{'\n'}its meaning!</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Translation area */}
        <View style={styles.translationArea}>
          <View style={styles.selectedWordsContainer}>
            {selectedWords.map((word, index) => (
              <TouchableOpacity
                key={index}
                style={styles.selectedWord}
                onPress={() => handleWordRemove(index)}
              >
                <Text style={styles.selectedWordText}>{word}</Text>
              </TouchableOpacity>
            ))}
            {selectedWords.length < 5 && (
              <View style={styles.placeholder} />
            )}
          </View>
        </View>

        {/* Available words */}
        <View style={styles.wordsContainer}>
          {availableWords.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={styles.wordButton}
              onPress={() => handleWordSelect(word, index)}
            >
              <Text style={styles.wordText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.hintButton} onPress={handleShowHint}>
          <Text style={styles.hintButtonText}>?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.checkButton, selectedWords.length === 0 && styles.checkButtonDisabled]} 
          onPress={handleCheck}
          disabled={selectedWords.length === 0}
        >
          <Text style={styles.checkButtonText}>CHECK</Text>
        </TouchableOpacity>
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
    backgroundColor: Colors.warning,
    borderRadius: 4,
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 30,
  },
  characterSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  character: {
    alignItems: 'center',
    marginRight: 20,
  },
  characterBody: {
    width: 80,
    height: 100,
    backgroundColor: Colors.duoPurple,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  characterHead: {
    alignItems: 'center',
  },
  characterHair: {
    width: 60,
    height: 30,
    backgroundColor: Colors.duoPurple,
    borderRadius: 30,
    marginBottom: 5,
  },
  characterFace: {
    width: 50,
    height: 40,
    backgroundColor: '#FFDBAC',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterEyes: {
    width: 20,
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    marginBottom: 5,
  },
  characterMouth: {
    width: 12,
    height: 6,
    backgroundColor: '#FF6B6B',
    borderRadius: 3,
  },
  speechBubbleContainer: {
    flex: 1,
  },
  speechBubble: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    padding: 20,
    position: 'relative',
  },
  audioButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 32,
    height: 32,
    backgroundColor: Colors.duoBlue,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioIcon: {
    fontSize: 16,
    color: Colors.white,
  },
  sentenceText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 10,
    paddingRight: 50,
  },
  hintContainer: {
    marginTop: 10,
  },
  hintText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  translationArea: {
    minHeight: 60,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  selectedWordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
    paddingBottom: 15,
    minHeight: 45,
  },
  selectedWord: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedWordText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  placeholder: {
    width: 2,
    height: 20,
    backgroundColor: Colors.textPrimary,
  },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  wordButton: {
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 4,
  },
  wordText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  hintButton: {
    width: 50,
    height: 50,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textSecondary,
  },
  checkButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    shadowColor: '#000',
  },
  checkButtonDisabled: {
    backgroundColor: Colors.backgroundGray,
  },
  checkButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default TranslationExerciseScreen; 