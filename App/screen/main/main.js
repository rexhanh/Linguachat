import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import "react-native-get-random-values";
import { GiftedChat } from "react-native-gifted-chat";
import { Button } from "react-native-paper";

const MainScreen = () => {
  // return (
  //   // <SafeAreaView style={styles.container}>
  //   //   {/* <Text>Test</Text> */}
  //   // <ChatBot />
  //   // </SafeAreaView>
  //   // <ChatBot />
  //   // <View />
  //   <GiftedChat />
  // );
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const typingMessage = {
    _id: "typing",
    text: "...",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "Bot",
    },
  };
  useEffect(() => {
    setChatMessages([
      {
        _id: 1,
        text: "Hello there! I am your language learning companion. What language would you like to learn today?",
        createdAt: new Date(),
        quickReplies: {
          type: "radio", // or 'checkbox',
          keepIt: true,
          values: [
            {
              title: "Chinese",
              value: "chinese",
            },
            {
              title: "Spanish",
              value: "spanish",
            },
            {
              title: "Japanese",
              value: "japanese",
            },
            {
              title: "French",
              value: "french",
            },
          ],
        },
        user: {
          _id: 2,
          name: "Bot",
          role: "assistant",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages) => {
    setChatMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const onSubmit = async (messages) => {
    onSend(messages);
    setChatMessages((previous) => GiftedChat.append(previous, [typingMessage]));
    const m = messages[0].text;
    try {
      const r = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: m,
        }),
      }).catch((error) => {
        console.log("ERRRRRRROR?");
        console.error("Error fetching quick reply response:", error);
      });

      const data = await r.json();
      setChatMessages((prev) => prev.filter((msg) => msg._id !== "typing"));
      const botReply = {
        _id: Math.random().toString(),
        text: data.message,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
        },
      };

      setChatMessages((previous) => GiftedChat.append(previous, [botReply]));
    } catch (error) {
      console.error("Error fetching quick reply response:", error);
    }
  };

  const onQuickReply = async (replies = []) => {
    setChatMessages((previous) => GiftedChat.append(previous, [typingMessage]));

    try {
      const response = await fetch("http://127.0.0.1:5000/select-language", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: replies[0].value,
        }),
      }).catch((error) => {
        console.error("Error fetching quick reply response:", error);
      });

      const data = await response.json();
      setChatMessages((prev) => prev.filter((msg) => msg._id !== "typing"));
      const botReply = {
        _id: Math.random().toString(),
        text: data.message,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
        },
      };

      setChatMessages((previous) => GiftedChat.append(previous, [botReply]));
    } catch (error) {
      console.error("Error fetching quick reply response:", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatbot}>
        <GiftedChat
          messages={chatMessages}
          onSend={(messages) => onSubmit(messages)}
          user={{
            _id: 1,
          }}
          onQuickReply={onQuickReply}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  chatbot: {
    flex: 1,
    // backgroundColor: "red",
  },
});
export default MainScreen;
