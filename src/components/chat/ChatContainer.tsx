'use client';

import { useEffect, useState } from 'react';
import { MessageList } from './MessageList';
import { InputArea } from './InputArea';
import { Message } from '@/types';
import { useAppStore } from '@/store/appStore';
import { motion } from 'framer-motion';

interface ChatContainerProps {
  conversationId: string;
}

export function ChatContainer({ conversationId }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const setActiveConversation = useAppStore((state) => state.setActiveConversation);

  useEffect(() => {
    setActiveConversation(conversationId);
    // Load messages for this conversation
    // In production, fetch from API
  }, [conversationId]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <MessageList messages={messages} />
        )}
      </div>

      {/* Input Area */}
      <div className="bg-background">
        <InputArea conversationId={conversationId} onSendMessage={setMessages} />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-full text-center px-4"
    >
      <h3 className="text-2xl font-semibold text-gold mb-2">How can I help you today?</h3>
      <p className="text-muted-foreground max-w-md">
        Ask questions, generate code, analyze data, or create comprehensive reports.
      </p>
    </motion.div>
  );
}
