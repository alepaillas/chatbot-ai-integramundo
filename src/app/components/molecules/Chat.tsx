"use client";

import React, { useState, useCallback } from "react";
import { readStreamableValue } from "ai/rsc"; // Replace with correct import
import { Message, continueConversation } from "@/app/utils/ollamaChatStream"; // Replace with correct import
import ChatInput from "@/app/components/atoms/ChatInput";
import ChatMessage from "@/app/components/atoms/ChatMessage";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSendMessage = useCallback(async () => {
    if (input.trim() === "") return;

    try {
      const { messages, newMessage } = await continueConversation([
        ...conversation,
        { role: "user", content: input },
      ]);

      setInput(""); // Clear the input after sending the message

      let textContent = "";

      for await (const delta of readStreamableValue(newMessage)) {
        textContent = `${textContent}${delta}`;

        setConversation([
          ...messages,
          { role: "assistant", content: textContent },
        ]);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  }, [conversation, input]);

  const handleButtonClick = () => {
    handleSendMessage();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat flex justify-center my-4">
      <div className="shadow-lg border-2 w-96 px-4 py-4 rounded-lg">
        <div className="min-h-16 max-h-96 overflow-auto overflow-anchor-scroller">
          {conversation.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
          <hr className="overflow-anchor" />
        </div>
        <ChatInput
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onButtonClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default Chat;
