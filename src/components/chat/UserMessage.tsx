'use client';

import { Message } from '@/types';
import { User } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface UserMessageProps {
  message: Message;
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex gap-4 justify-end">
      <div className="flex-1 max-w-3xl">
        <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
          <p className="text-foreground whitespace-pre-wrap">{message.content}</p>
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 rounded px-3 py-2"
                >
                  <span>📎</span>
                  <span>{attachment.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground justify-end">
          <span>{formatDate(message.timestamp)}</span>
        </div>
      </div>
      
      <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
        <User className="w-4 h-4 text-black" />
      </div>
    </div>
  );
}