import React from "react";

interface ChatMessageProps {
  role: string;
  content: string;
}

const roleDisplayNames: { [key: string]: string } = {
  user: "Usuario",
  assistant: "IA",
};

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  return (
    <div key={content} className="chatMessage my-4">
      {roleDisplayNames[role] || role}: {content}
    </div>
  );
};

export default ChatMessage;
