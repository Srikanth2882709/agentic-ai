// src/hooks/useStreamingChat.ts
import { useState, useCallback } from 'react';
import { Message, StreamEvent } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export function useStreamingChat(conversationId: string) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<string>('');

  const sendMessage = useCallback(
    async (
      content: string,
      onMessage: (message: Message) => void,
      onChunk?: (chunk: string) => void
    ) => {
      setIsStreaming(true);
      setStreamingMessage('');

      try {
        const response = await fetch(
          `${API_URL}/conversations/${conversationId}/messages`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
          }
        );

        if (!response.ok) throw new Error('Failed to send message');

        // For now, simulate streaming
        // In production, implement actual SSE or WebSocket streaming
        const fullResponse = await response.json();
        
        // Simulate streaming effect
        const words = fullResponse.content.split(' ');
        for (let i = 0; i < words.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          const chunk = words.slice(0, i + 1).join(' ');
          setStreamingMessage(chunk);
          onChunk?.(chunk);
        }

        setStreamingMessage('');
        onMessage(fullResponse);
      } catch (error) {
        console.error('Streaming error:', error);
      } finally {
        setIsStreaming(false);
      }
    },
    [conversationId]
  );

  const stopStreaming = useCallback(() => {
    setIsStreaming(false);
  }, []);

  return {
    sendMessage,
    stopStreaming,
    isStreaming,
    streamingMessage,
  };
}