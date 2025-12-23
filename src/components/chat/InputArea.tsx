'use client';

import { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ConnectorBar } from './ConnectorBar';
import { Send, Paperclip, StopCircle } from 'lucide-react';
import { Message } from '@/types';
import { generateId } from '@/lib/utils';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface InputAreaProps {
  conversationId: string;
  onSendMessage: (updater: (prev: Message[]) => Message[]) => void;
}

export function InputArea({ conversationId, onSendMessage }: InputAreaProps) {
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() && attachments.length === 0) return;

    const userMessage: Message = {
      id: generateId(),
      conversationId,
      role: 'user',
      content: input,
      timestamp: new Date(),
      attachments: attachments.map((file) => ({
        id: generateId(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      })),
    };

    onSendMessage((prev) => [...prev, userMessage]);
    setInput('');
    setAttachments([]);
    setIsStreaming(true);

    // Simulate streaming response
    setTimeout(() => {
      const aiMessage: Message = {
        id: generateId(),
        conversationId,
        role: 'assistant',
        content: `I understand you're asking about "${input}". Let me help you with that...`,
        timestamp: new Date(),
        thinking: [
          {
            id: generateId(),
            step: 'Analyzing your request...',
            timestamp: new Date(),
            index: 1,
          },
          {
            id: generateId(),
            step: 'Gathering relevant information...',
            timestamp: new Date(),
            index: 2,
          },
          {
            id: generateId(),
            step: 'Formulating response...',
            timestamp: new Date(),
            index: 3,
          },
        ],
        toolCalls: input.toLowerCase().includes('search')
          ? [
              {
                id: generateId(),
                tool: 'web_search',
                query: input,
                result: 'Found 5 results',
              },
            ]
          : undefined,
      };
      onSendMessage((prev) => [...prev, aiMessage]);
      setIsStreaming(false);
    }, 2000);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024); // 10MB limit
    
    if (validFiles.length !== files.length) {
      toast.error('Some files were too large (max 10MB)');
    }
    
    setAttachments((prev) => [...prev, ...validFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-4 space-y-3">
      <ConnectorBar />

      {/* Attachments Preview */}
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-wrap gap-2"
          >
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-sm"
              >
                <span>📎</span>
                <span className="max-w-[200px] truncate">{file.name}</span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="relative bg-muted/50 rounded-lg border border-border focus-within:border-gold transition-colors">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message AgenticAI... (Shift+Enter for new line)"
          className="w-full bg-transparent px-4 py-3 pr-24 resize-none outline-none min-h-[60px] max-h-[200px] overflow-y-auto"
          rows={1}
        />

        <div className="absolute right-2 bottom-2 flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*,.pdf,.doc,.docx,.txt,.csv"
          />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="text-muted-foreground hover:text-foreground"
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          {isStreaming ? (
            <Button
              size="icon"
              variant="destructive"
              onClick={() => setIsStreaming(false)}
            >
              <StopCircle className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() && attachments.length === 0}
              className="bg-gold hover:bg-gold/90 text-black"
            >
              <Send className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        AgenticAI can make mistakes. Verify important information.
      </p>
    </div>
  );
}