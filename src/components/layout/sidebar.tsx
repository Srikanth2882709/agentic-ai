'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ChatHistory } from './ChatHistory';
import { TemplateList } from './TemplateList';
import { AccountMenu } from './AccountMenu';
import { PlusCircle, PanelLeftClose, Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useRouter } from 'next/navigation'; 
import { generateId } from '@/lib/utils';

export function Sidebar() {
  const router = useRouter();
  const { toggleSidebar, addConversation } = useAppStore();

  const handleNewChat = () => {
    const newConv = {
      id: generateId(),
      title: 'New Conversation',
      createdAt: new Date(),
      updatedAt: new Date(),
      messageCount: 0,
    };
    addConversation(newConv);
    router.push(`/chat/${newConv.id}`);
  };

  return (
    <div className="w-[280px] h-full bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-gold" />
            <span className="font-bold text-lg">AgenticAI</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hover:bg-muted"
          >
            <PanelLeftClose className="w-5 h-5" />
          </Button>
        </div>

        <Button
          className="w-full gap-2 bg-gold hover:bg-gold/90 text-black font-semibold"
          onClick={handleNewChat}
        >
          <PlusCircle className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      <Separator />

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <ChatHistory />
          <TemplateList />
        </div>
      </ScrollArea>

      <Separator />

      {/* Footer */}
      <div className="p-4">
        <AccountMenu />
      </div>
    </div>
  );
}