import React from "react";

interface ChatInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onKeyDown,
  onButtonClick,
}) => {
  return (
    <div className="chatInput mt-6 flex justify-center">
      <div>
        <input
          className="bg-neutral-100 focus:outline-none focus:ring-0 focus:border-sky-600 border-transparent border-2 mr-2 px-4 py-1 rounded-full"
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <button
          className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-1 rounded-full"
          onClick={onButtonClick}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
