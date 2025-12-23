'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { generateId } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';
import { toast } from 'sonner';

export function WelcomeHero() {
  const router = useRouter();
  const addConversation = useAppStore((state) => state.addConversation);

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

  const handleViewDocs = () => {
    toast.info('Documentation coming soon!');
  };

  return (
    <div className="text-center py-12 space-y-6">
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
        Welcome to{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">
          AgenticAI
        </span>
      </h1>
      
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Build intelligent AI agents that understand context, search the web, 
        generate artifacts, and solve complex problems autonomously.
      </p>
      
      <div className="flex gap-4 justify-center pt-4">
        <Button
          size="lg"
          onClick={handleNewChat}
          className="gap-2 bg-gold hover:bg-gold/90 text-black font-semibold"
        >
          <PlusCircle className="w-5 h-5" />
          Start New Chat
        </Button>
        <Button size="lg" variant="outline" className="gap-2" onClick={handleViewDocs}>
          View Documentation
        </Button>
      </div>
    </div>
  );
}