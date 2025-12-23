'use client';

import { ToolCall as ToolCallType } from '@/types';
import { Search, Lightbulb, CheckCircle } from 'lucide-react';

interface ToolCallProps {
  toolCall: ToolCallType;
}

export function ToolCall({ toolCall }: ToolCallProps) {
  const getIcon = () => {
    switch (toolCall.tool) {
      case 'web_search':
        return <Search className="w-4 h-4" />;
      case 'research':
        return <Lightbulb className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm bg-gold/10 border border-gold/20 rounded-lg px-3 py-2">
      <div className="text-gold">{getIcon()}</div>
      <span className="font-medium">Using: {toolCall.tool.replace('_', ' ')}</span>
      <span className="text-muted-foreground">→</span>
      <span className="text-muted-foreground">{toolCall.query}</span>
    </div>
  );
}