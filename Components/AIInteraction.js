import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Corrected import for Ionicons

const AIInteraction = ({ role, text, onSpeech }) => {
  return (
    <View style={[styles.chatItem, role === "user" ? styles.userChatItem : styles.modelChatItem]}>
      <Text>{text}</Text>
      {role === "model" && (
        <TouchableOpacity onPress={onSpeech} style={styles.speechButton}>
          <Ionicons name='volume-high-outline' size={24} color='cyan' />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    position: "relative",
  },
  userChatItem: {
    alignSelf: "flex-end",
    backgroundColor: "green",
  },
  modelChatItem: {
    alignSelf: "flex-start",
    backgroundColor: 'red',
  },
  speechButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  }
});

export default AIInteraction;