// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const Chat = ({ userId, supportId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://your-backend-url');
    setSocket(newSocket);

    newSocket.emit('join_room', `${userId}_${supportId}`);

    newSocket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => newSocket.close();
  }, [userId, supportId]);

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const messageData = {
        roomId: `${userId}_${supportId}`,
        content: inputMessage,
        senderId: userId,
        timestamp: new Date().toISOString(),
      };
      socket.emit('send_message', messageData);
      setInputMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.senderId === userId ? styles.userMessage : styles.supportMessage
          ]}>
            <Text>{item.content}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (add appropriate styles)
});

export default Chat;